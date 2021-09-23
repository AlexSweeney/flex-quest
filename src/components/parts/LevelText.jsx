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

			change level and close when click title

		animate on open / close box
	*/

	// ======================================= State ======================================= //
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const buttons = [<Burger burgerIsOpen={burgerIsOpen} setBurgerIsOpen={setBurgerIsOpen}/>]; 

	const Text = allText[1]; 
	const [title, setTitle] = useState(titles[levelNum]);
	const [selectedStyle, setSelectedStyle] = useState(null);

	// ======================================= Event Handlers ======================================= //
	function handleBurgerClick(option) {
		console.log('option', option)
		console.log('titles', titles)
		const newLevelNum = titles.indexOf(option);
		setLevelNum(newLevelNum)
	}

	// ======================================= Update ======================================= //
	useEffect(() => {
		if(selectedStyle) setStyle(selectedStyle)
		if(!selectedStyle) setStyle(defaultStyle)
	}, [selectedStyle])

	useEffect(() => {
		console.log('titles', titles)
		console.log('levelNum', levelNum)
		console.log('titles[levelNum]', titles[levelNum])
		setTitle(titles[levelNum])
	}, [levelNum])

	// ======================================= Output ======================================= //
	return (
		<OpenCloseBox title={title} i={i} buttons={buttons}>
			<div className="text-container">
				<BurgerMenu isOpen={burgerIsOpen} setIsOpen={setBurgerIsOpen} options={titles} handleClick={handleBurgerClick}/>
				<Text setSelectedStyle={setSelectedStyle}/>
			</div>
		</OpenCloseBox>
	)
}