// open close box 
// refresh smaller - scroll showing on content open
// refresh bigger -  scroll showing on content open

// refactor => in Learn box -> detect transitions set overflow: overlay auto? 


// expand refresh x
// smaller refresh - auto normally, overlay when resizing -> prevent flick + allow access

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
	// =============== state settings
	const [showGrid, setShowGrid] = useState(false);
	const [source, setSource] = useState(null);
	const [savedInlineStyle, setSavedInlineStyle] = useState(null);

	// =============== resize status
	const [resizeDisplayBox, setResizeDisplayBox] = useState(false);
	const [displayBoxIsResizing, setDisplayBoxIsResizing] = useState(false);
	const [hasRemovedInlineStyle, setHasRemovedInlineStyle] = useState(false);

	// =============== animation status
	const [isAnimating, setIsAnimating] = useState(false);
	const [learnBoxStatus, setLearnBoxStatus] = useState('learn-box-open');
	 
	// =============== class states
	const [displayBoxClass, setDisplayBoxClass] = useState('');
	const [contentContainerClass, setContentContainerClass] = useState('content-container-open');
	// const [contentContainerScrollClass, setContentContainerScrollClass] = useState('scroll-auto');

	// =============== props
	const buttons = [
		<RefreshButton onClick={onRefreshClick} disabled={isAnimating}/>,
		<GridButton handleClick={onGridClick} showGrid={showGrid} disabled={isAnimating}/>
	];	 

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
		setContentContainerClass('content-container-resize')
		// setContentContainerScrollClass('scroll-overlay')
		removeInlineStyle('display-box') 
		setDisplayBoxClass('display-box-resize') 
	}

	function resetAfterDisplayBoxResize() {
		setContentContainerClass('content-container-open')
		// setContentContainerScrollClass('scroll-auto')
		setDisplayBoxClass('') 
	}
	
	// =========================== Element fns =========================== //
	function hasBeenResized(id, propertyNames) {
		const element = document.getElementById(id); 

		return !(element.style.width === '' && element.style.height === '');
	} 

	function removeInlineStyle(id) {
		const element = document.getElementById(id); 
		setSavedInlineStyle({width: element.style.width, height: element.style.height})
		element.style.width = '';
		element.style.height = '';
	}

	function restoreInlineStyle(id) {
		const element = document.getElementById(id);
		element.style.width = savedInlineStyle.width;
		element.style.height = savedInlineStyle.height;
		setSavedInlineStyle(null)
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

 	// =========================== Set Classes =========================== //
	// =========== handle display resize
	useEffect(() => {
		if(resizeDisplayBox) {
			handleDisplayBoxResize()
		} else { 
			resetAfterDisplayBoxResize()
		}
	}, [resizeDisplayBox])

	// =========== handle learn box open / close
	useEffect(() => { 
		const overflow = elementIsOverflowing('content-container');

		if(learnBoxStatus === 'learn-box-closing') {
			if(overflow) {  
				setDisplayBoxClass(`display-box-parent-closing-overflow`)
				removeInlineStyle('display-box') 
				setHasRemovedInlineStyle(true)
			} else {
				setDisplayBoxClass(`display-box-parent-closing`)
				setHasRemovedInlineStyle(false)
			} 
		} else if(learnBoxStatus === 'learn-box-opening') {
			if(hasRemovedInlineStyle) {
				restoreInlineStyle('display-box')
				setHasRemovedInlineStyle(false)
			}
			setDisplayBoxClass('display-box-parent-opening')
		} else if(learnBoxStatus === 'learn-box-open') {
			setDisplayBoxClass('display-box-parent-open')
		}  else if(learnBoxStatus === 'learn-box-closed') { 
			setDisplayBoxClass('display-box-parent-closed')
		} 
	}, [learnBoxStatus]) 

	// =========================== Set Classes =========================== //
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
  // useEffect(() => {
  // 	console.log('displayBoxAnimatingClass', displayBoxAnimatingClass);
  // }, [displayBoxAnimatingClass])

  // displayBoxIsResizing
  // useEffect(() => {
  // 	console.log('displayBoxIsResizing', displayBoxIsResizing);
  // }, [displayBoxIsResizing])

  // learnBoxStatus
  // useEffect(() => {
  // 	console.log('learnBoxStatus', learnBoxStatus);
  // }, [learnBoxStatus])
  
  // =========================== output =========================== //
	return (
		<LearnBox title={title} 
			i={i} 
			isAnimating={isAnimating} 
			setIsAnimating={setIsAnimating} 
			buttons={buttons} 
			learnBoxStatus={learnBoxStatus} 
			setLearnBoxStatus={setLearnBoxStatus}
			contentContainerClass={contentContainerClass}
			setContentContainerClass={setContentContainerClass}>
			<div className={`display-box ${displayBoxClass}`} id="display-box">
				{/*<GridOverlay showGrid={showGrid}/>
				<iframe srcdoc={source} className="iframe"/>  */}
			</div>
		</LearnBox>
	)
}	

	// const [displayBoxAnimatingClass, setDisplayBoxAnimatingClass] = useState('display-box-init');
	// const [displayBoxResizingClass, setDisplayBoxIsResizingClass] = useState('');
	// const [displayBoxContainerAnimatingClass, setDisplayBoxContainerAnimatingClass] = useState('');
	// const [displayBoxTransitionClass, setDisplayBoxTransitionClass] = useState('');
	// const [displayBoxMaxSizeClass, setDisplayBoxMaxSizeClass] = useState('');
	
	// const [showScrollClass, setShowScrollClass] = useState('');

	// =============== classes
	// const displayBoxContainerClass = `display-box-container ${displayBoxContainerAnimatingClass} custom-scroll ${showScrollClass}`;

		// const learnBoxProps = [title, i, isAnimating, setIsAnimating, buttons];

	// }


	{/**/}
	/**/
/*</div>*/
	{/*<div className="output-display">*/}
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
