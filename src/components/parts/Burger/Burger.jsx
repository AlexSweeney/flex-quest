import React, {useState, useEffect} from 'react';
import './BurgerStyle.css';

export default function Burger({isOpen, setIsOpen, menuOptions}) {
	const burgerClass = isOpen ? 'burger burger-open' : 'burger'; 
	const [burgerBarClass, setBurgerBarClass] = useState('burger-bar'); 

	const animationTime = 500;
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	function handleMouseOver(e) { 
		if(e.target.id === 'burger-bar-container' || e.target.id === 'burger-bar') {
			setIsOver(true);
		}
	}

	function handleMouseOut(e) {
		const fromContainerToBurger = e.target.id === 'burger-bar-container' && e.relatedTarget.id === 'burger';
		const fromBurgerBarToBurger = e.target.id === 'burger-bar' && e.relatedTarget.id === 'burger';
		const outOfContainer = fromContainerToBurger || fromBurgerBarToBurger; 

		if(!isAnimating && outOfContainer) {
			setIsOver(false); 
			setIsDown(false);
		}
	}

	function handleMouseDown(e) {
		if(e.target.id === 'burger-bar-container' || e.target.id === 'burger-bar') {
			setIsDown(true);
			setIsOpen(oldVal => !oldVal);

			setIsAnimating(true);

			setTimeout(() => {
				setIsAnimating(false);
			}, animationTime); 
		}
	}

	function handleMouseUp(e) { 
		setIsDown(false);
	} 

	function BurgerBar() {
		return (<div className={burgerBarClass} 
							onMouseDown={handleMouseDown}
							onMouseUp={handleMouseUp}>
						</div>)
	}
 
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
		<div className={burgerClass} id="burger"  
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