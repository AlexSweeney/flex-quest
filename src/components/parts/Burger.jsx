import React, {useState} from 'react';
import './BurgerStyle.css';

export default function Burger({isOpen, handleClick}) {
	const [isHover, setIsHover] = useState(false);
	const [isDown, setIsDown] = useState(false);

	const burgerClass = isOpen ? 'burger burger-open' : 'burger'; 
 	const burgerBarClass = (() => {
 		let thisClass = 'burger-bar';
 		if(isHover) thisClass += ' burger-bar-hover';
 		if(isDown) thisClass += ' burger-bar-down';
 		return thisClass;
 	})();

	function handleMouseOver() {
		setIsHover(true);
	}

	function handleMouseOut() {
		setIsHover(false);
		setIsDown(false);
	}

	function handleMouseDown() {
		setIsDown(true);
		handleClick();
	}

	function handleMouseUp() {
		setIsDown(false);
	}

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