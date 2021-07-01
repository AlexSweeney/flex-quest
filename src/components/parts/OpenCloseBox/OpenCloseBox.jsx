// auto find width for title when close
// when open show burger first

import React, {useState} from 'react';
import OpenCloseToggle from '../OpenCloseToggle/OpenCloseToggle.jsx'; 
import Burger from '../Burger/Burger.jsx';
import BurgerDropDown from '../Burger/BurgerDropDown.jsx';
import './OpenCloseBox.css';

export default function OpenCloseBox({menuOptions = null}) {   
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const [burgerWasOpen, setBurgerWasOpen] = useState(false);

	const [isExpanded, setIsExpanded] = useState(true); 

	const [selectedTitle, setSelectedTitle] = useState('example title');  

	function handleOpenCloseToggleClick() {  
		if(isExpanded) closeBox();
		else if(!isExpanded) openBox();
	}

	function closeBox() {
		if(burgerIsOpen) setBurgerWasOpen(true);
		setBurgerIsOpen(false);
		setIsExpanded(false); 
	}

	function openBox() {
		if(burgerWasOpen) {
			setBurgerIsOpen(true);
			setBurgerWasOpen(false);
		}
		setIsExpanded(true); 
	} 

	return ( 
		<div className={isExpanded ? "box box-expanded" : "box box-minimized"}> 
			<div className="box-header">
				{menuOptions && 
					<div className={ isExpanded ? "burger-container burger-container-opening" : "burger-container"}>
						<Burger isOpen={burgerIsOpen} setIsOpen={setBurgerIsOpen} menuOptions={menuOptions}/>
					</div> 
				}
				
		 		<div className="title">{selectedTitle}</div>

				<div className={ menuOptions ? "open-close-toggle-container" : "open-close-toggle-container open-close-toggle-container-big" }>
					<OpenCloseToggle isOpen={!isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
			</div>
			<div className="box-body"> 
				{menuOptions && <BurgerDropDown isOpen={burgerIsOpen} options={menuOptions} handleOptionClick={() => {console.log('hello')}}/>}
			</div>
	 	</div> 
	);
} 

