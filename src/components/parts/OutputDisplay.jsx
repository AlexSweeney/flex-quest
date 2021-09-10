// fix glitch - drag out refresh scroll bar strobe

import React, {useState, useEffect} from 'react'; 
import LearnBox from './LearnBox.jsx';
import RefreshButton from './RefreshButton.jsx';
import GridButton from './GridButton.jsx';
import GridOverlay from './GridOverlay.jsx';
import {detectTransitions} from './../utils.js';
import './OutputDisplay.css';
import './scrollbar.css';

export default function OutputDisplay({title, i, htmlString, cssString}) {
	// =========================== Vars =========================== //
	// =============== ids
	const displayBoxContainerId = `display-box-container-${i}`;

	// =============== state settings
	const [showGrid, setShowGrid] = useState(false);
	const [source, setSource] = useState(null);

	// =============== animation status
	const [displayBoxIsResizing, setDisplayBoxIsResizing] = useState(false);
	const [animateDisplayResize, setAnimateDisplayResize] = useState(false);
	 
	// =============== classes
	const [displayBoxAnimatingClass, setDisplayBoxAnimatingClass] = useState('');
	const [displayBoxTransitionClass, setDisplayBoxTransitionClass] = useState('');
	const [displayBoxMaxSizeClass, setDisplayBoxMaxSizeClass] = useState('');
	const [displayBoxContainerClass, setDisplayBoxContainerClass] = useState('');

	// =============== props
	const buttons = [
		<RefreshButton onClick={onRefreshClick}/>,
		<GridButton handleClick={onGridClick} showGrid={showGrid} />
	];	 

	const [isAnimating, setIsAnimating] = useState(false);

	// =========================== Click Handlers =========================== //
	function onRefreshClick() {
		if(hasBeenResized('display-box')) setAnimateDisplayResize(true)
	}

	function onGridClick() {
		setShowGrid(oldVal => !oldVal)
	} 

	// =========================== Element fns =========================== //
	function hasBeenResized(id, propertyNames) {
		const element = document.getElementById(id); 

		return !(element.style.width === '' && element.style.height === '');
	}

	function removeInlineStyle(id) {
		const element = document.getElementById(id);
		element.style = [];
	}

	function setMaxSize(id) {
		const element = document.getElementById(id);
		if(!element) return;

		if(!elementIsOverflowing(element)) { 
			setDisplayBoxMaxSizeClass('display-box-max-size')
		} else { 
			setDisplayBoxMaxSizeClass('')
		}
	}

	function elementIsOverflowing(element) {
	  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
	}

	// =========================== Detect Transitions =========================== //
	useEffect(() => { 
		detectTransitions('display-box', ['width', 'height'], setDisplayBoxIsResizing)
	}, [])
 	
 	// =========================== Handle Changes =========================== //
 	// =========== set animate display
	useEffect(() => { 
		if(!displayBoxIsResizing) {
			setAnimateDisplayResize(false)
		} 
	}, [displayBoxIsResizing])

	// =========== handle animate display
	useEffect(() => {
		if(animateDisplayResize) {
			removeInlineStyle('display-box') 
			setDisplayBoxTransitionClass('display-box-transition') 
		} else { 
			setDisplayBoxTransitionClass('') 
		}
	}, [animateDisplayResize])

	// =========== handle learnbox animating on / off
	useEffect(() => { 
		if(isAnimating) {
			setDisplayBoxContainerClass('display-box-container-animating')
			setDisplayBoxAnimatingClass('display-box-animating')
			setMaxSize(displayBoxContainerId)
		} else {
			setDisplayBoxContainerClass('')
			setDisplayBoxAnimatingClass('')
			setDisplayBoxMaxSizeClass('')
		}
	}, [isAnimating]) 

	// =========== handle updates from code boxes
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

  // =========================== output =========================== //
	return (
		<div className="output-display">
			<LearnBox title={title} i={i} isAnimating={isAnimating} setIsAnimating={setIsAnimating} buttons={buttons}>
				<div className={`display-box-container custom-scroll ${displayBoxContainerClass}`} id={displayBoxContainerId}>
					<div className={`display-box ${displayBoxAnimatingClass} ${displayBoxMaxSizeClass} ${displayBoxTransitionClass}`} id="display-box">
						<GridOverlay showGrid={showGrid}/>
						<iframe srcdoc={source} className="iframe"/>  
					</div>
				</div>
			</LearnBox>
		</div>
	)
}	

/* 

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

	/*const [displayBoxContainerIsAnimating, setDisplayBoxContainerIsAnimating] = useState(false);
*/

	// detect display box container transitioning
	/*useEffect(() => {
		detectTransitions(displayBoxContainerId, 'height', setDisplayBoxContainerIsAnimating)
	}, [])*/
