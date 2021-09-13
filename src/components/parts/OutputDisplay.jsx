// open close
// fresh - x 
// bigger  -  
// smaller -   

// refresh
// fresh -  
// bigger  -  
// smaller - 

import React, {useState, useEffect} from 'react'; 
import LearnBox from './LearnBox.jsx';
import RefreshButton from './RefreshButton.jsx';
import GridButton from './GridButton.jsx';
import GridOverlay from './GridOverlay.jsx';
import {detectTransition} from './../utils.js';
import './OutputDisplay.css'; 

export default function OutputDisplay({title, i, htmlString, cssString}) {
	// =========================== Vars =========================== // 
	// =============== state
	const [learnBoxIsOpen, setLearnBoxIsOpen] = useState(true);
	const [displayBoxIsOpen, setDisplayBoxIsOpen] = useState(true);
	const [showGrid, setShowGrid] = useState(false);
	const [source, setSource] = useState(null);
	const [savedInlineStyle, setSavedInlineStyle] = useState(null);
 
	// =============== resize status
	// const [resizeDisplayBox, setResizeDisplayBox] = useState(false);
	const [displayBoxIsResizing, setDisplayBoxIsResizing] = useState(false);
	const [hasRemovedInlineStyle, setHasRemovedInlineStyle] = useState(false);

	// =============== animation status
	const [isAnimating, setIsAnimating] = useState(false);

	// =============== box status
	const [displayBoxStatus, setDisplayBoxStatus] = useState('display-box-open');
	const [learnBoxStatus, setLearnBoxStatus] = useState('learn-box-open');
	 
	// =============== classes
	const [displayBoxClass, setDisplayBoxClass] = useState('display-box-open');
	const [displayBoxTransitionClass, setDisplayBoxTransitionClass] = useState('');
	// const [contentContainerClass, setContentContainerClass] = useState('content-container-open');
	// const [contentContainerScrollClass, setContentContainerScrollClass] = useState('scroll-auto');

	// =============== props
	const buttons = [
		<RefreshButton onClick={onRefreshClick}/>,
		<GridButton handleClick={onGridClick} showGrid={showGrid}/>
	];	 

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

	// =========================== Click Handlers =========================== //
	function onOpenCloseToggleClick() {
		setLearnBoxIsOpen(oldVal => !oldVal)
	}

	function onRefreshClick() {
		// if(hasBeenResized('display-box') && !isAnimating) setResizeDisplayBox(true)
	}

	function onGridClick() {
		setShowGrid(oldVal => !oldVal)
	} 

	// =========================== Event Handlers =========================== //
	function handleDisplayBoxResize() {
		removeInlineStyle('display-box') 
		// setContentContainerClass('content-container-resize')
		
		// setDisplayBoxClass('display-box-resize') 
	}

	function resetAfterDisplayBoxResize() {
		// setContentContainerClass('content-container-open')
		// setDisplayBoxClass('') 
	}

	// ============= Input
	function handleCodeInput() {
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
	}

	// =========================== Detect Changes =========================== //
	// =========== display box resize
	useEffect(() => { 
		detectTransition('display-box', 'height', setDisplayBoxIsResizing)
	}, [])

	// =========================== Trigger Changes =========================== //
	// open / close display box
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') {
			setDisplayBoxIsOpen(true)
		} 

		if(learnBoxStatus === 'learn-box-closed') {
			setDisplayBoxIsOpen(false)
		}
	}, [learnBoxStatus])

	// resize display box to 100%
	useEffect(() => {
		// if(learnBoxIsOpen) resetAfterDisplayBoxResize()
		if(!learnBoxIsOpen) handleDisplayBoxResize()
	}, [learnBoxIsOpen])

	// =========================== Trigger Handlers =========================== //
	// =========== display resize
	// useEffect(() => {
	// 	if(resizeDisplayBox) {
	// 		handleDisplayBoxResize()
	// 	} else { 
	// 		resetAfterDisplayBoxResize()
	// 	}
	// }, [resizeDisplayBox])

	// =========== code change
	useEffect(() => {  
  	handleCodeInput(htmlString, cssString)
  }, [htmlString, cssString]) 

  // =========================== Set Status  =========================== //
  // display box status - opening / closing
  useEffect(() => {
  	let newStatus;

  	if(displayBoxIsOpen) {
			newStatus = 'display-box-opening';
		}

  	if(!displayBoxIsOpen) {
			newStatus = 'display-box-closing';
		}

 		newStatus && setDisplayBoxStatus(newStatus)
  }, [displayBoxIsOpen])

  // display box status - open closed
   useEffect(() => {
  	let newStatus;
  	
  	if(!displayBoxIsResizing && !displayBoxIsOpen) {
			newStatus = 'display-box-closed';
		}

  	if(!displayBoxIsResizing && displayBoxIsOpen) {
			newStatus = 'display-box-open';
		}

 		newStatus && setDisplayBoxStatus(newStatus)
  }, [displayBoxIsResizing])

  // display box status - open / closed
 //  useEffect(() => {
 //  	if(displayBoxIsResizing) return

 //  	console.log('update status ==================')
 //  	console.log('displayBoxIsOpen', displayBoxIsOpen)
 //  	console.log('displayBoxStatus', displayBoxStatus) 
	// 	let newStatus;



	// 	// if(displayBoxIsOpen 
	// 	// && !displayBoxIsResizing
	// 	// && displayBoxStatus === 'display-box-opening') {
	// 	// 	newStatus ='display-box-open';
	// 	// }

	// 	// if(displayBoxIsOpen 
	// 	// && !displayBoxIsResizing
	// 	// && displayBoxStatus === 'display-box-closed') {
	// 	// 	newStatus = 'display-box-opening';
	// 	// }

	// 	if(!displayBoxIsOpen 
	// 		&& displayBoxStatus === 'display-box-closing') {
	// 		newStatus = 'display-box-closed';
	// 	}

	// 	if(!displayBoxIsOpen
	// 		&& displayBoxStatus === 'display-box-open') {
	// 		newStatus = 'display-box-closing';
	// 	}

	// 	console.log('newStatus', newStatus)
	// 	newStatus && setDisplayBoxStatus(newStatus)
	// }, [displayBoxIsOpen, displayBoxIsResizing, displayBoxStatus])
	
	// =========================== Set Classes  =========================== //
	// =========== display box class
	useEffect(() => {
		let newClass;

		if(displayBoxStatus === 'display-box-open') {
			newClass = 'display-box-open'
		}

		if(displayBoxStatus === 'display-box-closed') {
			newClass = 'display-box-closed'
		}

		if(displayBoxStatus === 'display-box-opening') {
			newClass = 'display-box-opening'
		}

		if(displayBoxStatus === 'display-box-closing') {
			newClass = 'display-box-closing'
		}

		newClass && setDisplayBoxClass(newClass)
	}, [displayBoxStatus])

	// display box transition class
	useEffect(() => {
		let newClass;

		if(displayBoxStatus === 'display-box-open'
			|| displayBoxStatus === 'display-box-closed') {
			newClass = 'display-box-transition'
		} 

		if(displayBoxStatus === 'display-box-opening'
			|| displayBoxStatus === 'display-box-closing') {
			newClass = 'display-box-transition';
		}

		newClass && setDisplayBoxTransitionClass(newClass)
	}, [displayBoxStatus])

	

  // =========================== console.logs =========================== //
  // =================== Display box
  // displayBoxStatus
  useEffect(() => {
  	console.log('displayBoxStatus', displayBoxStatus);
  }, [displayBoxStatus])

  // displayBoxIsOpen
  // useEffect(() => {
  // 	console.log('displayBoxIsOpen', displayBoxIsOpen);
  // }, [displayBoxIsOpen])

	// displayBoxIsResizing
  // useEffect(() => {
  // 	console.log('displayBoxIsResizing', displayBoxIsResizing);
  // }, [displayBoxIsResizing])

  // displayBoxClass
  // useEffect(() => {
  // 	console.log('displayBoxClass', displayBoxClass);
  // }, [displayBoxClass])

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
		<LearnBox 
			title={title} 
			boxIsOpen={learnBoxIsOpen}
			handleOpenCloseToggleClick={onOpenCloseToggleClick}
			buttons={buttons}
			learnBoxStatus={learnBoxStatus}
			setLearnBoxStatus={setLearnBoxStatus}
		>
			<div className={`display-box ${displayBoxTransitionClass} ${displayBoxClass}`} id="display-box">
			</div> 
		</LearnBox>
	)
}	

