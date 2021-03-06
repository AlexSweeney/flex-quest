import React, {useState, useEffect} from 'react';
// import Burger from './Burger/Burger.jsx';
// import BurgerMenu from './Burger/BurgerMenu.jsx';
// import Text from './Text.jsx';
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx'; 
// import {
// 	setSizeInPx,
// 	removeInlineSize,
// 	triggerOnTransitionEnd,
// } from './../utils.js';
// import './LevelText.css';

export default function LevelText({
	i, 
	titles, 
	levelNum, 
	setLevelNum, 
	style,
	setStyle, 
	fade,
	setFade,
	defaultStyle,
}) {
	/*
		* ======== On Render
		* show title
		* show text
		* show burger

		* ===== on close box 	
			* keep text width
			* close burger if open
		* ===== on open box 
			* text adjusts to fit new width
			* open burger if was open
	
		* ===== on click burger 
			* burger animate
			* option menu show / hide
  	
  	* ===== on click level option 
 			* change text and code
 			* animate change
  	
  	* ===== on click inline clicker
  		* add / remove style 
  		* add / remove highlight 
  	
  	* on click click header
  		* add / remove style 
		  * add / remove highlight 
	*/
	// ======================================= Ids ========================================= //
	// const titleId = `title-${i}`;
	// const textContainerId = `text-container-${i}`;
	// const textBodyId = `text-body-${i}`;

	// ======================================= State ======================================= //
	// const [burgerWasOpen, setBurgerWasOpen] = useState(false);
	// const [burgerIsOpen, setBurgerIsOpen] = useState(false);

	// const [title, setTitle] = useState(titles[levelNum]); 

	// ======================================= Buttons ===================================== //
	// const buttons = [<Burger burgerIsOpen={burgerIsOpen} setBurgerIsOpen={setBurgerIsOpen} key={`level-text-${i}-button-0`}/>]; 
	// const bodyOverlay = [<BurgerMenu isOpen={burgerIsOpen} setIsOpen={setBurgerIsOpen} options={titles} handleClick={onClickLevelOption} key={`level-text-${i}-overlay-0`}/>];

	// ======================================= Class ======================================= //
	// const [textBodyOpenClass, setTextBodyOpenClass] = useState(''); 

	// ======================================= Event Handlers ============================== //
	// function onClickLevelOption(option) {
	// 	if(isDifferentLevel(option)) {
	// 		updateLevel(option)
	// 		fadeOut().then(() => {
	// 			changeTitle(option)
	// 			fadeIn()
	// 		})
	// 	}
	// }   
 
	// function handleToggleClick(boxIsOpen) {
	// 	if(boxIsOpen) onBoxClosing()
	// 	if(!boxIsOpen) onBoxOpening() 
	// }

	// function onBoxClosing() { 
	// 	keepTextWidth()
	// 	closeBurgerIfOpen()
	// }

	// function onBoxOpening() {
	// 	adjustTextWidthToBoxSize()
	// 	openBurgerIfWasOpen()  
	// } 

	// function onStyleOptionClick(thisStyle) { 
	// 	const isSelected = (thisStyle !== style);
	// 	const newStyle = isSelected ? thisStyle : defaultStyle; 
		
	// 	setStyle(newStyle) 
	// }

	// // ======================================= Helper Fns ================================== //
	// function keepTextWidth() {
	// 	setSizeInPx(textBodyId, 'width')
	// 	setTextBodyOpenClass('text-body-closing')
	// }

	// function adjustTextWidthToBoxSize() {
	// 	removeInlineSize(textBodyId)
	// 	setTextBodyOpenClass('text-body-opening')
	// }

	// function getLevelNum(option) {
	// 	return titles.indexOf(option);
	// }

	// function isDifferentLevel(option) {
	// 	const newLevelNum = getLevelNum(option);
	// 	return newLevelNum !== levelNum;
	// }

	// function updateLevel(option) {
	// 	const newLevelNum = getLevelNum(option);
	// 	setLevelNum(newLevelNum)
	// }

	// function changeTitle(option) { 
	// 	const newLevelNum = getLevelNum(option);
	//   setTitle(titles[newLevelNum]) 
	// }

	// function fadeOut() {
	// 	return new Promise(resolve => {
	// 		triggerOnTransitionEnd(titleId, 'opacity', resolve)

	// 		setFade(true) 
	// 	}) 
	// }

	// function fadeIn() {
	// 	setFade(false) 
	// }

	// function closeBurgerIfOpen() {
	// 	setBurgerWasOpen(burgerIsOpen)
	// 	if(burgerIsOpen) setBurgerIsOpen(false)
	// }

	// function openBurgerIfWasOpen() {
	// 	if(burgerWasOpen) setBurgerIsOpen(true)
	// }

	// ======================================= Output ======================================= //
	return ( 
		<OpenCloseBox  
			title={title} 
			titleId={titleId} 
			i={i} 
			buttons={buttons} 
			handleToggleClick={handleToggleClick} 
			fade={fade} 
			bodyOverlay={bodyOverlay} 
			showOverlay={burgerIsOpen}>
			{/* <div className={`text-body ${textBodyOpenClass}`} id={textBodyId}> 
			 	<Text levelNum={levelNum} handleClick={onStyleOptionClick} selectedStyle={style}/> 
			</div>  */}
		</OpenCloseBox> 
	)
}