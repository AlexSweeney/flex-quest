import React, {useState, useEffect} from 'react';
import Burger from './Burger/Burger.jsx';
import BurgerMenu from './Burger/BurgerMenu.jsx';
import Text from './Text.jsx';
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx'; 
import {
	setSizeInPx,
	removeInlineSize,
	triggerOnTransitionEnd,
} from './../utils.js';
import './LevelText.css';

export default function LevelText({
	i, 
	titles, 
	levelNum, 
	setLevelNum, 
	setStyle, 
	fade,
	setFade,
	defaultStyle,
}) {
	/*
		* show title
		* show text
		* show burger

		* on close box 	
			* keep text width
			* close burger if open
		* on open box 
			* text adjusts to fit new width
			* open burger if was open
	
		* on click burger 
			* burger animate
			* option menu show / hide
  	
  	* on click level option 
 			* change text and code
 			* animate change
  	
  	* on click style option = add / remove styl 
  		* inline clicker 
  		* click header
		

		- don't fade text - trigger end with something else
		- fix option click = going to wrong option

  	tidy
  	move to utils
  	update

  	refactor parts
  		- burger 
  			- link burger color with option colors on click
  		- burger display 
  				- open with burger on click open => open seperately from content container -> overlay?
  				- don't show vert scroll when burger open
  		- click header
  			- add box around options & option text
  		- inline click header

  		- fade codeInput in out on level change
	*/
	// ======================================= Ids ========================================= //
	const titleId = `title-${i}`;
	const textContainerId = `text-container-${i}`;
	const textBodyId = `text-body-${i}`;

	// ======================================= State ======================================= //
	const [burgerWasOpen, setBurgerWasOpen] = useState(false);
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);

	const [title, setTitle] = useState(titles[levelNum]);

	const [selectedStyle, setSelectedStyle] = useState(''); 

	// ======================================= Buttons ===================================== //
	const buttons = [<Burger burgerIsOpen={burgerIsOpen} setBurgerIsOpen={setBurgerIsOpen}/>]; 

	// ======================================= Class ======================================= //
	const [textBodyOpenClass, setTextBodyOpenClass] = useState(''); 

	// ======================================= Event Handlers ============================== //
	function onClickLevelOption(option) {
		if(isDifferentLevel(option)) {
			updateLevel(option)
			fadeOut().then(() => {
				changeTitle()
				fadeIn()
			})
		} 
	}   
 
	function handleToggleClick(boxIsOpen) {
		if(boxIsOpen) onBoxClosing()
		if(!boxIsOpen) onBoxOpening() 
	}

	function onBoxClosing() { 
		keepTextWidth()
		closeBurgerIfOpen()
	}

	function onBoxOpening() {
		adjustTextWidthToBoxSize()
		openBurgerIfWasOpen()  
	} 

	function handleStyleOptionClick(thisStyle, setIsSelected) {
		const isSelected = (thisStyle !== selectedStyle);
		const newStyle = isSelected ? thisStyle : defaultStyle;

		setSelectedStyle(newStyle)
		setIsSelected(isSelected)  
	}

	// function handleToggleClick(boxIsOpen, widthIsOverflowing, heightIsOverflowing) { 
	// 	if(boxIsOpen) onBoxOpening()
	// 	if(!boxIsOpen) onBoxClosing(heightIsOverflowing) 
	// }

	// function onOverflowHidden() {
	// 	setTextBodyOpenClass('text-body-closing-overflow-hidden')
	// }

	// function onBoxClosing(heightIsOverflowing) { 
	// 	fixContainerWidth(textBodyId)
	// 	if(!heightIsOverflowing) setTextBodyOpenClass('text-body-closing-no-overflow')
	// }

	// function onBoxOpening() {
	// 	removeInlineWidth(textBodyId)
	// 	setTextBodyOpenClass('text-body-opening')
	// }

	/*function onBoxOpening() { 
		if(boxHasClosed) resetContainerWidth()
	} 

	function onBoxOpen() {
		setBoxHasClosed(false)
		setOverflowOpenClass('overflow-barrier-opening')
	}

	function onBoxClosed() {
		setBoxHasClosed(true)
	}*/

	// ======================================= Helper Fns ================================== //
	function keepTextWidth() {
		setSizeInPx(textBodyId, 'width')
		setTextBodyOpenClass('text-body-closing')
	}

	function adjustTextWidthToBoxSize() {
		removeInlineSize(textBodyId)
		setTextBodyOpenClass('text-body-opening')
	}

	function getLevelNum(option) {
		return titles.indexOf(option);
	}

	function isDifferentLevel(option) {
		const newLevelNum = getLevelNum(option);
		return newLevelNum !== levelNum;
	}

	function updateLevel(option) {
		const newLevelNum = getLevelNum(option);
		setLevelNum(newLevelNum)
	}

	function changeTitle(option) { 
		const newLevelNum = getLevelNum(option);
	  setTitle(titles[levelNum]) 
	}

	/*function changeLevelText(option) {
		return new Promise(resolve => {
			const newLevelNum = getLevelNum(option);

		})
	}*/

	function fadeOut() {
		return new Promise(resolve => {
			triggerOnTransitionEnd(titleId, 'opacity', resolve)

			setFade(true) 
		}) 
	}

	function fadeIn() {
		setFade(false) 
	}

	function closeBurgerIfOpen() {
		setBurgerWasOpen(burgerIsOpen)
		if(burgerIsOpen) setBurgerIsOpen(false)
	}

	function openBurgerIfWasOpen() {
		if(burgerWasOpen) setBurgerIsOpen(true)
	}

	/*function fixContainerWidth(id) { 
		const element = document.getElementById(id);
		const elementWidth = getComputedWidth(element); 

		element.style.width = elementWidth; 
		element.style['max-width'] = elementWidth;
	}

	function removeInlineWidth(id) {
		const element = document.getElementById(id);
		element.style.width = '';
		element.style['max-width'] = '';
	}

	function getComputedWidth(element) {
		const style = window.getComputedStyle(element);
		return style.width;
	} */

	// ======================================= Update ======================================= //
	// useEffect(() => {
	// 	console.log(selectedStyle)
	// 	if(selectedStyle) setStyle(selectedStyle)
	// 	if(!selectedStyle) setStyle(defaultStyle)
	// }, [selectedStyle])

	/*useEffect(() => { 
		setTitle(titles[levelNum]) 
	}, [levelNum])*/
 
	// ======================================= Output ======================================= //
	return ( 
		<OpenCloseBox 
			title={title} 
			titleId={titleId}
			i={i} 
			buttons={buttons} 
			handleToggleClick={handleToggleClick}  
			fade={fade}>
			<BurgerMenu 
				isOpen={burgerIsOpen} 
				setIsOpen={setBurgerIsOpen} 
				options={titles} 
				handleClick={onClickLevelOption}/>
			
			<div className={`text-body ${textBodyOpenClass}`} id={textBodyId}>
			 	<Text levelNum={levelNum} handleStyleOptionClick={handleStyleOptionClick}/> 
			</div> 
		</OpenCloseBox> 
	)
}

{/* 
<OpenCloseBox title={title} i={i} buttons={buttons}>
<div className={`overflow-barrier ${overflowOpenClass}`}> 	</div> 
		<div className="text-container" id={textContainerId}>
			<BurgerMenu isOpen={burgerIsOpen} setIsOpen={setBurgerIsOpen} options={titles} handleClick={handleBurgerClick}/>
			<div className={"text-body"} id={textBodyId}>
				<Text setSelectedStyle={setSelectedStyle}/>
			</div>
		</div> 
</OpenCloseBox>

*/}