import React, {useState, useEffect} from 'react';
import Button from './../Button.jsx';
import RefreshIcon from '@material-ui/icons/Refresh';
import {triggerOnTransitionEnd} from '../../../../utils/utils.js';
import './RefreshButton.css';

export default function RefreshButton({onClick, i}) {
	/* 
		* on click
			* spin
			* call onClick

		* on animating
			* change color

		* on Over
			* change color

		* on Down 
			* change color 
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
		setCursorIsDown(true)
		transformIcon()
		onTransformStart()
		onClick()
	}

	function onMouseUp() {
		setCursorIsDown(false)
	} 

	function onTransformStart() {
		setIsAnimating(true)
		triggerOnTransitionEnd(refreshIconId, 'transform', onTransformEnd) 
	}

	function onTransformEnd() {
		setIsAnimating(false)
	} 

	// ====================== Helper Fns ============================ //
	function transformIcon() {
		setRotateNum(oldVal => oldVal + 360)
	}

	function updateIconColor(cursorIsDown, cursorIsOver, isAnimating) {
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
	}

	// ====================== Listen / Trigger ====================== //
	useEffect(() => {  
		updateIconColor(cursorIsDown, cursorIsOver, isAnimating)
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