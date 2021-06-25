import React, {useState} from 'react';
import Burger from './Burger.jsx';
import OpenCloseToggle from './OpenCloseToggle.jsx';
import './BoxStyle.css';

export default function Box({showBurger}) {
	const titles = [
		"Level 1: display: flex;"
	];

	const [isExpanded, setIsExpanded] = useState(true); 
	const [thisTitle, setThisTitle] = useState(titles[0]);

	function handleOpenCloseToggleClick() {  
		setIsExpanded(oldVal => !oldVal);
	}

	return ( 
	 	<div className={isExpanded ? "box expanded-box" : "box closed-box"}
	 			onClick={handleOpenCloseToggleClick}>
	 		<div className="box-header"> 
	 			<div className="burger-container">
	 				<Burger/>
	 			</div>

	 			<h2 className="title">Level 1: display: flex;</h2>
	 				
	 			<div className="toggle-container">
	 				<OpenCloseToggle isOpen={isExpanded}/>
	 			</div>
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