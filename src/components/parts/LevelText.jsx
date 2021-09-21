import React, {useState} from 'react';
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import './LevelText.css';

export default function LevelText({i, titles, allText, levelNum}) {
	/*
		* show title
		
		show text

		burger
			show all titles when clicked

			change level and close when click title
	*/

	const buttons = []; 
	const Text = allText[1];

	function handleClick() {
		console.log('hello world')
	}

	const styleString = ''; 

	return (
		<OpenCloseBox title={titles[levelNum]} i={i} buttons={buttons}>
			<div className="text-container">
			 <Text handleClick={handleClick} styleString={styleString}/>
			</div>
		</OpenCloseBox>
	)
}