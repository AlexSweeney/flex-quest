import React, {useState} from 'react';
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';
import CodeBox from './CodeBox.jsx';  
import DisplayBox from './DisplayBox.jsx';
import './LearnStyle.css'; 

import Text_1 from './data/text/Text_1.jsx';
import Text_2 from './data/text/Text_2.jsx';
import {html_1} from './data/html/html_1.jsx';
import {html_2} from './data/html/html_2.jsx';
import {style_1} from './data/css/style_1.jsx';
import {style_2} from './data/css/style_2.jsx';

export default function Learn() {  
	const [levelNum, setLevelNum] = useState(1);

	const htmlStrings = [
		html_1,
		html_2,
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
		style_2,
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

	const [htmlString, setHtmlString] = useState(htmlStrings[levelNum]);
	const [cssString, setCssString] = useState(cssStrings[levelNum]);  
	const defaultCssString = cssStrings[levelNum];

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
		<Text_1/>,
		<Text_2 handleClick={handleTextOptionClick} styleString={cssString}/>,
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

	const [infoTitle, setInfoTitle] = useState(menuOptions[levelNum]);
	const [infoText, setInfoText] = useState(menuText[levelNum]); 
	

	const [displayHtml, setDisplayHtml] = useState(htmlString);
	const [displayCss, setDisplayCss] = useState(cssString);

	const [fadeDisplay, setFadeDisplay] = useState(false);
	const [fadeStyle, setFadeStyle] = useState(false);

	function handleMenuOptionClick(option) { 
		changeLevel(menuOptions.indexOf(option));
	}

	function changeLevel(levelNum) {  
		setLevelNum(levelNum);
		setInfoTitle(menuOptions[levelNum]);
		setInfoText(menuText[levelNum]);
		setHtmlString(htmlStrings[levelNum]);
		setCssString(cssStrings[levelNum]);

		changeDispay(htmlStrings[levelNum], cssStrings[levelNum]); 
	}

	function changeDispay(htmlString, cssString) {
		setFadeDisplay(true);

		setTimeout(() => { 
			setDisplayHtml(htmlString);
			setDisplayCss(cssString);	
			setFadeDisplay(false);
		}, 500)
	}

	function handleHtmlChange(e) {
		setHtmlString(e.target.value);
		setFadeDisplay(true);

		setTimeout(() => {
			setFadeDisplay(false)
			setDisplayHtml(e.target.value);
		}, 500);
	}

	function handleHtmlRefresh() {
		setHtmlString(htmlStrings[levelNum]);
	}

	function handleCssChange(e) {
		const newString = e.target.value;
		setCssString(newString);
		setFadeDisplay(true);

		setTimeout(() => {
			setFadeDisplay(false); 
			setDisplayCss(newString);
		}, 500);
	}

	function handleCssRefresh() {
		setCssString(cssStrings[levelNum]);
	}

	function handleTextOptionClick(newCssString) { 
		setFadeDisplay(true);

		setTimeout(() => {
			let thisStyle;
			if(newCssString === cssString) thisStyle = defaultCssString;
			else thisStyle = newCssString;
	  
			setCssString(thisStyle);
			setDisplayCss(thisStyle);

			setFadeDisplay(false)
		}, 750);
	} 

	return (
		<section className="learn-container"> 
			<OpenCloseBox title={infoTitle} menuOptions={menuOptions} handleMenuOptionClick={handleMenuOptionClick}>
			{/*	<InfoText handleClick={handleTextOptionClick} styleString={cssString}/>*/}
				<div className="info-text-container">{infoText}</div>
			</OpenCloseBox>
			<CodeBox title="index.html" value={htmlString} handleChange={handleHtmlChange} handleRefresh={handleHtmlRefresh}/> 
			<CodeBox title="style.css" value={cssString} handleChange={handleCssChange} handleRefresh={handleCssRefresh} fade={fadeStyle}/> 
			<DisplayBox title="display" htmlString={displayHtml} cssString={displayCss} fade={fadeDisplay}/> 
		</section>
	)
}

	{/*<OpenCloseBox title="style.css"><p contentEditable>{cssString}</p></OpenCloseBox>*/} 