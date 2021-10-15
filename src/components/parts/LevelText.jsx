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
		   
  	refactor parts 
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
	const bodyOverlay = [<BurgerMenu isOpen={burgerIsOpen} setIsOpen={setBurgerIsOpen} options={titles} handleClick={onClickLevelOption}/>];

	// ======================================= Class ======================================= //
	const [textBodyOpenClass, setTextBodyOpenClass] = useState(''); 

	// ======================================= Event Handlers ============================== //
	function onClickLevelOption(option) {
		if(isDifferentLevel(option)) {
			updateLevel(option)
			fadeOut().then(() => {
				changeTitle(option)
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
	  setTitle(titles[newLevelNum]) 
	}

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

	// ======================================= Output ======================================= //
	return ( 
		<OpenCloseBox  title={title} titleId={titleId} i={i} buttons={buttons} handleToggleClick={handleToggleClick} fade={fade} bodyOverlay={bodyOverlay}>
			<div className={`text-body ${textBodyOpenClass}`} id={textBodyId}> 
			 	<Text levelNum={levelNum} handleStyleOptionClick={handleStyleOptionClick}/> 
			</div> 
		</OpenCloseBox> 
	)
}