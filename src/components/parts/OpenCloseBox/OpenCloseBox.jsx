import React, {useState, useEffect} from 'react';
import OpenCloseToggle from '../OpenCloseToggle/OpenCloseToggle.jsx'; 
import Burger from '../Burger/Burger.jsx';
import BurgerDropDown from '../Burger/BurgerDropDown.jsx';
import './OpenCloseBox.css';
import './scrollbar.css';

export default function OpenminimizeBox({
	title = null,  
	menuOptions = null, 
	handleMenuOptionClick, 
	handleRefresh = () => {},
	children = null,
	bodyClass = '', 
	button_1 = null,
	button_2 = null,
}) { 
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const [burgerWasOpen, setBurgerWasOpen] = useState(false); 

	const [showBodyScroll, setShowBodyScroll] = useState(true);

	const [isExpanded, setIsExpanded] = useState(true);  

	const [rotateNum, setRotateNum] = useState(0);

	// Burger Click
	function handleBurgerClick() {
		setBurgerIsOpen(oldVal => !oldVal);
	}

	// Open Close Toggle
	function handleOpenCloseToggleClick() {  
		if(isExpanded) minimizeBox();
		else if(!isExpanded) expandBox();
	}

	function minimizeBox() {
		setBurgerWasOpen(burgerIsOpen);
		setBurgerIsOpen(false);
		setIsExpanded(false); 
	}
 
	function expandBox() {
		if(burgerWasOpen) setBurgerIsOpen(true);
		setIsExpanded(true);  
	} 

	// burger titles
	function handleClickMenu(option) {
		handleMenuOptionClick(option);
		setBurgerIsOpen(false);
	}

	// refresh button
	function refreshDown() {
		setRotateNum(oldVal => oldVal + 360);
		handleRefresh();
	} 

	return ( 
		<div className={isExpanded ? "box box-expanded" : "box box-minimized"}> 
			<div className="box-header">
				{/* Menu Button */}
				{menuOptions && 
					<div className="burger-container">
						<Burger menuOptions={menuOptions} burgerIsOpen={burgerIsOpen} onClick={handleBurgerClick}/> 
					</div>}

			  <div className="button-container">
					{/* Button 1 */}
					{button_1 && 
						<div className="button button-1">
							{button_1}
						</div>
					}

				 	{/* Button 2 */}
				 	{button_2 && 
						<div className="button button-2">
							{button_2}
						</div>
					}
				</div>
				
				{/* Title */}
		 		<div className="title">{title}</div>

				<div className={"open-close-toggle-container"}>
					<OpenCloseToggle isOpen={!isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
			</div>

			<div className={"box-body " + bodyClass}>  
				{menuOptions && <BurgerDropDown isOpen={burgerIsOpen} 
																				options={menuOptions} 
																				handleOptionClick={handleClickMenu}/>}
				
				<div className={"box-body-children-container open-close-box-scroll " + (isExpanded ? "box-body-children-container-open" : "box-body-children-container-closed")}>
					{children && children}
				</div> 
			</div>
	 	</div> 
	);
} 