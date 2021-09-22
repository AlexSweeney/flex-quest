import React, {useState, useEffect} from 'react';
import './BurgerStyle.css';

export default function Burger({burgerIsOpen, setBurgerIsOpen}) {
	/*
		* show burger icon

		* rotate 90deg on click

		* change color 
			* over 
			* animating 
			* click   
	*/

	// ============================== State ============================= //
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ============================== Class ============================= //
	const [burgerOpenClass, setBurgerOpenClass] = useState('burger-closed');
	const [burgerBarClass, setBurgerBarClass] = useState('burger-bar');
	
	// ============================== Event Handlers ==================== //
	function handleMouseOver(e) { 
		setIsOver(true)
	}

	function handleMouseOut(e) {  
		setIsOver(false)
		setIsDown(false)
	}

	function handleMouseDown(e) { 
		setIsDown(true)
		setBurgerIsOpen(oldVal => !oldVal)
	}

	function handleMouseUp(e) {  
		setIsDown(false);
	} 

	function onTransitionStart(e) { 
		if(e.propertyName === 'transform') setIsAnimating(true)
	}

	function onTransitionEnd(e) {
		if(e.propertyName === 'transform') setIsAnimating(false)
	}

	// ============================== Detect Transition ==================== //
 	useEffect(() => {
 		const burgerElement = document.getElementById('burger');
 		burgerElement.addEventListener('transitionstart', onTransitionStart)
 		burgerElement.addEventListener('transitionend', onTransitionEnd)
 	}, [])

 	// ============================== Set Classes ============================= //
 	// burger is open
 	useEffect(() => {
 		if(burgerIsOpen) setBurgerOpenClass('burger-open')
 		if(!burgerIsOpen) setBurgerOpenClass('burger-closed')
 	}, [burgerIsOpen])

 	// burger bar colors
	useEffect(() => {
		if(isOver && !isDown && !isAnimating) { 
			setBurgerBarClass('burger-bar-hover');
		} else if(!isOver && !isDown && !isAnimating) { 
			setBurgerBarClass('burger-bar-out');
		} else if(isDown || isAnimating) { 
			setBurgerBarClass('burger-bar-down');
		}
	}, [isOver, isDown, isAnimating]); 
	
	// ============================== Output ============================= //
	return (
		<div className={`burger ${burgerOpenClass}`} id="burger"
			onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
			onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
				<div className={`burger-bar ${burgerBarClass}`}></div>
				<div className={`burger-bar ${burgerBarClass}`}></div>
				<div className={`burger-bar ${burgerBarClass}`}></div>
		</div> 
	)
} 