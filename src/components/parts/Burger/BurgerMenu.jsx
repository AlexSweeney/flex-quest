import React, {useState, useEffect} from 'react';
import './BurgerMenu.css';

export default function BurgerMenu({isOpen, setIsOpen, options, handleClick}) { 
	/*
		*	on isOpen 
			* show options
			* animate

		* on !isOpen 
			* hide options
			* animate

		* animate show and hide

		* on click option 
			* call handle click 
			* hide options  
	*/
	// ================================ Constants ================================= //
	const [menuOpenClass, setMenuOpenClass] = useState('burger-menu-closed');
	
	// ================================ Event Handlers ============================ //
	function onOptionClick(option) {
		handleClick(option)
		setIsOpen(false)
	}

	// ================================ Helper Fns ================================= //
	function openMenu() {
		setMenuOpenClass('burger-menu-open')
	}

	function closeMenu() {
		setMenuOpenClass('burger-menu-closed')
	}

	// ================================ Listen / Trigger =========================== //
	useEffect(() => {
		if(isOpen) openMenu()
		if(!isOpen) closeMenu()
	}, [isOpen])

	// ================================ Output ===================================== //
	return ( 
		<div className={`burger-menu ${menuOpenClass}`}>
			{options && options.map(option => (
				<h3 className="menu-title" onClick={() => onOptionClick(option)}>
					{option}
				</h3>
			))}
		</div>
	)
}