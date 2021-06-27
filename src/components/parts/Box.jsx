import React, {useState} from 'react';
import Burger from './Burger.jsx';
import OpenCloseToggle from './OpenCloseToggle.jsx';
import './BoxStyle.css';

export default function Box({showBurger}) {
	const titles = [
		'Level 1: display: flex;',
		'Level 2: display: flex;',
		'Level 3: display: flex;',
		'Level 4: display: flex;',
		'Level 5: display: flex;',
		'Level 6: display: flex;',
		'Level 7: display: flex;',
		'Level 8: display: flex;',
		'Level 9: display: flex;',
		'Level 10: display: flex;',
		'Level 11: display: flex;',
		'Level 12: display: flex;',
		'Level 13: display: flex;',  
	];

	const [selectedTitle, setSelectedTitle] = useState(titles[0]);
	const [isExpanded, setIsExpanded] = useState(true); 
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);

	function handleOpenCloseToggleClick() {  
		setIsExpanded(oldVal => !oldVal);
	}

	function handleBurgerClick() {
		setBurgerIsOpen(oldVal => !oldVal);
	}

	function handleBurgerTitleClick(title) {
		setSelectedTitle(title);
	}

	return ( 
	 	<div className={(isExpanded ? "box expanded-box" : "box closed-box")}>
	 		<div className="box-header"> 
	 			<div className="burger-container">
	 				<Burger isOpen={burgerIsOpen} handleClick={handleBurgerClick}/>
	 			</div>

	 			<h2 className="title">{selectedTitle}</h2>
	 				
	 			<div className="toggle-container">
	 				<OpenCloseToggle isOpen={isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
	 		</div>
	 		<div className="box-body"> 
	 			<div className={burgerIsOpen ? "burger-body full-height" : "burger-body no-height"}>
	 				{titles.map(title => <h3 className="burger-title" onClick={() => handleBurgerTitleClick(title)}>{title}</h3>)}
	 			</div>
	 		</div>
	 	</div> 
	)
}

{/*
	<div className={burgerIsOpen && "burger-body"}></div>
	 		<div className="box-body"></div>
<div className={isExpanded ? "box expanded-box" : "box closed-box"} > 
			<div className="box-header">
				{/*<Burger open={showBurger && isExpanded} handleClick={handleOpenCloseToggleClick}/>
				
		
				<h2 className={isExpanded ? "title title-showing" : "title title-gone"}>Level 1: display: flex;</h2>
			
		
				<OpenCloseToggle isOpen={isExpanded} handleClick={handleOpenCloseToggleClick}/>
			</div>
		</div>

*/}