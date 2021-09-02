import React, {useState, useEffect} from 'react';
import './BurgerStyle.css';

export default function Burger({isOpen, setIsOpen, menuOptions}) {
	const burgerClass = isOpen ? 'burger burger-open' : 'burger'; 
	const [burgerBarClass, setBurgerBarClass] = useState('burger-bar'); 

	const animationTime = 500;
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	function handleMouseOver() { 
		setIsOver(true);
	}

	function handleMouseOut() { 
		setIsOver(false);
		setIsDown(false);
	}

	function handleMouseDown() {
		setIsDown(true);
		setIsOpen(oldVal => !oldVal);

		setIsAnimating(true);

		setTimeout(() => {
			setIsAnimating(false);
		}, animationTime); 
	}

	function handleMouseUp() { 
		setIsDown(false);
	} 

	useEffect(() => {
		if(isOver && !isDown) {
			setBurgerBarClass('burger-bar burger-bar-hover');
		} else if(!isOver && !isDown && !isAnimating) {
			setBurgerBarClass('burger-bar');
		} else if(isDown && isOver || isAnimating && !isOver) {
			setBurgerBarClass('burger-bar burger-bar-down');
		}
	}, [isOver, isDown, isAnimating]);

	return (
		<div className={burgerClass}  
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}>
			<div className={burgerBarClass}></div>
			<div className={burgerBarClass}></div>
			<div className={burgerBarClass}></div>
		</div>	
	)
}