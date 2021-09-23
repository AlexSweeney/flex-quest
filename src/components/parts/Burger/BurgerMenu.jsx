import React, {useState, useEffect} from 'react';
import './BurgerMenu.css';

export default function BurgerMenu({isOpen, options, handleOptionClick}) { 
	/*
		*	if isOpen show options

		* if !isOpen don't show options

		* animate show and hide

		if click option call handle click and hide options 
	
	*/

	const [menuOpenClass, setMenuOpenClass] = useState('burger-menu-closed');
	const menuTitles = 

	useEffect(() => {
		if(isOpen) setMenuOpenClass('burger-menu-open')
		if(!isOpen) setMenuOpenClass('burger-menu-closed')
	}, [isOpen])

	return ( 
		<div className={`burger-menu ${menuOpenClass}`}>
			{options && options.map(option => (
				<h3 className="menu-title" onClick={() => handleOptionClick(option)}>
					{option}
				</h3>
			))}
		</div>
	)
}