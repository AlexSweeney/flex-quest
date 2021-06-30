// auto find width for title when close
// when open show burger first

import React, {useState} from 'react';
import OpenCloseToggle from './OpenCloseToggle.jsx'; 
import Burger from './Burger.jsx';
import './OpenCloseHeader.css';

export default function OpenCloseHeader() {
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const [burgerWasOpen, setBurgerWasOpen] = useState(false);

	const [isExpanded, setIsExpanded] = useState(true); 

	const title = 'title example'; 
	const menuOptions = ['a', 'b', 'c'];
	// const burgerIsOpen = false;
	function handleOpenCloseToggleClick() {  
		if(isExpanded) closeBox();
		else if(!isExpanded) openBox();
	}

	function closeBox() {
		setBurgerIsOpen(false);
		setIsExpanded(false);
	}

	function openBox() {
		if(burgerWasOpen) setBurgerIsOpen(true);
		setIsExpanded(true);
	}

	function handleBurgerClick() {
		setBurgerIsOpen(oldVal => !oldVal);
		setBurgerWasOpen(oldVal => !oldVal);
	}

	return (
		<div className="box">
			<div className={isExpanded ? "box-header box-header-expanded" : "box-header box-header-minimized"}> 
				{/*<div className="burger"></div>*/}
				<Burger isOpen={burgerIsOpen} isHidden={!isExpanded} menuOptions={menuOptions} handleClick={handleBurgerClick}/>
				<div className={ isExpanded ? "title" : "title title-closing"}>{title}</div>
				{/*<div className="open-close-toggle-container" onClick={handleOpenCloseToggleClick}></div>*/}
				<OpenCloseToggle isOpen={!isExpanded} handleClick={handleOpenCloseToggleClick}/>
		 	</div>
	 	</div>
	);
}