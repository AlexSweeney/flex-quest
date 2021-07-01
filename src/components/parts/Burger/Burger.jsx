import React, {useState} from 'react';
import './BurgerStyle.css';

export default function Burger({isOpen, setIsOpen, menuOptions}) {
	const burgerClass = isOpen ? 'burger burger-open' : 'burger'; 
	const [burgerBarClass, setBurgerBarClass] = useState('burger-bar'); 

	function handleMouseOver() { 
		setBurgerBarClass('burger-bar burger-bar-hover');
	}

	function handleMouseOut() { 
		setBurgerBarClass('burger-bar');
	}

	function handleMouseDown() {
		setBurgerBarClass('burger-bar burger-bar-down'); 
		setIsOpen(oldVal => !oldVal);
	}

	function handleMouseUp() { 
		setBurgerBarClass('burger-bar');
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