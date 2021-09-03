import React, {useState} from 'react';
import OpenCloseToggle from '../OpenCloseToggle/OpenCloseToggle.jsx'; 
import Burger from '../Burger/Burger.jsx';
import BurgerDropDown from '../Burger/BurgerDropDown.jsx';
// import RefreshIcon from '@material-ui/icons/Refresh';
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
	button_1 = null,
	button_2 = null,
}) { 
	const animationTime = 1000;

	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const [burgerWasOpen, setBurgerWasOpen] = useState(false); 

	const [isExpanded, setIsExpanded] = useState(true); 
	const [showBody, setShowBody] = useState(true);

	const [rotateNum, setRotateNum] = useState(0);

	function handleOpenCloseToggleClick() {  
		if(isExpanded) closeBox();
		else if(!isExpanded) openBox();
	}

	function closeBox() {
		setBurgerWasOpen(burgerIsOpen);
		setBurgerIsOpen(false);
		setIsExpanded(false); 
		setShowBody(false);
	}
 
	function openBox() {
		if(burgerWasOpen) {
			setBurgerIsOpen(true);
			setBurgerWasOpen(false);
		}
		setIsExpanded(true); 

		setTimeout(() => {
			setShowBody(true);
		}, animationTime)
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
						<Burger isOpen={burgerIsOpen} 
										setIsOpen={setBurgerIsOpen} 
										menuOptions={menuOptions}/>
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

				<div className={ menuOptions ? "open-close-toggle-container" : "open-close-toggle-container open-close-toggle-container-big" }>
					<OpenCloseToggle isOpen={!isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
			</div>
			<div className={"box-body " + bodyClass}> 
				<div className={"box-body-content-container" + (showBody ? " show" : " no-show") + (burgerIsOpen ? " no-scroll" : "")}>
					{menuOptions && <BurgerDropDown isOpen={burgerIsOpen} options={menuOptions} handleOptionClick={handleClickMenu}/>}
						{children && children}
				</div>
			</div>
	 	</div> 
	);
} 