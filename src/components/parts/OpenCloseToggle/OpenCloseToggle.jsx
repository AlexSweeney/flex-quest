// fix out

import React, {useState, useEffect} from 'react';
import './OpenCloseToggleStyle.css';
import {detectTransitions} from './../../utils.js';

export default function OpenCloseToggle({toggleIsOpen, parentIsAnimating, handleClick, i = Math.random()}) { 
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
		detectTransitions(vertLineId, 'transform', setLineIsAnimating)
	}, [])

	useEffect(() => {
		if(parentIsAnimating || lineIsAnimating) {
			setIsAnimating(true)
		} else {	
			setIsAnimating(false)
		}
	}, [parentIsAnimating, lineIsAnimating])

	useEffect(() => { console.log('isAnimating', isAnimating)}, [isAnimating])

	// // change line direction
	// useEffect(() => {
	// 	if(toggleIsOpen) {
	// 		setLineDirectionClass('line-open');
	// 	} else {
	// 		setLineDirectionClass('line-closed');
	// 	}
	// 	if(!parentIsAnimating) {
	// 		if(isOpen) {
	// 			setLineDirectionClass('line-open');
	// 		} else {
	// 			setLineDirectionClass('line-closed');
	// 		}	
	// 	} 
	// }, [toggleIsOpen]);

	// change line color
	// useEffect(() => {	
	// 	// cursor
	// 	if(cursorLocation === 'over' && cursorStatus === '') {
	// 		setLineColorClass('line-over');
	// 	} else if(cursorLocation === 'out' && animationStatus == '') {
	// 		setLineColorClass('line-out');
	// 	} else if(cursorLocation === 'over' && cursorStatus === 'up') {
	// 		setLineColorClass('line-up');
	// 	} else if(cursorStatus === 'down' && cursorLocation === 'over') {
	// 		setLineColorClass('line-down');
	// 	// animation
	// 	} else if(toggleIsAnimating && cursorLocation === 'out') {
	// 		setLineColorClass('line-animating');
	// 	} /*else if(animationStatus === 'lineIsAnimating'  && cursorLocation === 'out') {
	// 		setLineColorClass('line-animating');
	// 	} else if(animationStatus === 'lineHasAnimated'  && cursorLocation === 'out') {
	// 		setLineColorClass('line-animated');
	// 	} */
	// }, [cursorStatus, cursorLocation, animationStatus])

	// animation status : parent animating
	/*useEffect(() => {
		if(parentIsAnimating) {
			setAnimationStatus('parentIsAnimating');
		} else if (animationStatus !== 'lineIsAnimating' && !parentIsAnimating) {
			setAnimationStatus('');
		}
	}, [parentIsAnimating]) */

	// useEffect(() => {
	// 	console.log('parentIsAnimating', parentIsAnimating);
	// }, [parentIsAnimating]);
   
	// useEffect(() => {
	// 	console.log('cursorLocation', cursorLocation);
	// }, [cursorLocation]);

	// useEffect(() => {
	// 	console.log('cursorStatus', cursorStatus);
	// }, [cursorStatus]);

	// useEffect(() => {
	// 	console.log('animationStatus', animationStatus); 
	// }, [animationStatus]); 

	// animation status : line animating
	// useEffect(() => { 
	// 	const lineElement = document.getElementById(vertLineId); 
		
	// 	lineElement.addEventListener('transitionstart', (e) => {  
	// 		if(e.propertyName === 'transform') {
	// 			setAnimationStatus('lineIsAnimating');
	// 		} 
	// 	})

	// 	lineElement.addEventListener('transitionend', (e) => { 
	// 		if(e.propertyName === 'transform') {
	// 			setAnimationStatus('lineHasAnimated');
	// 		} 
	// 	})
	// }, [])


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