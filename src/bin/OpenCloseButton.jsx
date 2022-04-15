import React, {useState, useEffect} from 'react';
// import Button from '../parts/Buttons/Button.jsx';
// import {triggerOnTransitionEnd} from '../utils.js';
import './OpenCloseButton.scss';

export function OpenCloseButton({
	parentIsAnimating = false,
}) { 
	/*
		* Toggle closed = plus sign
		* Toggle open = minus sign
		* animated rotatation between plus and minus sign
		* calls handleClick on click
		* changes color on over, down, animating 
		* reverts color on out / animation over 
		* fades color changes 
	*/ 

	// ==================================== Constants ==================================== //
	const [lineIsVertical, setLineIsVertical] = useState(false);
	const [verticalLineClass, setVerticalLineClass] = useState('');

	// ================== Ids 
	// const vertLineId = 'vert-line-' + i;
	// const horizLineId = 'horiz-line-' + i;
	// const openCloseToggleId = 'open-close-toggle' + i;

	// ================== Status 
	// const [isOver, setIsOver] = useState(false);
	// const [lineIsTransforming, setLineIsTransforming] = useState(false);
	// const [isAnimating, setIsAnimating] = useState(false);

	// ================== Classes
	// const [colorClass, setColorClass] = useState('line-out');
	// const [transitionClass, setTransitionClass] = useState('');
	// const [transformClass, setTransformClass] = useState('');

	// =================================== Event Handlers //
	const onMouseDown = () => {
		if(!parentIsAnimating) turnVerticalLine();
	}

	const onParentAnimationEnd = () => {

	}

	// ==================================== Utils //
	const turnVerticalLine = () => {
		setLineIsVertical(oldVal => !oldVal)
	}

	const updateVerticalLineClass = (isVertical) => {
		let newClass;

		if(isVertical) newClass = 'openCloseButton-line__vertical';
		else newClass = '';
		
		setVerticalLineClass(newClass)
	}

	// function onMouseOver() { 
	// 	setIsOver(true)	 
	// 	if(!isAnimating) setLineOverClasses()
	// }

	// function onMouseOut() { 
	// 	setIsOver(false)
	// 	if(!isAnimating) setLineOutClasses()
	// }

	// function onMouseDown() {
	// 	if(!isAnimating) {
	// 		handleClick() 
	// 		setLineAnimatingClasses() 
	// 		setIsAnimating(true)
	// 		listenForTransformEnd()
	// 	} 
	// }

	// ================== Transform (rotate)
	// function onTransformEnd() { 
	// 	setIsAnimating(false)
	// }

	// ================== Toggle 
	// function onToggleOpening() { 
	// 	setLineOpeningClasses()
	// }

	// function onToggleOpen() { 
	// 	setLineAnimationFinishedClasses()
	// }

	// function onToggleClosing() { 
	// 	setLineClosingClasses()
	// }

	// function onToggleClosed() { 
	// 	setLineAnimationFinishedClasses() 
	// } 

	// ==================================== Helper Fns =================================== //
	// function setLineOverClasses() {
	// 	setTransitionClass('line-over-transition')			
	// 	setColorClass('line-over');
	// }

	// function setLineOutClasses() {
	// 	setTransitionClass('line-out-transition')
	// 	setColorClass('line-out');
	// }

	// function setLineDownClasses() {
	// 	setTransitionClass('line-down-transition')
	// 	setColorClass('line-down')
	// }

	// function setLineOpeningClasses() {
	// 	setColorClass('line-open')
	// 	setTransitionClass('line-open-transition')
	// 	setTransformClass('line-open-transform')
	// }

	// function setLineClosingClasses() {
	// 	setColorClass('line-closed')
	// 	setTransitionClass('line-closed-transition')
	// 	setTransformClass('line-closed-transform')
	// }

	// function setLineAnimatingClasses() {
	// 	setColorClass('line-animating') 
	// }

	// function setLineAnimationFinishedClasses() { 
	// 	if(isOver) setLineOverClasses()
	// 	if(!isOver) setLineOutClasses()  
	// }

	// function listenForTransformEnd() {
	// 	triggerOnTransitionEnd(vertLineId, 'transform', onTransformEnd) 
	// } 

	// ==================================== Listen / Trigger ============================= //
	// =========== Open close toggle
	// useEffect(() => {
	// 	if(toggleIsOpen) onToggleOpening()
	// 	if(!toggleIsOpen) onToggleClosing()
	// }, [toggleIsOpen])
	
	// =========== On Animation end
	// useEffect(() => {
	// 	if(!isAnimating) {
	// 		if(toggleIsOpen) onToggleOpen()
	// 		if(!toggleIsOpen) onToggleClosed()
	// 	}
	// }, [toggleIsOpen, isAnimating])

	useEffect(() => {
		updateVerticalLineClass(lineIsVertical)
	}, [lineIsVertical])

	useEffect(() => {
		if(!parentIsAnimating) onParentAnimationEnd();
	}, [parentIsAnimating])

	// ================== Output ================== //
	return (
		<button className='openCloseButton'
			onMouseDown={onMouseDown}> 
			<div className='openCloseButton-line'/>
			<div className={`openCloseButton-line ${verticalLineClass}`}/>
			
			{/* <div className="open-close-toggle" 	
				id={openCloseToggleId}
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}
				onMouseDown={onMouseDown}> 
				<div className={`line ${colorClass} ${transitionClass}`} id={horizLineId}></div>
				<div className={`line ${colorClass} ${transitionClass} ${transformClass}`} id={vertLineId}></div>
			</div> */}
		</button>
	)
}