import React, {useState, useEffect} from 'react';
import Burger from './Burger/Burger.jsx';
import BurgerMenu from './Burger/BurgerMenu.jsx';
import Text from './Text.jsx';
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx'; 
import {
	setSizeInPx,
	removeInlineSize
} from './../utils.js';
import './LevelText.css';

export default function LevelText({
	i, 
	titles, 
	levelNum, 
	setLevelNum, 
	setStyle, 
	defaultStyle
}) {
	/*
		* show title
		* show text
		* show burger

		- on close box - keep text width
		- on open box - text adjusts to fit new width



		* when new style selected change css string
		* when new style unselected change back css string

		* burger
			* show all titles when clicked

			* change level and close when click title

		animate on open / close box
			* full
			* when press before closed
			* make so no bottom scroll
			make so has vert scroll - make content box expand 

		fix - adjust width when box size changes
			this
			other boxes
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

	// ======================================= Event Handlers ================================== //
	function onClickOption(option) { 
		const newLevelNum = titles.indexOf(option);
		setLevelNum(newLevelNum)
	}

	function onChangeOption() {

	}

	function handleToggleClick(boxIsOpen) {
		if(boxIsOpen) onBoxClosing()
		if(!boxIsOpen) onBoxOpening() 
	}

	function onBoxClosing() {
		console.log('on closing')
		keepTextWidth()
	}

	function onBoxOpening() {
		adjustTextWidthToBoxSize()
		// removeInlineWidth(textBodyId)
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
 

	// ======================================= Trigger Events =============================== //
	/*useEffect(() => { 
		if(boxStatus === 'box-closing') onBoxClosing()
		if(boxStatus === 'box-opening') onBoxOpening()
		if(boxStatus === 'box-closed') onBoxClosed()
		if(boxStatus === 'box-open') onBoxOpen()
	}, [boxStatus])*/

	// ======================================= Output ======================================= //
	return ( 
		<OpenCloseBox title={title} i={i} buttons={buttons} handleToggleClick={handleToggleClick}>
			<BurgerMenu isOpen={burgerIsOpen} setIsOpen={setBurgerIsOpen} options={titles} handleClick={onClickOption}/>
			
			<div className={`text-body ${textBodyOpenClass}`} id={textBodyId}>
			 	<Text levelNum={levelNum} setSelectedStyle={setSelectedStyle}/> 
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