import React, {useState} from 'react';
import OpenCloseToggle from '../OpenCloseToggle/OpenCloseToggle.jsx'; 
import Burger from '../Burger/Burger.jsx';
import BurgerDropDown from '../Burger/BurgerDropDown.jsx';
import RefreshIcon from '@material-ui/icons/Refresh';
import './OpenCloseBox.css';

export default function OpenCloseBox({
	title = null, 
	text = null, 
	menuOptions = null, 
	handleMenuOptionClick, 
	handleRefresh = null, 
	children = null,
	bodyClass = '',
	handleTextOptionClick = null,
	button_2 = null,
}) { 
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const [burgerWasOpen, setBurgerWasOpen] = useState(false);

	const [isExpanded, setIsExpanded] = useState(true); 

	const [rotateNum, setRotateNum] = useState(0);

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

	function refreshDown() {
		setRotateNum(oldVal => oldVal + 360);
		handleRefresh();
	}
  
	return ( 
		<div className={isExpanded ? "box box-expanded" : "box box-minimized"}> 
			<div className="box-header">
				{/* Menu Button */}
				{menuOptions &&
					<div className={ isExpanded ? "burger-container burger-container-opening" : "burger-container"}>
						<Burger isOpen={burgerIsOpen} setIsOpen={setBurgerIsOpen} menuOptions={menuOptions}/>
					</div>}

			  {/* Refresh Button */}
			  {handleRefresh && 
		  		<div className="button refresh-button" onMouseDown={refreshDown}>
						<RefreshIcon id="refresh-icon" style={{'transform': `rotate(${rotateNum}deg)`}} fontSize="small"/>
					</div>
			  }

			 	{/* Button 2 */}
			 	{button_2 && 
					<div className="button button-2">
						{button_2}
					</div>
				}
				{/*{handleRefresh && 
					<div className={ isExpanded ? "burger-container burger-container-opening " : "burger-container " }>
						<div className="refresh-button" onMouseDown={refreshDown}>
							<RefreshIcon id="refresh-icon" style={{'transform': `rotate(${rotateNum}deg)`}}fontSize="small"/>
						</div>

						{button_2 && 
							<div className="refresh-button">

							</div>
						}
					</div>} */}
				
				{/* Title */}
		 		<div className="title">{title}</div>

				<div className={ menuOptions ? "open-close-toggle-container" : "open-close-toggle-container open-close-toggle-container-big" }>
					<OpenCloseToggle isOpen={!isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
			</div>
			<div className={"box-body " + bodyClass}> 
				{menuOptions && <BurgerDropDown isOpen={burgerIsOpen} options={menuOptions} handleOptionClick={handleClickMenu}/>}
				{children && children}
				{/*{children && <div className={ isExpanded ? "text-body" : "text-body no-show"}>{children}</div>}*/}
				{/*{text && <div className={ isExpanded ? "text-body padding" : "text-body padding no-show"}><p>{text}</p></div>}*/}
			</div>
	 	</div> 
	);
} 

