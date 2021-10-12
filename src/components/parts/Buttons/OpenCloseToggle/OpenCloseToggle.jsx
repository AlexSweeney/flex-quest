import React, {useState, useEffect} from 'react';
import Button from './../Button.jsx';
import {triggerOnTransitionEnd} from './../../../utils.js';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({
	toggleIsOpen = false, 
	parentIsAnimating = false, 
	handleClick = () => {}, 
	i = 0}) { 
	/*
		* when Toggle is closed = plus sign
		* when Toggle is open = minus sign
		* animate rotatation between plus and minus sign
		* call handleClick on click
		* change color on over, down, animating 
		* revert color on out / animation over 
		* fade color changes

		use proper colors
		fix triggerOnTransitionEnd => not triggered by other transitions (once => doesn't work)

		tidy 
		push
	*/

	/*  
	*/

	// ==================================== Constants ==================================== //
	// ================== Ids 
	const vertLineId = 'vert-line-' + i;
	const horizLineId = 'horiz-line-' + i;
	const openCloseToggleId = 'open-close-toggle' + i;

	// ================== Status
	/*const [cursorLocation, setCursorLocation] = useState('');
	const [cursorStatus, setCursorStatus] = useState('up'); 
	const [animationStatus, setAnimationStatus] = useState('');

	const [lineIsAnimating, setLineIsAnimating] = useState(false);*/
	const [isOver, setIsOver] = useState(false);
	const [lineIsTransforming, setLineIsTransforming] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ================== Classes
	const [colorClass, setColorClass] = useState('line-out');
	const [transitionClass, setTransitionClass] = useState('');
	const [transformClass, setTransformClass] = useState('');
	// const [vertLineClass, setVertLineClass] = useState('line-out');
	/*const [lineDirectionClass, setLineDirectionClass] = useState(null);
	const [lineAnimatingClass, setLineAnimatingClass] = useState('line-not-animating');
	const [linePositionClass, setLinePositionClass] = useState('line-out');
*/

	// ==================================== Event Handlers =============================== //
	function onMouseOver() { 
		setIsOver(true)	 
		if(!isAnimating) setLineOverClasses()
	}

	function onMouseOut() { 
		setIsOver(false)
		if(!isAnimating) setLineOutClasses()
	}

	function onMouseDown() {
		if(!isAnimating) {
			handleClick() 
			setLineAnimatingClasses() 
			setIsAnimating(true)
			listenForTransformEnd()
		} 
	}

	function onTransformEnd() {
		console.log('animation over ----')
		setIsAnimating(false)
	}

	function onToggleOpening() {
		console.log('toggle opening')
		setLineOpeningClasses()
	}

	function onToggleOpen() {
		console.log('toggle open') 
		setLineAnimationFinishedClasses()
	}

	function onToggleClosing() {
		console.log('toggle closing')
		setLineClosingClasses()
	}

	function onToggleClosed() {
		console.log('toggle closed')
		setLineAnimationFinishedClasses() 
	} 

	// ==================================== Helper Fns =================================== //
	function setLineOverClasses() {
		setTransitionClass('line-over-transition')			
		setColorClass('line-over');
	}

	function setLineOutClasses() {
		setTransitionClass('line-out-transition')
		setColorClass('line-out');
	}

	function setLineDownClasses() {
		setTransitionClass('line-down-transition')
		setColorClass('line-down')
	}

	function setLineOpeningClasses() {
		setColorClass('line-open')
		setTransitionClass('line-open-transition')
		setTransformClass('line-open-transform')
	}

	function setLineClosingClasses() {
		setColorClass('line-closed')
		setTransitionClass('line-closed-transition')
		setTransformClass('line-closed-transform')
	}

	function setLineAnimatingClasses() {
		setColorClass('line-animating') 
	}

	function setLineAnimationFinishedClasses() { 
		if(isOver) setLineOverClasses()
		if(!isOver) setLineOutClasses()  
	}

	function listenForTransformEnd() {
		triggerOnTransitionEnd(vertLineId, 'transform', onTransformEnd) 
	} 

	// ==================================== Listen / Trigger ============================= //
	// =========== Open close toggle
	useEffect(() => {
		if(toggleIsOpen) onToggleOpening()
		if(!toggleIsOpen) onToggleClosing()
	}, [toggleIsOpen])
	
	// =========== On Animation end
	useEffect(() => {
		if(!isAnimating) {
			if(toggleIsOpen) onToggleOpen()
			if(!toggleIsOpen) onToggleClosed()
		}
	}, [toggleIsOpen, isAnimating])

	// useEffect(() => {
		/*if(isAnimating) {
			if(toggleIsOpen) onToggleOpen()
			if(!toggleIsOpen) onToggleClosed()
		}
*/
		/*if(!isAnimating) {
			if(toggleIsOpen) onToggleOpen()
			if(!toggleIsOpen) onToggleClosed()
		}
	}, [isAnimating, toggleIsOpen])*/
	/*useEffect(() => { 
		console.log('animation trigger ====================') 
		console.log('lineIsTransforming', lineIsTransforming)
		console.log('parentIsAnimating', parentIsAnimating)
		if(!lineIsTransforming && parentIsAnimating || lineIsTransforming && !parentIsAnimating) onAnimationStart()
		if(!lineIsTransforming && !parentIsAnimating) onAnimationEnd() 
	}, [lineIsTransforming, parentIsAnimating])
*/


	// ============ Line Classes
	/*useEffect(() => {
		// over
		if(cursorLocation === 'over' && cursorStatus === 'up' && !isAnimating) {
			setHorizLineClass('line-over')
			setVertLineClass('line-over')
		}
		// out
		if(cursorLocation === 'out' && !isAnimating) {
			setHorizLineClass('line-out')
			setVertLineClass('line-out')
		}
		// down

		// opening 

		// closing
	}, [cursorLocation, cursorStatus, isAnimating])*/
	/*useEffect(() => {
		detectTransition(vertLineId, 'transform', setLineIsAnimating)
	}, [])*/

	// ================== Set Classes ================== //
	// ========== Line Color Class 
/*	useEffect(() => {	
		// cursor
		if(cursorLocation === 'over' && cursorStatus === '') {
			setLinePositionClass('line-over');
		} else if(cursorLocation === 'out' && !isAnimating) {
			setLinePositionClass('line-out');
		} else if(cursorLocation === 'over' && cursorStatus === 'up') {
			setLinePositionClass('line-up');
		} else if(cursorStatus === 'down' && cursorLocation === 'over') {
			setLinePositionClass('line-down'); 
		}

	 	if(isAnimating && cursorLocation === 'out') {
			setLinePositionClass('line-animating');
		} 
	}, [cursorStatus, cursorLocation, isAnimating])*/

	// ========== Line direction class 
	/*useEffect(() => {
		if(toggleIsOpen) {
			setLineDirectionClass('line-open');
		} else {
			setLineDirectionClass('line-closed');
		} 
	}, [toggleIsOpen]);*/

	// ========== Set Is Animating
	/*useEffect(() => {
		if(parentIsAnimating || lineIsAnimating) {
			setIsAnimating(true)
		} else {	
			setIsAnimating(false)
		}
	}, [parentIsAnimating, lineIsAnimating]) 
*/
	// ================== Output ================== //
	return (
		<Button>
			<div className="open-close-toggle" 	
				id={openCloseToggleId}
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}
				onMouseDown={onMouseDown}> 
				<div className={`line ${colorClass} ${transitionClass}`} id={horizLineId}></div>
				<div className={`line ${colorClass} ${transitionClass} ${transformClass}`} id={vertLineId}></div>
			</div>
		</Button>
	)
}

