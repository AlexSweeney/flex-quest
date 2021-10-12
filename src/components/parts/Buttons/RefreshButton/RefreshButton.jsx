import React, {useState, useEffect} from 'react';
import Button from './../Button.jsx';
import RefreshIcon from '@material-ui/icons/Refresh';
import {triggerOnTransitionEnd} from './../../../utils.js';
import './RefreshButton.css';

export default function RefreshButton({onClick, i}) {
	/* 
		* spin when clicked
		* trigger onClick when clicked
		* change color on over
		* change color on down
		* change color when animating
	*/	

	// ====================== Constants ============================== //
	// =========== Ids 
	const refreshButtonId = `refresh-button-${i}`;
	const refreshIconId = `refresh-icons-${i}`;

	// =========== State
	const [rotateNum, setRotateNum] = useState(0);  
	const iconStyle = {
		'transform': `rotate(${rotateNum}deg)`,
		'transition': 'transform 1000ms',
	} 

	// =========== Status
	const [cursorIsOver, setCursorIsOver] = useState(false);
	const [cursorIsDown, setCursorIsDown] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false); 

	// =========== Class
	const [refreshColorClass, setRefreshColorClass] = useState('refresh-button'); 

	// ====================== Event Handlers ======================== //
	function onMouseOver() {  
		setCursorIsOver(true)
	}

	function onMouseOut(e) {
		setCursorIsOver(false)
		setCursorIsDown(false)
	}

	function onMouseDown() {
		onClick()
		setCursorIsDown(true)
		setIsAnimating(true)
		setRotateNum(oldVal => oldVal + 360)
	}

	function onMouseUp() {
		setCursorIsDown(false)
	} 

	function onTransitionEnd() {
		setIsAnimating(false)
	} 

	// ====================== Listen / Trigger ====================== //
	// =========== Animation End
	useEffect(() => {
		if(cursorIsDown) {
			triggerOnTransitionEnd(refreshIconId, 'transform', onTransitionEnd) 
		} 
	}, [isAnimating])

	// =========== Set Color Class
	useEffect(() => {  
		let newClass;

		if(cursorIsOver) {
			if(cursorIsDown) newClass = 'refresh-button-down';
			else newClass = 'refresh-button-over';
		}

		if(!cursorIsOver) {
			if(isAnimating) newClass = 'refresh-button-down';
			else newClass = 'refresh-button-out';
		} 

		setRefreshColorClass(newClass);
	}, [cursorIsDown, cursorIsOver, isAnimating]) 
 
	// ====================== Output =============================== //
	return ( 
		<Button>
			<div className={`refresh-button ${refreshColorClass}`}
				id={refreshButtonId}
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}>
				<RefreshIcon className="refresh-icon" 
					id={refreshIconId}
					style={iconStyle} 
					fontSize="inherit"/>
			</div> 
		</Button>
	)
}
 