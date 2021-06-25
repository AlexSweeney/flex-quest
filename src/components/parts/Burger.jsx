import React from 'react';
import './BurgerStyle.css';

export default function Burger({isOpen, handleClick}) {
	const burgerClass = isOpen ? 'burger burger-open' : 'burger';
	const burgerBarClass = isOpen ? 'burger-bar burger-bar-open' : 'burger-bar';

	return (
		<div className={burgerClass} onClick={handleClick}>
			<div className={burgerBarClass}></div>
			<div className={burgerBarClass}></div>
			<div className={burgerBarClass}></div>
		</div>		
	)
}