/*



	// function handleDown() {
	// 	handleClick();
	// 	// setCursorStatus('down'); 
	// }

	// function handleUp() {
	// 	// setCursorStatus('up'); 
	// }

	// function handleOut(e) {  
	// 	// if(e.target.id !== vertLineId && e.target.id !== horizLineId &&
	// 	// 	e.relatedTarget.id !== vertLineId && e.relatedTarget.id !== horizLineId) { 
	// 	// 	setCursorLocation('out'); 
	// 	// 	setCursorStatus(''); 
	// 	// }
	// }


<div className={`line ${linePositionClass} ${lineAnimatingClass}`} id={horizLineId}></div>
				<div className={`line ${linePositionClass} ${lineAnimatingClass} ${lineDirectionClass}`} id={vertLineId}></div>

<div className="open-close-toggle" 	
			id={openCloseToggleId}
			onMouseOver={handleOver}
			onMouseOut={handleOut}
			onMouseDown={handleDown}
			onMouseUp={handleUp}>
			<div className={`line ${linePositionClass}`} id={horizLineId}></div>
			<div className={`line ${linePositionClass} ${lineDirectionClass}`} id={vertLineId}></div>
		</div> 
*/
/* ==================== Bin
	/*const [linePositionClass, setLinePositionClass] = useState('');
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
		let newlinePositionClass = '';  

		// over
		if(cursorLocation === 'over') {
			if(cursorStatus === 'up') {
				newlinePositionClass = 'line-over';
			// down
			} else if(cursorStatus === 'down') {
				newlinePositionClass = 'line-down';
			}
		// out
		}/* else {
			if(animationStatus === 'opening' || animationStatus === 'closing') {
				newlinePositionClass = 'line-animating ';
			} 
		} 

		setLinePositionClass(newlinePositionClass);
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

			${linePositionClass}
	*/}