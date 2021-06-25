import React, {useState} from 'react';
import Burger from './Burger.jsx';
import OpenCloseToggle from './OpenCloseToggle.jsx';
import './BoxStyle.css';

export default function Box({showBurger}) {
	/*const titles = [
		"Level 1: display: flex;"
	];*/

	const [isExpanded, setIsExpanded] = useState(true); 
	// const [thisTitle, setThisTitle] = useState(titles[0]);
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);

	function handleOpenCloseToggleClick() {  
		setIsExpanded(oldVal => !oldVal);
	}

	function handleBurgerClick() {
		setBurgerIsOpen(oldVal => !oldVal);
	}

	return ( 
	 	<div className={(isExpanded ? "box expanded-box" : "box closed-box")}>
	 		<div className="box-header"> 
	 			<div className="burger-container">
	 				<Burger isOpen={burgerIsOpen} handleClick={handleBurgerClick}/>
	 			</div>

	 			<h2 className="title">Level 1: display: flex;</h2>
	 				
	 			<div className="toggle-container">
	 				<OpenCloseToggle isOpen={isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
	 		</div>
	 		<div className={burgerIsOpen ? "box-body burger-body" : "box-body"}>

	 		</div>
	 	</div> 
	)
}

{/*
<div className={isExpanded ? "box expanded-box" : "box closed-box"} > 
			<div className="box-header">
				{/*<Burger open={showBurger && isExpanded} handleClick={handleOpenCloseToggleClick}/>
				
		
				<h2 className={isExpanded ? "title title-showing" : "title title-gone"}>Level 1: display: flex;</h2>
			
		
				<OpenCloseToggle isOpen={isExpanded} handleClick={handleOpenCloseToggleClick}/>
			</div>
		</div>

*/}