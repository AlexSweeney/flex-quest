import React, {useState, useEffect} from 'react';
import './OpenCloseToggleStyle.css';
import {detectTransition} from './../../utils.js';

export default function OpenCloseToggle({
	toggleIsOpen = false, 
	parentIsAnimating = false, 
	handleClick = () => { console.log('no function passed to OpenCloseToggle')}, 
	i = Math.random()}) { 
	const vertLineId = 'vert-line-' + i;
	const horizLineId = 'horiz-line-' + i;
	const openCloseToggleId = 'open-close-toggle' + i;
	const [lineIsAnimating, setLineIsAnimating] = useState(false);
	const [lineDirectionClass, setLineDirectionClass] = useState(toggleIsOpen ? 'line-open' : 'line-closed');
	const [lineColorClass, setLineColorClass] = useState('line-out');

	const [cursorLocation, setCursorLocation] = useState('');
	const [cursorStatus, setCursorStatus] = useState(''); 

	const [isAnimating, setIsAnimating] = useState(false);

	function handleDown() {
		handleClick();
		setCursorStatus('down'); 
	}

	function handleUp() {
		setCursorStatus('up'); 
	}

	function handleOver() {
		setCursorLocation('over');
	}

	function handleOut(e) {  
		if(e.target.id !== vertLineId && e.target.id !== horizLineId &&
			e.relatedTarget.id !== vertLineId && e.relatedTarget.id !== horizLineId) { 
			setCursorLocation('out'); 
			setCursorStatus(''); 
		}
	} 

	// change line color
	useEffect(() => {	
		// cursor
		if(cursorLocation === 'over' && cursorStatus === '') {
			setLineColorClass('line-over');
		} else if(cursorLocation === 'out' && !isAnimating) {
			setLineColorClass('line-out');
		} else if(cursorLocation === 'over' && cursorStatus === 'up') {
			setLineColorClass('line-up');
		} else if(cursorStatus === 'down' && cursorLocation === 'over') {
			setLineColorClass('line-down');
		// animation
		} else if(isAnimating && cursorLocation === 'out') {
			setLineColorClass('line-animating');
		} 
	}, [cursorStatus, cursorLocation, isAnimating])

	// change line direction
	useEffect(() => {
		if(toggleIsOpen) {
			setLineDirectionClass('line-open');
		} else {
			setLineDirectionClass('line-closed');
		} 
	}, [toggleIsOpen]);

	// detect animation
	useEffect(() => {
		detectTransition(vertLineId, 'transform', setLineIsAnimating)
	}, [])

	useEffect(() => {
		if(parentIsAnimating || lineIsAnimating) {
			setIsAnimating(true)
		} else {	
			setIsAnimating(false)
		}
	}, [parentIsAnimating, lineIsAnimating])

	return (
		<div className="open-close-toggle" 	
			id={openCloseToggleId}
			onMouseOver={handleOver}
			onMouseOut={handleOut}
			onMouseDown={handleDown}
			onMouseUp={handleUp}>
			<div className={`line ${lineColorClass}`} id={horizLineId}></div>
			<div className={`line ${lineColorClass} ${lineDirectionClass}`} id={vertLineId}></div>
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