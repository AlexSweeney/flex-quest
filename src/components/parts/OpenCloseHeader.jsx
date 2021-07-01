// auto find width for title when close
// when open show burger first

import React, {useState} from 'react';
import OpenCloseToggle from './OpenCloseToggle.jsx'; 
import Burger from './Burger/Burger.jsx';
import './OpenCloseHeader.css';

export default function OpenCloseBox() {
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const [burgerWasOpen, setBurgerWasOpen] = useState(false);

	const [isExpanded, setIsExpanded] = useState(true); 

	const title = 'title example'; 
	const menuOptions = ['a', 'b', 'c'];  

	function handleOpenCloseToggleClick() {  
		if(isExpanded) closeBox();
		else if(!isExpanded) openBox();
	}

	function closeBox() {
		setBurgerIsOpen(false);
		setIsExpanded(false);
		// setTitleSize(true);
	}

	function openBox() {
		if(burgerWasOpen) setBurgerIsOpen(true);
		setIsExpanded(true);
		// setTitleSize(false);
	}

	function setTitleSize(open) {
		/*const boxSize = document.querySelector('#box-header').getBoundingClientRect().width + 'px';
		const width = open ? boxSize : '';
		document.querySelector('#title').style.width = width; */
	}

	function handleBurgerClick() {
		setBurgerIsOpen(oldVal => !oldVal);
		setBurgerWasOpen(oldVal => !oldVal);
	}

	return ( 
		<div className={isExpanded ? "box-header box-header-expanded" : "box-header box-header-minimized"} id="box-header" onClick={handleOpenCloseToggleClick}> 
			{/*<div className={ isExpanded ? "burger-container burger-container-opening" : "burger-container"}>
				<Burger isOpen={burgerIsOpen} isExpanding={isExpanded} menuOptions={menuOptions} handleClick={handleBurgerClick}/>
			</div>
			<div className={ isExpanded ? "title title-opening" : "title title-closing"} id="title">{title}</div>

			<div className="open-close-toggle-container">
				<OpenCloseToggle isOpen={!isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 		</div> */}
	 	</div> 
	);
} 