import React, {useState} from 'react';
import Burger from './Burger.jsx';
import OpenCloseToggle from './OpenCloseToggle.jsx'; 
import './BoxStyle.css';

export default function Box({title, menuOptions, bodyText}) { 
	const [menuOptionNum, setMenuOptionNum] = useState(0);
	const selectedTitle = title;

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
	 	<div className={(isExpanded ? "box expanded-box" : "box closed-box")}>

			<div className="box-header"> 
	 			<div className={menuOptions && "burger-container"}>
	 				<Burger isOpen={burgerIsOpen} handleClick={handleBurgerClick}/>
	 			</div>

	 			<h2 className="title">{selectedTitle}</h2>
	 				
	 			<div className="toggle-container">
	 				<OpenCloseToggle isOpen={isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
	 		</div>

	 		<div className="box-body"> 
	 			<div className={isExpanded ? "text-body show" : "text-body no-show"}>
	 				{bodyText}
	 			</div> 
	 			<div className={menuOptions && burgerIsOpen ? "burger-body full-height" : "burger-body no-height"}>
	 				{menuOptions && menuOptions.map(option => <h3 className="burger-title" onClick={() => handleBurgerTitleClick(option)}>{option}</h3>)}
	 			</div>
	 		</div>

	 	</div>
	)
}