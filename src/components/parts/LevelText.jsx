import React, {useState, useEffect} from 'react';
import Burger from './Burger/Burger.jsx';
import BurgerMenu from './Burger/BurgerMenu.jsx';
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import './LevelText.css';

export default function LevelText({i, titles, allText, levelNum, setStyle, defaultStyle}) {
	/*
		* show title
		
		* show text

		* when new style selected change css string
		* when new style unselected change back css string

		* burger
			show all titles when clicked

			change level and close when click title

		animate on open / close box
	*/

	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const buttons = [<Burger burgerIsOpen={burgerIsOpen} setBurgerIsOpen={setBurgerIsOpen}/>]; 

	const Text = allText[1]; 
	const [selectedStyle, setSelectedStyle] = useState(null);

	function handleBurgerClick() {

	}

	useEffect(() => {
		if(selectedStyle) setStyle(selectedStyle)
		if(!selectedStyle) setStyle(defaultStyle)
	}, [selectedStyle])

	return (
		<OpenCloseBox title={titles[levelNum]} i={i} buttons={buttons}>
			<div className="text-container">
				<BurgerMenu isOpen={burgerIsOpen} options={titles}/>
				<Text setSelectedStyle={setSelectedStyle}/>
			</div>
		</OpenCloseBox>
	)
}