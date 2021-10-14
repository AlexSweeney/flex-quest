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
			- close burger if open
		* on open box 
			* text adjusts to fit new width
			- open burger if was open
	
		* on click burger 
			* burger animate
			* option menu show / hide
  	
  	* on click level option 
 			* change text and code
 			* animate change
  	
  	* on click style option inside text 
  		* inline clicker
  		* add style
  		* remove style

  		- click header
		
		- don't show vert scroll when burger open
  	- fade codeInput in out on level change
  	- add box around options & option text

  	tidy
  	move to utils
  	update

  	refactor parts
  		- burger
  		- burger display
  		- click header
  		- inline click header
	*/
	// ======================================= Ids ======================================= //
	const textContainerId = `text-container-${i}`;
	const textBodyId = `text-body-${i}`;

	// ======================================= State ======================================= //
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const buttons = [<Burger burgerIsOpen={burgerIsOpen} setBurgerIsOpen={setBurgerIsOpen}/>]; 
 
	const [title, setTitle] = useState(titles[levelNum]);
	const [selectedStyle, setSelectedStyle] = useState(''); 

	// ======================================= Class ======================================= //
	const [textBodyOpenClass, setTextBodyOpenClass] = useState(''); 
	const [textBodyFadeClass, setTextBodyFadeClass] = useState('text-body-no-fade');

	// ======================================= Event Handlers ================================== //
	function onClickLevelOption(option) {
		if(isDifferentLevel(option))
		fadeTextOut() 
			.then(() => updateLevel(option))
			.then(fadeTextIn)
	}   
 
	function handleToggleClick(boxIsOpen) {
		if(boxIsOpen) onBoxClosing()
		if(!boxIsOpen) onBoxOpening() 
	}

	function onBoxClosing() { 
		keepTextWidth()
	}

	function onBoxOpening() {
		adjustTextWidthToBoxSize() 
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

	function fadeTextOut() {
		return new Promise(resolve => {
			triggerOnTransitionEnd(textBodyId, 'opacity', resolve)

			setFade(true)
			setTextBodyFadeClass('text-body-fade') 
		}) 
	}

	function fadeTextIn() {
		setFade(false)
		setTextBodyFadeClass('text-body-no-fade')
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
	useEffect(() => {
		console.log(selectedStyle)
		if(selectedStyle) setStyle(selectedStyle)
		if(!selectedStyle) setStyle(defaultStyle)
	}, [selectedStyle])

	useEffect(() => { 
		setTitle(titles[levelNum]) 
	}, [levelNum])
 
	// ======================================= Output ======================================= //
	return ( 
		<OpenCloseBox 
			title={title} 
			i={i} 
			buttons={buttons} 
			handleToggleClick={handleToggleClick} 
			fade={fade}>
			<BurgerMenu 
				isOpen={burgerIsOpen} 
				setIsOpen={setBurgerIsOpen} 
				options={titles} 
				handleClick={onClickLevelOption}/>
			
			<div className={`text-body ${textBodyOpenClass} ${textBodyFadeClass}`} id={textBodyId}>
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