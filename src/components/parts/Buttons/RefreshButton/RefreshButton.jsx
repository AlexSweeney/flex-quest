import React, {useState, useEffect} from 'react';
import Button from './../Button.jsx';
import RefreshIcon from '@material-ui/icons/Refresh';
import './RefreshButton.css';

export default function RefreshButton({onClick, i}) {
	// ====================== Ids ====================== //
	const refreshButtonId = `refresh-button-${i}`;
	const refreshIconId = `refresh-icons-${i}`;

	// ====================== State ====================== //
	const [rotateNum, setRotateNum] = useState(0);  
	const iconStyle = {
		'transform': `rotate(${rotateNum}deg)`,
		'transition': 'transform 1000ms',
	} 

	// ====================== Status ====================== //
	const [cursorIsOver, setCursorIsOver] = useState(false);
	const [cursorIsDown, setCursorIsDown] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false); 

	// ====================== Class ====================== //
	const [refreshColorClass, setRefreshColorClass] = useState('refresh-button'); 

	// ====================== Event Handlers ====================== //
	function handleMouseOver() {  
		setCursorIsOver(true)
	}

	function handleMouseOut(e) {
		setCursorIsOver(false)
		setCursorIsDown(false)
	}

	function handleMouseDown() {
		onClick()
		setCursorIsDown(true)
		setIsAnimating(true)
		setRotateNum(oldVal => oldVal + 360)
	}

	function handleMouseUp() {
		setCursorIsDown(false)
	} 

	// ====================== Event Listeners Fns ====================== //
	function handleTransitionEnd(e) {
		if(e.propertyName === 'transform') {
			setIsAnimating(false)
		}
	}

	// ====================== Listen for Animation End ====================== //
	useEffect(() => {
		if(cursorIsDown) {
			const cursorElement = document.getElementById(refreshIconId);
			cursorElement.addEventListener('transitionend', handleTransitionEnd)
		}

		return () => {
			const cursorElement = document.getElementById(refreshIconId);
			cursorElement.removeEventListener('transitionend', handleTransitionEnd)
		}
	}, [isAnimating])

	// ====================== Set Color Class ====================== //
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

	// ====================== Console logs ====================== //
	// useEffect(() => {
	// 	console.log('cursorIsOver', cursorIsOver)
	// }, [cursorIsOver])

	// useEffect(() => {
	// 	console.log('cursorIsDown', cursorIsDown)
	// }, [cursorIsDown])

	// useEffect(() => {
	// 	console.log('isAnimating', isAnimating)
	// }, [isAnimating])

	// ====================== Output ====================== //
	return ( 
		<Button>
			<div className={`refresh-button ${refreshColorClass}`}
				id={refreshButtonId}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				>
				<RefreshIcon 
					className="refresh-icon" 
					id={refreshIconId}
					style={iconStyle} 
					fontSize="inherit" 
				/>
			</div> 
		</Button>
	)
}
 