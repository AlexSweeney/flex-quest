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

	function handleOpenCloseToggleClick() {  
		if(isExpanded) closeBox();
		else if(!isExpanded) openBox();
	}

	function closeBox() {
		setBurgerIsOpen(false);
		setIsExpanded(false);
		setTitleSize(true);
	}

	function openBox() {
		if(burgerWasOpen) setBurgerIsOpen(true);
		setIsExpanded(true);
		setTitleSize(false);
	}

	function setTitleSize(open) {
		const boxSize = document.querySelector('#box-header').getBoundingClientRect().width + 'px';
		const width = open ? boxSize : '100%';
		document.querySelector('#title').style.width = width;
		console.log('boxSize', boxSize);
	}

	function handleBurgerClick() {
		setBurgerIsOpen(oldVal => !oldVal);
		setBurgerWasOpen(oldVal => !oldVal);
	}

	return (
		<div className="box">
			<div className={isExpanded ? "box-header box-header-expanded" : "box-header box-header-minimized"} id="box-header"> 
				<div className="burger-container">
					<Burger isOpen={burgerIsOpen} isExpanding={isExpanded} menuOptions={menuOptions} handleClick={handleBurgerClick}/>
				</div>
				<div className={ isExpanded ? "title title-opening" : "title title-closing"} id="title">{title}</div>
				{/*<div className="open-close-toggle-container" onClick={handleOpenCloseToggleClick}></div>*/}

				<div className="open-close-toggle-container">
					<OpenCloseToggle isOpen={!isExpanded} handleClick={handleOpenCloseToggleClick}/>
		 		</div>
		 	</div>
	 	</div>
	);
}

//  onClick={handleOpenCloseToggleClick}