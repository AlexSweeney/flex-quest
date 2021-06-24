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
	 	<div className={isExpanded ? "box expanded-box" : "box closed-box"} > 
			<div className="box-header">
				{showBurger && <Burger open={isExpanded} handleClick={handleOpenCloseToggleClick}/>}
				{/*{isExpanded ? 
					<h2 className="title">Level 1: display: flex;</h2> 
				: <h2 className="title"></h2>}*/}
				
				<OpenCloseToggle isOpen={isExpanded} handleClick={handleOpenCloseToggleClick}/>
			</div>
		</div>
	)
}

{/*<h2 className={isExpanded ? "title" : "title opaque"}>Level 1: display: flex;</h2> */}