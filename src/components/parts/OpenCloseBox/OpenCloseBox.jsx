import React, {useState} from 'react';
import OpenCloseToggle from '../OpenCloseToggle/OpenCloseToggle.jsx'; 
import Burger from '../Burger/Burger.jsx';
import BurgerDropDown from '../Burger/BurgerDropDown.jsx';
import './OpenCloseBox.css';

export default function /*OpenCloseBox({title = null, text = null, menuOptions = null, menuText = null, children = null, levelNum, setLevelNum}) {*/
	OpenCloseBox({title = null, text = null, menuOptions = null, handleMenuOptionClick, children = null}) {
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const [burgerWasOpen, setBurgerWasOpen] = useState(false);

	const [isExpanded, setIsExpanded] = useState(true); 

	// const [selectedTitle, setSelectedTitle] = useState(title || menuOptions && menuOptions[levelNum] || '');  
	// const [selectedText, setSelectedText] = useState(text || menuText && menuText[levelNum]);

	function handleOpenCloseToggleClick() {  
		if(isExpanded) closeBox();
		else if(!isExpanded) openBox();
	}

	function closeBox() {
		setBurgerWasOpen(burgerIsOpen);
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

	function handleClickMenu(option) {
		handleMenuOptionClick(option);
		setBurgerIsOpen(false);
	}

	return ( 
		<div className={isExpanded ? "box box-expanded" : "box box-minimized"}> 
			<div className="box-header">
				{menuOptions && 
					<div className={ isExpanded ? "burger-container burger-container-opening" : "burger-container"}>
						<Burger isOpen={burgerIsOpen} setIsOpen={setBurgerIsOpen} menuOptions={menuOptions}/>
					</div> 
				}
				
		 		<div className="title">{title}</div>

				<div className={ menuOptions ? "open-close-toggle-container" : "open-close-toggle-container open-close-toggle-container-big" }>
					<OpenCloseToggle isOpen={!isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
			</div>
			<div className="box-body"> 
				{menuOptions && <BurgerDropDown isOpen={burgerIsOpen} options={menuOptions} handleOptionClick={handleClickMenu}/>}
				{children && children}
				{text && <p className={ isExpanded ? "text-body" : "text-body no-show"}>{text}</p>}
			</div>
	 	</div> 
	);
} 

