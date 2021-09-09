import React, {useState, useEffect} from 'react'; 
import LearnBox from './LearnBox.jsx';
import {detectTransitions} from './../utils.js';
import './OutputDisplay.css';

export default function OutputDisplay({title, i, htmlString, cssString}) {
	const displayBoxContainerId = `display-box-container-${i}`;

	const [source, setSource] = useState(null);

	const [displayBoxContainerClass, setDisplayBoxContainerClass] = useState('');
	const [displayBoxClass, setDisplayBoxClass] = useState('');
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		if(isAnimating) {
			setDisplayBoxContainerClass('display-box-container-animating')
			setDisplayBoxClass('display-box-animating')
		} else {
			setDisplayBoxContainerClass('')
			setDisplayBoxClass('')
		}
	}, [isAnimating])

	/*const [displayBoxContainerIsAnimating, setDisplayBoxContainerIsAnimating] = useState(false);
*/

	// detect display box container transitioning
	/*useEffect(() => {
		detectTransitions(displayBoxContainerId, 'height', setDisplayBoxContainerIsAnimating)
	}, [])*/

	// handle updates from code boxes
  useEffect(() => {  
  	setSource(`
  		<html lang="en">
  		<head>
  			<style>
  				body { padding: 0; margin: 0; overflow: hidden; }
  				${cssString}
  			</style>
  		</head>
  		<body>${htmlString}</body>
  		</html>`);
  }, [htmlString, cssString]) 

  // handle Learn box open / close
  /*useEffect(() => {
  	if(learnBoxStatus === 'learn-box-closing') {
  		// console.log('closing')
  		setDisplayBoxContainerClass('display-box-container-closing')
  	} else if(!displayBoxContainerIsAnimating) {
  		// console.log('open')
  		setDisplayBoxContainerClass('display-box-container-open')
  	}
  }, [learnBoxStatus, displayBoxContainerIsAnimating])

  useEffect(() => {
  	console.log('displayBoxContainerIsAnimating', displayBoxContainerIsAnimating)
  }, [displayBoxContainerIsAnimating])*/

	return (
		<div className="output-display">
			<LearnBox title={title} i={i} isAnimating={isAnimating} setIsAnimating={setIsAnimating}>
				<div className={`display-box-container ${displayBoxContainerClass}`} id={displayBoxContainerId}>
					<div className={`display-box ${displayBoxClass}`} id="display-box">
						{/*<GridOverlay showGrid={showGrid}/>*/}
						<iframe srcdoc={source} className="iframe"/>  
					</div>
				</div>
			</LearnBox>
		</div>
	)
}	