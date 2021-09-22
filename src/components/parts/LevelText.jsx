import React, {useState} from 'react';
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import './LevelText.css';

export default function LevelText({i, titles, allText, levelNum}) {
	/*
		* show title
		
		* show text

		when new style selected change css string
		when new style unselected change back css string

		burger
			show all titles when clicked

			change level and close when click title


	*/

	const buttons = []; 
	const Text = allText[1];


	const [setSelectedStyle] = useState(null)

	return (
		<OpenCloseBox title={titles[levelNum]} i={i} buttons={buttons}>
			<div className="text-container">
			 <Text setSelectedStyle={setSelectedStyle}/>
			</div>
		</OpenCloseBox>
	)
}