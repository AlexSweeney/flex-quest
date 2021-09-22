import React, {useState, useEffect} from 'react';
import './BurgerStyle.css';

export default function Burger({burgerIsOpen, setBurgerIsOpen}) {
	/*
		* show burger icon

		rotate 90deg on click

		change color 
			over 
			animating 
			click  

		fix - use z-index = make simpler?
	*/

	// ============================== State ============================= //
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ============================== Class ============================= //
	const [burgerOpenClass, setBurgerOpenClass] = useState('burger-closed');
	const [burgerBarClass, setBurgerBarClass] = useState('burger-bar'); 
	const animationTime = 500;
	
	// ============================== Event Handlers ============================= //
	function handleMouseOver(e) { 
		if(isNowOver(e)) { 
			setIsOver(true)
		}
	}

	function handleMouseOut(e) {  
		if(isOut(e)) {
			setIsOver(false)
			setIsDown(false)
		}
	}

	function handleMouseDown(e) {
		// if(isNowDown()) {
			// setIsDown(true)
			setBurgerIsOpen(oldVal => !oldVal)
			// setIsAnimating(true)

			/*setTimeout(() => {
				setIsAnimating(false);
			}, animationTime);*/ 
		// }
	}

	function handleMouseUp(e) {  
		setIsDown(false);
	} 

	// ============================== Helper Functions ============================= //
	function isOut(e) {
		return e.relatedTarget.id !== 'burger-bar-container' && e.relatedTarget.id !== 'burger-bar';
	}

	function isNowDown(e) {
		return e.target.id === 'burger-bar-container' || e.target.id === 'burger-bar';
	}

	function isNowOver(e) {
		return e.target.id === 'burger-bar-container' || e.target.id === 'burger-bar';
	}

 	// ============================== Set Classes ============================= //
 	// burger is open
 	useEffect(() => {
 		if(burgerIsOpen) setBurgerOpenClass('burger-open')
 		if(!burgerIsOpen) setBurgerOpenClass('burger-closed')
 	}, [burgerIsOpen])

 	// burger bar colors
	useEffect(() => {
		if(isOver && !isDown) { 
			setBurgerBarClass('burger-bar burger-bar-hover');
		} else if(!isOver && !isDown && !isAnimating) { 
			setBurgerBarClass('burger-bar');
		} else if(isDown || isAnimating && !isOver) { 
			setBurgerBarClass('burger-bar burger-bar-down');
		}
	}, [isOver, isDown, isAnimating]); 
	
	return (
		<div className={`burger ${burgerOpenClass}`} id="burger"  
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}>
			<div className="burger-bar-container" id="burger-bar-container">
				<div className={burgerBarClass} id="burger-bar"></div>
				<div className={burgerBarClass} id="burger-bar"></div>
				<div className={burgerBarClass} id="burger-bar"></div>
			</div>
		</div>	
	)
}