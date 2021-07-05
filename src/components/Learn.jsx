import React, {useState} from 'react';
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';
import CodeBox from './CodeBox.jsx';  
import DisplayBox from './DisplayBox.jsx';
import './LearnStyle.css'; 

import {text_1} from './data/text/text_1.jsx';
import {html_1} from './data/html/html_1.jsx';
import {style_1} from './data/css/style_1.jsx';

export default function Learn() {  
	const htmlStrings = [
		html_1,
		'html_string_2',
		'html_string_3',
		'html_string_4',
		'html_string_5',
		'html_string_6',
		'html_string_7',
		'html_string_8',
		'html_string_9',
		'html_string_10',
		'html_string_11',
		'html_string_12',
		'html_string_13',
	];

	const cssStrings = [
		style_1,
		'style_2',
		'style_3',
		'style_4',
		'style_5',
		'style_6',
		'style_7',
		'style_8',
		'style_9',
		'style_10',
		'style_11',
		'style_12',
		'style_13',
	];

	const menuOptions = [
		'Level 1: display: flex',
		'Level 2: flex-direction',
		'Level 3: justify-content',
		'Level 4: flex-wrap',
		'Level 5: flex-flow',
		'Level 6: align-items',
		'Level 7: align-content',
		'Level 8: order',
		'Level 9: flex-grow',
		'Level 10: flex-shrink',
		'Level 11: flex-basis',
		'Level 12: flex',
		'Level 13: align-self',  
	]; 

	const menuText = [
		text_1,
		'text 2',
		'text 3',
		'text 4',
		'text 5',
		'text 6',
		'text 7',
		'text 8',
		'text 9',
		'text 10',
		'text 11',
		'text 12',
		'text 13',
	];

	const [infoTitle, setInfoTitle] = useState(menuOptions[0]);
	const [infoText, setInfoText] = useState(menuText[0]);
	const [htmlString, setHtmlString] = useState(htmlStrings[0]);
	const [cssString, setCssString] = useState(cssStrings[0]);  

	function handleMenuOptionClick(option) { 
		changeLevel(menuOptions.indexOf(option));
	}

	function changeLevel(levelNum) { 
		setInfoTitle(menuOptions[levelNum]);
		setInfoText(menuText[levelNum]);
		setHtmlString(htmlStrings[levelNum]);
		setCssString(cssStrings[levelNum]);
	}

	function handleHtmlChange(e) {
		setHtmlString(e.target.value);
	}

	function handleCssChange(e) {
		setCssString(e.target.value);
	}

	return (
		<section className="learn-container"> 
			<OpenCloseBox 
				title={infoTitle} 
				text={infoText} 
				menuOptions={menuOptions} 
				handleMenuOptionClick={handleMenuOptionClick}/>
			<CodeBox title="index.html" value={htmlString} handleChange={handleHtmlChange}/> 
			<CodeBox title="style.css" value={cssString} handleChange={handleCssChange}/>
			<DisplayBox title="display" htmlString={htmlString} cssString={cssString}/> 
		</section>
	)
}