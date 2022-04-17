import React, {useState, useEffect} from 'react';
import {
	triggerOnTransitionEnd,
} from '../../../utils/utils.js';
import './BurgerStyle.css';

export default function Burger({burgerIsOpen, setBurgerIsOpen, i = 0}) {
	/*
		* show burger icon

		* on click 
			* rotate 90deg 
			* change color while rotating

		* on burgerIsOpen changed externally
			* rotate 90deg

		* change color 
			* over 
			* animating 
			* click    
	*/
	// ============================== Constants ============================= //
	// ================== Ids
	const burgerId = `burger-${i}`;

	// ================== State 
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ================== Class 
	const [burgerOpenClass, setBurgerOpenClass] = useState('burger-closed');
	const [burgerBarClass, setBurgerBarClass] = useState('burger-bar');
	
	// ============================== Event Handlers ==================== //
	function onMouseOver(e) { 
		setIsOver(true)
	}

	function onMouseOut(e) {  
		setIsOver(false)
		setIsDown(false)
	}

	function onMouseDown(e) { 
		setIsDown(true)
		setIsAnimating(true)		
		triggerOnTransitionEnd(burgerId, 'transform', onBurgerTransformEnd)
		setBurgerIsOpen(oldVal => !oldVal)
	}

	function onMouseUp(e) {  
		setIsDown(false);
	} 

	function onBurgerTransformEnd() {
		setIsAnimating(false)
	} 

	// ============================== Helper Fns ======================= //
	function closeBurger() {
		setBurgerOpenClass('burger-closed')
	}

	function openBurger() { 
		setBurgerOpenClass('burger-open')
	}

	function updateBurgerColorClass(isOver, isDown, isAnimating) {
		let newClass;

		if(isOver && !isDown && !isAnimating) { 
			newClass = 'burger-bar-hover';
		} else if(!isOver && !isDown && !isAnimating) { 
			newClass = 'burger-bar-out';
		} else if(isDown || isAnimating) { 
			newClass = 'burger-bar-down';
		}

		setBurgerBarClass(newClass)
	}

	function getBurgerBarKey(i) {
		return `${burgerId}-bar-${i}`;
	}
 
	// ============================== Listen / Trigger ======================== //
	useEffect(() => {
		if(burgerIsOpen) openBurger()
		if(!burgerIsOpen) closeBurger()
	}, [burgerIsOpen]) 
  
	useEffect(() => {
		updateBurgerColorClass(isOver, isDown, isAnimating)
	}, [isOver, isDown, isAnimating]); 
	
	// ============================== Output ============================= //
	return (
		<div className={`burger ${burgerOpenClass}`} id={burgerId} key={burgerId}
			onMouseOver={onMouseOver} onMouseOut={onMouseOut}
			onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
				<div className={`burger-bar ${burgerBarClass}`} key={getBurgerBarKey(0)}></div>
				<div className={`burger-bar ${burgerBarClass}`} key={getBurgerBarKey(1)}></div>
				<div className={`burger-bar ${burgerBarClass}`} key={getBurgerBarKey(2)}></div>
		</div> 
	)
} 