{/*<LearnBox title={title} 
	i={i} 
	isAnimating={isAnimating} 
	setIsAnimating={setIsAnimating} 
	buttons={buttons} 
	learnBoxStatus={learnBoxStatus} 
	setLearnBoxStatus={setLearnBoxStatus}
	contentContainerClass={contentContainerClass}
	setContentContainerClass={setContentContainerClass}>
	<div className={`display-box ${displayBoxClass}`} id="display-box">
		<GridOverlay showGrid={showGrid}/>
		<iframe srcdoc={source} className="iframe"/> 
	</div> 
</LearnBox> */}

// =========== handle learn box open / close
	// useEffect(() => { 
	// 	const overflow = elementIsOverflowing('content-container');

	// 	if(learnBoxStatus === 'learn-box-closing') {
	// 		if(overflow) {  
	// 			setDisplayBoxClass(`display-box-parent-closing-overflow`)
	// 			removeInlineStyle('display-box') 
	// 			setHasRemovedInlineStyle(true)
	// 		} else {
	// 			setDisplayBoxClass(`display-box-parent-closing`)
	// 			setHasRemovedInlineStyle(false)
	// 		} 
	// 	} else if(learnBoxStatus === 'learn-box-opening') {
	// 		if(hasRemovedInlineStyle) {
	// 			restoreInlineStyle('display-box')
	// 			setHasRemovedInlineStyle(false)
	// 		}
	// 		setDisplayBoxClass('display-box-parent-opening')
	// 	} else if(learnBoxStatus === 'learn-box-open') {
	// 		setDisplayBoxClass('display-box-parent-open')
	// 	}  else if(learnBoxStatus === 'learn-box-closed') { 
	// 		setDisplayBoxClass('display-box-parent-closed')
	// 	} 
	// }, [learnBoxStatus]) 