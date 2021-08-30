import React, {useState} from 'react';
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';
import CodeBox from './CodeBox.jsx';  
import DisplayBox from './DisplayBox.jsx';
import './LearnStyle.css'; 

import Text_1 from './data/text/Text_1.jsx';
import Text_2 from './data/text/Text_2.jsx';
import Text_3 from './data/text/Text_3.jsx';
import Text_4 from './data/text/Text_4.jsx';
import Text_5 from './data/text/Text_5.jsx';
import Text_6 from './data/text/Text_6.jsx';
import Text_7 from './data/text/Text_7.jsx';
import Text_8 from './data/text/Text_8.jsx';
import Text_9 from './data/text/Text_9.jsx';
import Text_10 from './data/text/Text_10.jsx';

import {html_1} from './data/html/html_1.jsx';
import {html_2} from './data/html/html_2.jsx';
import {html_3} from './data/html/html_3.jsx';
import {html_4} from './data/html/html_4.jsx';
import {html_5} from './data/html/html_5.jsx';
import {html_6} from './data/html/html_6.jsx';
import {html_7} from './data/html/html_7.jsx';
import {html_8} from './data/html/html_8.jsx';
import {html_9} from './data/html/html_9.jsx';
import {html_10} from './data/html/html_10.jsx';

import {style_1} from './data/css/style_1.jsx';
import {style_2} from './data/css/style_2.jsx';
import {style_3} from './data/css/style_3.jsx';
import {style_4} from './data/css/style_4.jsx';
import {style_5} from './data/css/style_5.jsx';
import {style_6} from './data/css/style_6.jsx';
import {style_7} from './data/css/style_7.jsx';
import {style_8} from './data/css/style_8.jsx';
import {style_9} from './data/css/style_9.jsx';
import {style_10} from './data/css/style_10.jsx';

export default function Learn() {  
	const [levelNum, setLevelNum] = useState(8);

	const htmlStrings = [
		html_1,
		html_2,
		html_3,
		html_4,
		html_5,
		html_6,
		html_7,
		html_8,
		html_9,
		'html_string_10',
		'html_string_11',
		'html_string_12',
		'html_string_13',
	];

	const cssStrings = [
		style_1,
		style_2,
		style_3,
		style_4,
		style_5,
		style_6,
		style_7,
		style_8,
		style_9,
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
		Text_1,
		Text_2,
		Text_3,
		Text_4,
		Text_5,
		Text_6,
		Text_7,
		Text_8,
		Text_9,
		'text 10',
		'text 11',
		'text 12',
		'text 13',
	];

	// const [infoTitle, setInfoTitle] = useState(menuOptions[levelNum]);
	const infoTitle = menuOptions[levelNum];
	const InfoText = menuText[levelNum];
	// const [infoText, setInfoText] = useState(menuText[levelNum]); 

	const [displayHtml, setDisplayHtml] = useState(htmlString);
	const [displayCss, setDisplayCss] = useState(cssString);

	const [fadeInfo, setFadeInfo] = useState(false);
	const [fadeDisplay, setFadeDisplay] = useState(false);
	const [fadeHtml, setFadeHtml] = useState(false);
	const [fadeStyle, setFadeStyle] = useState(false);

	function handleMenuOptionClick(option) { 
		changeLevel(menuOptions.indexOf(option));
	}

	function changeLevel(levelNum) {  
		setFadeInfo(true);
		setFadeHtml(true);
		setFadeStyle(true);
		setFadeDisplay(true);

		setTimeout(() => {
			setFadeInfo(false);
			setFadeHtml(false);
			setFadeStyle(false);
			setFadeDisplay(false);

			setLevelNum(levelNum);
			setHtmlString(htmlStrings[levelNum]);
			setCssString(cssStrings[levelNum]);

			setDisplayHtml(htmlStrings[levelNum]);
			setDisplayCss(cssStrings[levelNum]); 
		}, 500);
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
		setFadeHtml(true);

		setTimeout(() => {
			setFadeHtml(false);
			setHtmlString(htmlStrings[levelNum]);
			setDisplayHtml(htmlStrings[levelNum]);
		}, 500);
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
		setFadeStyle(true);

		setTimeout(() => {
			setFadeStyle(false);
			setCssString(cssStrings[levelNum]);
			setDisplayCss(cssStrings[levelNum]);
		}, 500);
	}

	function handleTextOptionClick(newCssString) { 
		setFadeDisplay(true);
		setFadeStyle(true);
		
		let thisStyle;
		if(newCssString === cssString) thisStyle = defaultCssString;
		else thisStyle = newCssString;
		setCssString(thisStyle);

		setTimeout(() => {
			setDisplayCss(thisStyle);
			setFadeDisplay(false);
			setFadeStyle(false);
		}, 750);
	} 
 
	return (
		<section className="learn-container"> 
			<OpenCloseBox title={infoTitle} menuOptions={menuOptions} handleMenuOptionClick={handleMenuOptionClick} fade={fadeInfo}>
				{/*	<InfoText handleClick={handleTextOptionClick} styleString={cssString}/>*/}
			{/*	<div className="info-text-container">{infoText}</div>*/}
				<div className={ fadeInfo ? "no-show info-text-container" : "info-text-container"}>
					<InfoText handleClick={handleTextOptionClick} styleString={cssString} setStyleString={setCssString}/>
				</div>
			</OpenCloseBox>
			<CodeBox title="index.html" value={htmlString} handleChange={handleHtmlChange} handleRefresh={handleHtmlRefresh} fade={fadeHtml}/> 
			<CodeBox title="style.css" value={cssString} handleChange={handleCssChange} handleRefresh={handleCssRefresh} fade={fadeStyle}/> 
			<DisplayBox title="display" htmlString={displayHtml} cssString={displayCss} fade={fadeDisplay}/> 
		</section>
	)
}

	{/*<OpenCloseBox title="style.css"><p contentEditable>{cssString}</p></OpenCloseBox>*/} 