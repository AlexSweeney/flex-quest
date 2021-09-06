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
	button_1 = null,
	button_2 = null,
}) { 
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const [burgerWasOpen, setBurgerWasOpen] = useState(false); 

	const [boxState, setBoxState] = useState('open'); 
	const [boxClass, setBoxClass] = useState('box-expanded');
	const [bodyClass, setBodyClass] = useState('body-open');

	/*const [containerClass, setContainerClass] = useState('');

	const [childrenContainerClass, setChildrenContainerClass] = useState('box-expanded');*/

	const [rotateNum, setRotateNum] = useState(0);

	// Burger Click
	function handleBurgerClick() {
		setBurgerIsOpen(oldVal => !oldVal);
	}

	// Open Close Toggle
	function handleOpenCloseToggleClick() {  
		if(boxState === 'open') { closeBurger(); closeBox();}
		else if(boxState === 'closed') { openBurger(); openBox(); }
	}

	function openBurger() {
		if(burgerWasOpen) setBurgerIsOpen(true);
	}

	function closeBurger() {
		setBurgerWasOpen(burgerIsOpen);
		setBurgerIsOpen(false);	
	}

	function openBox() {
		setBoxState('opening');

		setTimeout(() => {
			setBoxState('open');
		}, 1000);
	}

	function closeBox() { 
		setBoxState('closing');

		setTimeout(() => {
			setBoxState('closed');
		}, 1000);
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

	useEffect(() => {
		let newClass;

		if(boxState === 'opening') {
			newClass = 'body-opening';
			setBoxClass('box-expanded');
		} else if(boxState === 'open') {
			newClass = 'body-open';
		} else if(boxState === 'closing') {
			newClass = 'body-closing';
			setBoxClass('box-minimized');
		} else if(boxState === 'closed') {
			newClass = 'body-closed';
		}	

		setBodyClass(newClass);
	}, [boxState])

	return ( 
		<div className={`box ${boxClass}`}> 
		{/*<div className={isExpanded ? "box box-expanded" : "box box-minimized"}> */}
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
{/* Fix */}
					<OpenCloseToggle isOpen={boxState === "closed"} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
			</div>

			<div className="body-background custom-scroll">  
				{menuOptions && <BurgerDropDown isOpen={burgerIsOpen} 
																				options={menuOptions} 
																				handleOptionClick={handleClickMenu}/>}
				
				<div className={`body custom-scroll ${bodyClass}`}>
					{children && children}
				</div> 
			</div>
	 	</div> 
	);
} 