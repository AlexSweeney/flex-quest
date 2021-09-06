import React, {useState, useEffect} from 'react';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({isOpen, waiting, animate, handleClick}) {  
	const thisLineId = 'Line_' + Math.random();

	const [lineDirectionClass, setLineDirectionClass] = useState(isOpen ? 'line-open' : 'line-closed');
	const [lineColorClass, setLineColorClass] = useState('');

	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	function handleDown() {
		handleClick();
		setIsDown(true); 
	}

	function handleUp() {
		setIsDown(false); 
	}

	function handleOver() {
		setIsOver(true); 
	}

	function handleOut() {
		setIsOver(false);
		setIsDown(false); 
	}

	// change line color
	useEffect(() => {	
		if(isOver) {
			setLineColorClass('line-over');
		} else if(isDown) {
			setLineColorClass('line-down');
		} else if(isAnimating) {
			setLineColorClass('line-animating');
		} else {
			setLineColorClass('');
		} 
	}, [isOver, isDown, isAnimating, waiting])

	// change line direction
	useEffect(() => {	
		if(animate) {
			if(isOpen) {
				setLineDirectionClass('line-open');
			} else {
				setLineDirectionClass('line-closed');
			}	
		} 
	}, [isOpen, animate])

	// detect animation status
	useEffect(() => {
		if(animate || waiting) {
			setIsAnimating(true);
		} else {
			setIsAnimating(false)
		}

		const lineElement = document.getElementById(thisLineId);

		lineElement.addEventListener('transitionend', () => {
			setIsAnimating(false);
		})
	}, [animate, waiting])

	return (
		<div className="open-close-toggle" 	
			onMouseOver={handleOver}
			onMouseOut={handleOut}
			onMouseDown={handleDown}
			onMouseUp={handleUp}>
			<div className={`line ${lineColorClass}`}></div>
			<div className={`line ${lineColorClass} ${lineDirectionClass}`} id={thisLineId}></div>
		</div> 
	)
}

/* ==================== Bin
	/*const [lineColorClass, setLineColorClass] = useState('');
	const [lineAnimationClass, setLineAnimationClass] = useState('');

	const [animationStatus, setAnimationStatus] = useState('');

	const [cursorLocation, setCursorLocation] = useState('out')
	const [cursorStatus, setCursorStatus] = useState('up');

	const openingDelay = 1000;
	const closingDelay = 0;
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

	useEffect(() => { 
		let newLineColorClass = '';  

		// over
		if(cursorLocation === 'over') {
			if(cursorStatus === 'up') {
				newLineColorClass = 'line-over';
			// down
			} else if(cursorStatus === 'down') {
				newLineColorClass = 'line-down';
			}
		// out
		}/* else {
			if(animationStatus === 'opening' || animationStatus === 'closing') {
				newLineColorClass = 'line-animating ';
			} 
		} 

		setLineColorClass(newLineColorClass);
	}, [cursorStatus, cursorLocation, animationStatus])

	useEffect(() => {
		if(animationStatus === 'closing') {
			setLineAnimationClass('line-closing');
		} else if (animationStatus === 'opening') {
			setLineAnimationClass('line-opening');
		} 
	}, [animationStatus])*/

	{/* 
		onMouseOver={handleOver}
			onMouseOut={handleOut}
			
			onMouseUp={handleUp}

			${lineColorClass}
	*/}