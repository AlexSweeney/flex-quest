import React, {useState, useEffect} from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import './RefreshButton.css';

export default function RefreshButton({onClick}) {
	const [rotateNum, setRotateNum] = useState(0);
	const [refreshClass, setRefreshClass] = useState('refresh-button');
	const [isDown, setIsDown] = useState(false);
	const [isOver, setIsOver] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false); 
	const [oldTimer, setOldTimer] = useState(null);

	const iconStyle = {
		'transform': `rotate(${rotateNum}deg)`,
		'transition': 'transform 1000ms',
	}

	function handleMouseOver() {
		setIsOver(true);
	}

	function handleMouseOut() {
		setIsOver(false);
		setIsDown(false);
	}

	function handleMouseDown() {
		onClick();
		setIsDown(true);
		setRotateNum(oldVal => oldVal + 360);

		setIsAnimating(true);
		turnAnimationOff();
		
	}

	function handleMouseUp() {
		setIsDown(false);
	}

	function turnAnimationOff() {
		clearTimeout(oldTimer);

		const timer = setTimeout(() => {
      setIsAnimating(false);
		}, 1000);

		setOldTimer(timer);
	}

	useEffect(() => { 
		console.log('isOver', isOver);
		let newClass = 'refresh-button';

		if(isDown || isAnimating && !isOver) {
			newClass += ' refresh-button-down';
		} else if(isOver && !isDown && !isAnimating) {
			newClass += ' refresh-button-over';
		}

		setRefreshClass(newClass);
	}, [isDown, isOver, isAnimating]) 

	return ( 
		<div className={`${refreshClass}`}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}>
			<RefreshIcon className="refresh-icon" style={iconStyle} fontSize="inherit"/>
		</div>
	)
}