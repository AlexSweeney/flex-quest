import React, {useState} from 'react';
import Burger from './Burger.jsx';
import OpenCloseToggle from './OpenCloseToggle.jsx';
import './BoxStyle.css';

export default function Box({showBurger, title}) {
	const [isExpanded, setIsExpanded] = useState(true); 

	function handleOpenCloseToggleClick() {  
		setIsExpanded(oldVal => !oldVal);
	}

	return (
		<div className={isExpanded ? "box expanded-box" : "box closed-box"}>
			<div className="box-header">
				{isExpanded && showBurger && <Burger/>}
				<div className="title">{isExpanded && title}</div>
				<OpenCloseToggle isOpen={isExpanded} handleClick={handleOpenCloseToggleClick}/>
			</div>
		</div>
	)
}