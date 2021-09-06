import React, {useState, useEffect} from 'react';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({isOpen, handleClick}) {  
	/*const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);*/

	/*const [isClosing, setIsClosing] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);*/

	const [lineColorClass, setLineColorClass] = useState('');
	const [lineAnimationClass, setLineAnimationClass] = useState('');

	/*const [lineClass, setLineClass] = useState('');
	const [crossLineClass, setCrossLineClass] = useState('');*/

	const [animationStatus, setAnimationStatus] = useState('');

	const [cursorLocation, setCursorLocation] = useState('out')
	const [cursorStatus, setCursorStatus] = useState('up');

	const animationDelay = 1000;
	const animationTime = 1000;

	function handleOver() {
		setCursorLocation('over');
	}

	function handleOut() {
		setCursorLocation('out');
		setCursorStatus('up');
	}

	function handleDown() {
		handleClick();
		setCursorStatus('down');	 
		animate();
	}

	function handleUp() {
		setCursorStatus('up');
	}

	function animate() {
		const newStatus = isOpen ? 'closing' : 'opening';
		setAnimationStatus(newStatus);

		setTimeout(() => {
			setAnimationStatus('');
		}, animationDelay + animationTime)
	}

	/*function animateMovement() {
		if(isOpen) {
			setTimeout(() => {
				setCrossLineClass('vert-line');	
			}, animationDelay); 
		} else {
			setCrossLineClass('');
		}
	}

	function animateColors() {  
		setAnimationStatus('waiting');

		setTimeout(() => {
			setAnimationStatus('animating'); 

			setTimeout(() => {
				setAnimationStatus('');
			}, animationTime)
		}, animationDelay)
	}*/
/*
	function animateOpen() {
		setCrossLineClass('');
	}*/

	/*function handleOver() { 
		setIsOver(true);
	}

	function handleOut() { 
		setIsOver(false);
	}

	function handleDown() {
		setIsAnimating(true);
		setIsDown(true);
		handleClick();

		setTimeout(() => { 
			setIsAnimating(false);
		}, animationTime);
	}

	function handleUp() {
		setIsDown(false);
	}

	useEffect(() => {
		let newLineClass;

		if(isOver && !isDown) {
			newLineClass = 'line-over';
		} else if(isAnimating || !isAnimating && isDown && isOver) {
			newLineClass = 'line-down';
		} else {
			newLineClass = '';
		}
 
		setLineClass(newLineClass);
	}, [isOver, isDown, isAnimating]);*/

	useEffect(() => { 
		let newLineClass = '';  

		// over
		if(cursorLocation === 'over') {
			if(cursorStatus === 'up') {
				newLineClass = 'line-over';
			// down
			} else if(cursorStatus === 'down') {
				newLineClass = 'line-down';
			}
		// out
		} else {
			if(animationStatus === 'opening' || animationStatus === 'closing') {
				newLineClass = 'line-animating ';
			} 
		} 

		setLineColorClass(newLineClass);
	}, [cursorStatus, cursorLocation, animationStatus])

	useEffect(() => {
		if(animationStatus === 'closing') {
			setLineAnimationClass('line-closing');
		} else if (animationStatus === 'opening') {
			setLineAnimationClass('line-opening');
		}
		/*console.log('animationStatus', animationStatus);*/
		/*if(isOpen) {
			console.log('opening');
		} else {
			console.log('isClosing');
		}*/
	}, [animationStatus])



	return (
		<div className="open-close-toggle" 	
			onMouseOver={handleOver}
			onMouseOut={handleOut}
			onMouseDown={handleDown}
			onMouseUp={handleUp}> 
			<div className={`line ${lineColorClass}`}></div>
			<div className={`line ${lineColorClass} ${lineAnimationClass}`}></div>
		</div> 
	)
}