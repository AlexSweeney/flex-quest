import React, {useState, useEffect} from 'react';
import OpenCloseToggle from '../OpenCloseToggle/OpenCloseToggle.jsx'; 
import Burger from '../Burger/Burger.jsx';
import BurgerDropDown from '../Burger/BurgerDropDown.jsx';
import './OpenCloseBox.css';
import './scrollbar.css';

export default function OpenCloseBox({
	title = null,  
	id = `open-close-box-${Math.random()}`, 
	boxIsOpen = true, 
	handleToggleClick = null,
	toggleIsOpen = false,
	isAnimating = false,
	children = null,
	
}) { 

	/*menuOptions = null, 
	handleMenuOptionClick, 
	handleRefresh = () => {},
	children = null,
	button_1 = null,
	button_2 = null,
	i = Math.random(),*/

	// const [boxIsOpen, setBoxIsOpen] = useState(true);
	
	const [boxOpenClass, setBoxOpenClass] = useState('');

	// const [animateOpenCloseToggle, setAnimateOpenCloseToggle] = useState(false);
	// const [isChangingWidth, setIsChangingWidth] = useState(false);

	// const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	// const [burgerWasOpen, setBurgerWasOpen] = useState(false); 
	
	// const [rotateNum, setRotateNum] = useState(0);
	// const [bodyClass, setBodyClass] = useState('body-open');
  
	// Burger Click
	/*function handleBurgerClick() {
		setBurgerIsOpen(oldVal => !oldVal);
	}

	function showBurger() {
		if(burgerWasOpen) setBurgerIsOpen(true);
	}

	function hideBurger() {
		setBurgerWasOpen(burgerIsOpen);
		setBurgerIsOpen(false);	
	}*/

	// Open Close Toggle
	/*function handleOpenCloseToggleClick() {  
		if(boxIsOpen) hideBurger();
		else if(!boxIsOpen) showBurger();

		setBoxIsOpen(oldVal => !oldVal);
		setIsChangingWidth(true);
	}*/

	// burger titles
	/*function handleClickMenu(option) {
		handleMenuOptionClick(option);
		setBurgerIsOpen(false);
	}*/

	// refresh button
	/*function refreshDown() {
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
	}, [boxState])*/

	useEffect(() => {
		if(boxIsOpen) {
			setBoxOpenClass('box-open');
		} else {	
			setBoxOpenClass('box-closed');
		}
	}, [boxIsOpen])

	/*useEffect(() => {
		const boxElement = document.getElementById(thisId);
		boxElement.addEventListener('transitionend', (e) => {
      if(e.propertyName === 'width') {
      	// setAnimateOpenCloseToggle(oldVal => !oldVal);
      	setIsChangingWidth(false);
      }
    });
	}, [])
*/
	return ( 
		<div className={`box ${boxOpenClass}`} id={id}>  
			<div className="box-header">
				{/*{menuOptions && 
					<div className="burger-container">
						<Burger menuOptions={menuOptions} burgerIsOpen={burgerIsOpen} onClick={handleBurgerClick}/> 
					</div>}

			  <div className="button-container">
					{/*{button_1 && 
						<div className="button button-1">
							{button_1}
						</div>
					}

					{/*{button_2 && 
						<div className="button button-2">
							{button_2}
						</div>
					}
				</div>*/}
				
		 		<div className="title">{title}</div>

				{ 
					handleToggleClick && 
					<div className={"open-close-toggle-container"}>
						<OpenCloseToggle 
							toggleIsOpen={toggleIsOpen} 
							parentIsAnimating={isAnimating}
							handleClick={handleToggleClick}/>
	 				</div>
	 			}
			</div>

			<div className="box-body">  
				{/*{menuOptions && <BurgerDropDown isOpen={burgerIsOpen} 
																				options={menuOptions} 
																				handleOptionClick={handleClickMenu}/>}*/}
				
				{/*<div className={`body ${bodyClass}`}>*/}
					{children && children}
				{/*</div> */}
			</div>
	 	</div> 
	);
} 