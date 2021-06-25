import React from 'react';
import './BurgerStyle.css';

export default function Burger({open}) {
	return (
		<div className="burger">
			<div className="burger-bar"></div>
			<div className="burger-bar"></div>
			<div className="burger-bar"></div>
		</div>		
	)
}

{/*<div className={open ? "burger-container" : "burger-container burger-gone"}>
			<div className="burger-bar"></div>
			<div className="burger-bar"></div>
			<div className="burger-bar"></div>
		</div>*/}