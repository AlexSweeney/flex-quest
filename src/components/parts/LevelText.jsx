import React, {useState, useEffect} from 'react';
import Burger from './Burger/Burger.jsx';
import BurgerMenu from './Burger/BurgerMenu.jsx';
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import './LevelText.css';

export default function LevelText({i, titles, allText, levelNum, setLevelNum, setStyle, defaultStyle}) {
	/*
		* show title
		
		* show text

		* when new style selected change css string
		* when new style unselected change back css string

		* burger
			* show all titles when clicked

			* change level and close when click title

		animate on open / close box
			* full
			* when press before closed
			* make so no bottom scroll
			make so has vert scroll

		fix - adjust width when box size changes
			this
			other boxes
	*/
	// ======================================= Ids ======================================= //
	const textContainerId = `text-container-${i}`;

	// ======================================= State ======================================= //
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const buttons = [<Burger burgerIsOpen={burgerIsOpen} setBurgerIsOpen={setBurgerIsOpen}/>]; 

	const Text = allText[1]; 
	const [title, setTitle] = useState(titles[levelNum]);
	const [selectedStyle, setSelectedStyle] = useState(null);

	const [boxHasClosed, setBoxHasClosed] = useState(false);
	const [boxStatus, setBoxStatus] = useState('');

	// ======================================= Event Handlers ================================== //
	function handleBurgerClick(option) { 
		const newLevelNum = titles.indexOf(option);
		setLevelNum(newLevelNum)
	}

	function onBoxClosing() { 
		fixContainerWidth() 
	}

	function onBoxOpening() { 
		if(boxHasClosed)resetContainerWidth()
	} 

	function onBoxOpen() {
		setBoxHasClosed(false)
	}

	function onBoxClosed() {
		setBoxHasClosed(true)
	}

	// ======================================= Helper Fns ================================== //
	function fixContainerWidth() { 
		const containerElement = document.getElementById(textContainerId);
		const elementWidth = getComputedWidth(containerElement); 

		containerElement.style.width = elementWidth; 
	}

	function resetContainerWidth() {
		const containerElement = document.getElementById(textContainerId);
		containerElement.style.width = '';
	}

	function getComputedWidth(element) {
		const style = window.getComputedStyle(element);
		return style.width;
	}

	// ======================================= Update ======================================= //
	useEffect(() => {
		if(selectedStyle) setStyle(selectedStyle)
		if(!selectedStyle) setStyle(defaultStyle)
	}, [selectedStyle])

	useEffect(() => { 
		setTitle(titles[levelNum])
	}, [levelNum])

	// ======================================= Trigger Events =============================== //
	useEffect(() => { 
		if(boxStatus === 'box-closing') onBoxClosing()
		if(boxStatus === 'box-opening') onBoxOpening()
		if(boxStatus === 'box-closed') onBoxClosed()
		if(boxStatus === 'box-open') onBoxOpen()
	}, [boxStatus])

	// ======================================= Output ======================================= //
	return (
		<OpenCloseBox title={title} i={i} buttons={buttons} setBoxStatus={setBoxStatus}>
			<div className="overflow-barrier">
				<div className="text-container" id={textContainerId}>
					<BurgerMenu isOpen={burgerIsOpen} setIsOpen={setBurgerIsOpen} options={titles} handleClick={handleBurgerClick}/>
					<Text setSelectedStyle={setSelectedStyle}/>
				</div>
			</div>
		</OpenCloseBox>
	)
}