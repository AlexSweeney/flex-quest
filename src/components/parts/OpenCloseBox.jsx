// auto find width for title when close
// when open show burger first

import React, {useState} from 'react';
import OpenCloseToggle from './OpenCloseToggle.jsx'; 
import Burger from './Burger.jsx';
import BurgerDropDown from './BurgerDropDown.jsx';
import './OpenCloseBox.css';

export default function OpenCloseBox() {
	const idNum = Date.now();
	const boxId = `box_${idNum}`;
	const titleId = `title_${idNum}`;

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
		const boxSize = document.querySelector(`#${boxId}`).getBoundingClientRect().width + 'px';
		const width = open ? boxSize : '';
		document.querySelector(`#${titleId}`).style.width = width; 
		console.log('boxSize', boxSize);
	}

	function handleBurgerClick() {
		setBurgerIsOpen(oldVal => !oldVal);
		setBurgerWasOpen(oldVal => !oldVal);
	}

	return ( 
		<div className={isExpanded ? "box box-expanded" : "box box-minimized"} id={boxId}> 
			<div className="box-header">
				<div className={ isExpanded ? "burger-container burger-container-opening" : "burger-container"}>
					<Burger isOpen={burgerIsOpen} isExpanding={isExpanded} menuOptions={menuOptions} handleClick={handleBurgerClick}/>
				</div>

				<div className={ isExpanded ? "title title-opening" : "title title-closing"} id={titleId}>{title}</div>

				<div className="open-close-toggle-container">
					<OpenCloseToggle isOpen={!isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
			</div>
			<div className="box-body">
				<BurgerDropDown isOpen={burgerIsOpen} options={menuOptions} handleOptionClick={console.log('option click')}/>
			</div>
	 	</div> 
	);
} 