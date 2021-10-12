import React, {useState, useEffect} from 'react';
import Button from './../Button.jsx';
import {triggerOnTransitionEnd} from './../../../utils.js';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({
	toggleIsOpen = false,
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
 
		fix triggerOnTransitionEnd => not triggered by other transitions (once => doesn't work)

		tidy 
		push
	*/ 

	// ==================================== Constants ==================================== //
	// ================== Ids 
	const vertLineId = 'vert-line-' + i;
	const horizLineId = 'horiz-line-' + i;
	const openCloseToggleId = 'open-close-toggle' + i;

	// ================== Status 
	const [isOver, setIsOver] = useState(false);
	const [lineIsTransforming, setLineIsTransforming] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ================== Classes
	const [colorClass, setColorClass] = useState('line-out');
	const [transitionClass, setTransitionClass] = useState('');
	const [transformClass, setTransformClass] = useState('');

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
		setIsAnimating(false)
	}

	function onToggleOpening() { 
		setLineOpeningClasses()
	}

	function onToggleOpen() { 
		setLineAnimationFinishedClasses()
	}

	function onToggleClosing() { 
		setLineClosingClasses()
	}

	function onToggleClosed() { 
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