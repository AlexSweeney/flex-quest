// smaller open close
// bigger open close

// fix - expand refresh
// fix - smaller refresh
// fix -expand open / close
// fix - smaller open / close

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

	// =============== resize status
	const [resizeDisplayBox, setResizeDisplayBox] = useState(false);
	const [displayBoxIsResizing, setDisplayBoxIsResizing] = useState(false);

	// =============== animation status
	const [isAnimating, setIsAnimating] = useState(false);
	const [learnBoxStatus, setLearnBoxStatus] = useState('learn-box-open');
	 
	// =============== class states
	const [displayBoxAnimatingClass, setDisplayBoxAnimatingClass] = useState('display-box-init');
	const [displayBoxContainerAnimatingClass, setDisplayBoxContainerAnimatingClass] = useState('');

	const [displayBoxResizingClass, setDisplayBoxIsResizingClass] = useState('');

	const [displayBoxTransitionClass, setDisplayBoxTransitionClass] = useState('');
	const [displayBoxMaxSizeClass, setDisplayBoxMaxSizeClass] = useState('');
	
	const [showScrollClass, setShowScrollClass] = useState('');

	// =============== classes
	const displayBoxContainerClass = `display-box-container ${displayBoxContainerAnimatingClass} custom-scroll ${showScrollClass}`;

	// =============== props
	const buttons = [
		<RefreshButton onClick={onRefreshClick}/>,
		<GridButton handleClick={onGridClick} showGrid={showGrid} />
	];	 

	// const learnBoxProps = [title, i, isAnimating, setIsAnimating, buttons];

	// }

	// =========================== Click Handlers =========================== //
	function onRefreshClick() {
		if(hasBeenResized('display-box') && !isAnimating) setResizeDisplayBox(true)
	}

	function onGridClick() {
		setShowGrid(oldVal => !oldVal)
	} 

	// =========================== Event Handlers =========================== //
	// ============= Resize
	function handleDisplayBoxResize() {
		// removeInlineStyle('display-box') 
		// setDisplayBoxAnimatingClass('display-box-transition')
		
		// setDisplayBoxTransitionClass('display-box-transition')
		// if(elementIsOverflowing('display-box')) setShowScrollClass('show-scroll')
	}

	function resetAfterDisplayBoxResize() {
		// setDisplayBoxAnimatingClass('')
		
		// setDisplayBoxTransitionClass('') 
		// setShowScrollClass('')
	}
	
	// ============= Animate
	function handleAnimateOpening() {
		setDisplayBoxContainerAnimatingClass('display-box-container-animating')
		
		if(elementIsOverflowing(displayBoxContainerId)) {
			setDisplayBoxAnimatingClass('display-box-animating-overflow-opening')
		} else {
			setDisplayBoxAnimatingClass('display-box-animating')
		}
	}

	function handleAnimateClosing() {
		setDisplayBoxContainerAnimatingClass('display-box-container-animating')
		
		if(elementIsOverflowing(displayBoxContainerId)) {
			setDisplayBoxAnimatingClass('display-box-animating-overflow-closing')
		} else {
			setDisplayBoxAnimatingClass('display-box-animating')
		}
	}
  
	function handleAnimateEnd() {
		setDisplayBoxAnimatingClass('')
		setDisplayBoxContainerAnimatingClass('') 
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

	function elementIsOverflowing(id) {
		const element = document.getElementById(id);
		if(!element) return;

	  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
	}

	// =========================== Detect Changes =========================== //
	// =========== display box
	useEffect(() => { 
		detectTransitions('display-box', ['width', 'height'], setDisplayBoxIsResizing)
	}, [])

	useEffect(() => { 
		// set to true with click handler
		if(!displayBoxIsResizing) {
			setResizeDisplayBox(false)
		} 
	}, [displayBoxIsResizing])
 	
 	// =========================== Handle Changes =========================== //
	// =========== handle display resize
	useEffect(() => {
		if(resizeDisplayBox) {
			handleDisplayBoxResize()
		} else { 
			resetAfterDisplayBoxResize()
		}
	}, [resizeDisplayBox])

	// =========== handle learnbox animating on / off
	useEffect(() => { 
		console.log('learnBoxStatus', learnBoxStatus)
		if(learnBoxStatus === 'learn-box-closing') {
			handleAnimateClosing()
		} else if(learnBoxStatus === 'learn-box-opening') {
			handleAnimateOpening()
		} else if(learnBoxStatus === 'learn-box-open' && !isAnimating) {
			handleAnimateEnd();
		}
	}, [learnBoxStatus, isAnimating]) 

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

  // =========================== console.logs =========================== //
  // showScrollClass
  // useEffect(() => {
  // 	console.log('showScrollClass', showScrollClass);
  // }, [showScrollClass])

  // displayBoxAnimatingClass 
  useEffect(() => {
  	console.log('displayBoxAnimatingClass', displayBoxAnimatingClass);
  }, [displayBoxAnimatingClass])

  // displayBoxIsResizing
  // useEffect(() => {
  // 	console.log('displayBoxIsResizing', displayBoxIsResizing);
  // }, [displayBoxIsResizing])
  
  // =========================== output =========================== //
	return (
		<div className="output-display">
			<LearnBox title={title} i={i} isAnimating={isAnimating} setIsAnimating={setIsAnimating} buttons={buttons} learnBoxStatus={learnBoxStatus} setLearnBoxStatus={setLearnBoxStatus}>
				{/*<div className={displayBoxContainerClass} id={displayBoxContainerId}>*/}
					<div className={`display-box ${displayBoxAnimatingClass}`} id="display-box">
						<GridOverlay showGrid={showGrid}/>
						<iframe srcdoc={source} className="iframe"/>  
					</div>
				{/*</div>*/}
			</LearnBox>
		</div>
	)
}	

	{/**/}
	/**/

/* 
	${displayBoxMaxSizeClass} ${displayBoxTransitionClass}

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
