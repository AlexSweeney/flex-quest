import React, {useState} from 'react';
import OpenCloseBox from './OpenCloseBox.jsx';
import Burger from './Burger.jsx';
import BurgerDropDown from './BurgerDropDown.jsx';
import OpenCloseToggle from './OpenCloseToggle.jsx'; 
import './BoxStyle.css';

export default function Box({title, bodyText, menuOptions, textOptions}) { 
	const [menuOptionNum, setMenuOptionNum] = useState(0);
	const selectedTitle = title || (menuOptions && menuOptions[0]) || '';
	const selectedText = bodyText || (textOptions && textOptions[0]) || '';

	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const [burgerWasOpen, setBurgerWasOpen] = useState(false);

	const [isExpanded, setIsExpanded] = useState(true); 

	function handleOpenCloseToggleClick() {  
		if(isExpanded) {
			closeBox();
		} else if(!isExpanded) {
			openBox();
		}
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

	function handleBurgerTitleClick(option) {
		setMenuOptionNum(menuOptions.indexOf(option));
		handleBurgerClick();
	} 
 
	return ( 
		<OpenCloseBox /> 
	)
}

{/*<div className="box">*/}
			
	
	 {/*<div className={(isExpanded ? "box expanded-box" : "box closed-box")}>*/}
			{/*<div className="box-header"> 
				{/* 
					* shrink title then shrink burger, test concept first

				*/}
	 			{/*<Burger isOpen={burgerIsOpen} isHidden={!isExpanded} menuOptions={menuOptions} handleClick={handleBurgerClick}/>*/}
	 			{/*<div className={isExpanded ? "title-container" : "title-container no-width"}>
	 				<h2 className="title">{selectedTitle}</h2>
	 			</div>*
	 			<div></div>
	 			{/*<h2 className="title">{selectedTitle}</h2>*
	 			
	 			<div className={isExpanded ? "open-container" : "open-container no-width"}>
	 				<div className="burger-container"></div>
	 				<div className="title-container"></div>
	 				{/*<div className={isExpanded ? "burger-container" : "burger-container no-width"}></div>
	 				<div className={isExpanded ? "title-container" : "title-container no-width"}>
	 			</div>
	 			{/*<OpenCloseToggle isOpen={!isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			<div className="toggle-container" onClick={handleOpenCloseToggleClick}></div>
	 		</div>*/}

	 		{/*<div className="box-body"> 
	 			<div className={isExpanded ? "text-body show" : "text-body no-show"}>
	 				{selectedText}
	 			</div> 
	 			<BurgerDropDown isOpen={burgerIsOpen} options={menuOptions} handleOptionClick={handleBurgerTitleClick}/>
	 		</div> */}
	 /*	</div>*/