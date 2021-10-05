import React, {useState, useEffect} from 'react';
/*import LearnBox from './parts/LearnBox.jsx'; */
/*import OutputDisplay from './parts/OutputDisplay.jsx'; */
import LevelText from './parts/LevelText.jsx';
import CodeInput from './parts/CodeInput.jsx';
import OutputDisplay from './parts/OutputDisplay.jsx';

// import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';
// import CodeBox from './CodeBox.jsx';  

// import DisplayBox from './DisplayBox.jsx';
import './LearnStyle.css'; 

import {html as html_1} from './data/learn/Level_1/html.jsx';
import {html as html_2} from './data/learn/Level_2/html.jsx';
import {html_3} from './data/html/html_3.jsx';
import {html_4} from './data/html/html_4.jsx';
import {html_5} from './data/html/html_5.jsx';
import {html_6} from './data/html/html_6.jsx';
import {html_7} from './data/html/html_7.jsx';
import {html_8} from './data/html/html_8.jsx';
import {html_9} from './data/html/html_9.jsx';
import {html_10} from './data/html/html_10.jsx';
import {html_11} from './data/html/html_11.jsx';
import {html_12} from './data/html/html_12.jsx';
import {html_13} from './data/html/html_13.jsx';

import {style as style_1} from './data/learn/Level_1/style.jsx';
import {style as style_2} from './data/learn/Level_2/style.jsx';
import {style_3} from './data/css/style_3.jsx';
import {style_4} from './data/css/style_4.jsx';
import {style_5} from './data/css/style_5.jsx';
import {style_6} from './data/css/style_6.jsx';
import {style_7} from './data/css/style_7.jsx';
import {style_8} from './data/css/style_8.jsx';
import {style_9} from './data/css/style_9.jsx';
import {style_10} from './data/css/style_10.jsx';
import {style_11} from './data/css/style_11.jsx';
import {style_12} from './data/css/style_12.jsx';
import {style_13} from './data/css/style_13.jsx';

export default function Learn() {  
	const [levelNum, setLevelNum] = useState(0);

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
		html_10,
		html_11,
		html_12,
		html_13,
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
		style_10,
		style_11,
		style_12,
		style_13,
	];

	const menuOptions = [
		'Level 1: display: flex',
		'Level 2: justify-content',
		'Level 3: flex-direction',
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

	const infoTitle = menuOptions[levelNum];

	const [htmlString, setHtmlString] = useState(htmlStrings[levelNum]);
	const [cssString, setCssString] = useState(cssStrings[levelNum]); 
	const [defaultCssString, setDefaultCssString] = useState(cssStrings[levelNum]);
	
	useEffect(() => {
		setHtmlString(htmlStrings[levelNum])
		setCssString(cssStrings[levelNum])
		setDefaultCssString(cssStrings[levelNum])

	}, [levelNum])

	return (
		<section className="learn-container"> 
			<LevelText i="1" titles={menuOptions} setStyle={setCssString} defaultStyle={defaultCssString} levelNum={levelNum} setLevelNum={setLevelNum}/>
			<CodeInput i="2" title="index.html" code={htmlString} setCode={setHtmlString} originalCode={htmlStrings[levelNum]}></CodeInput>
			<CodeInput i="3" title="style.css" code={cssString} setCode={setCssString} originalCode={cssStrings[levelNum]}></CodeInput>
			<OutputDisplay i="4" title="display" htmlString={htmlString} cssString={cssString} />
		</section>
	)
}