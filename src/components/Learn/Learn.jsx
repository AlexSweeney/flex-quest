import React, {useState, useEffect} from 'react'; 
// import LevelText from '../parts/LevelText.jsx';
// import CodeInput from '../parts/CodeInput.jsx';
// import OutputDisplay from '../../parts/OutputDisplay.jsx'; 
import './LearnStyle.scss'; 

import * as htmlData from '../../data/learn/html.jsx';
import * as styleData from '../../data/learn/style.jsx'; 

export default function Learn() {  
	/*
		set to 64px / 4em = scroll to edge of 2nd box rounding error => try flex solution
	*/
	const [levelNum, setLevelNum] = useState(0); 

	const levels = [
		'Level 1: display: flex',
		'Level 2: justify-content',
		/*'Level 3: flex-direction',
		'Level 4: flex-wrap',
		'Level 5: flex-flow',
		'Level 6: align-items',
		'Level 7: align-content',
		'Level 8: order',
		'Level 9: flex-grow',
		'Level 10: flex-shrink',
		'Level 11: flex-basis',
		'Level 12: flex',
		'Level 13: align-self',*/
	]; 

	const currentLevel = useState()

	// const infoTitle = menuOptions[levelNum];

	// const [htmlString, setHtmlString] = useState(htmlStrings[levelNum]);
	// const [cssString, setCssString] = useState(cssStrings[levelNum]); 
	// const [defaultCssString, setDefaultCssString] = useState(cssStrings[levelNum]);
	
	// const [fade, setFade] = useState(false);

	// =========== Event Handlers
	const onChangeLevel = (levelNum) => {
		// setHtmlString(htmlStrings[levelNum])
		// setCssString(cssStrings[levelNum])
		// setDefaultCssString(cssStrings[levelNum]) 
	}

	// =========== Listeners
	useEffect(() => {
		onChangeLevel();
	}, [levelNum])

	// =========== Output
	return (
		<section className="learn-container"> 
			{/* <LevelText 
				i="1" 
				titles={menuOptions} 
				fade={fade} 
				setFade={setFade} 
				style={cssString} 
				setStyle={setCssString} 
				defaultStyle={defaultCssString} 
				levelNum={levelNum} 
				setLevelNum={setLevelNum}
			/>
			<CodeInput i="2" title="index.html" fadeOnChange={fade} code={htmlString} setCode={setHtmlString} originalCode={htmlStrings[levelNum]}/>
			<CodeInput i="3" title="style.css"  fadeOnChange={fade} code={cssString} setCode={setCssString} originalCode={cssStrings[levelNum]}/>
			<OutputDisplay i="4" title="display" htmlString={htmlString} cssString={cssString}/> */}
		</section>
	)
}