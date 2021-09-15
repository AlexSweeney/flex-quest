// fix - detect display box closed / open
// waiting for status = inconsistent => reformat -> rely on events not status


// refresh
// fresh -  
// bigger  -  
// smaller - 

import React, {useState, useEffect} from 'react'; 
import LearnBox from './LearnBox.jsx';
import RefreshButton from './RefreshButton.jsx';
import GridButton from './GridButton.jsx';
import GridOverlay from './GridOverlay.jsx';
import {detectTransition, detectTransitions} from './../utils.js';
import './OutputDisplay.css'; 

export default function OutputDisplay({title, i, htmlString, cssString}) {
	// =========================== Vars =========================== // 
	// =============== state
	const [learnBoxIsOpen, setLearnBoxIsOpen] = useState(true);
	const [displayBoxIsOpen, setDisplayBoxIsOpen] = useState(true);
	const [showGrid, setShowGrid] = useState(false);
	const [source, setSource] = useState(null);
	const [savedInlineStyle, setSavedInlineStyle] = useState(null);
 
	// =============== status
	// const [resizeDisplayBox, setResizeDisplayBox] = useState(false);
	const [displayBoxHeightTransitioning, setDisplayBoxHeightTransitioning] = useState(false);
	// const [hasRemovedInlineStyle, setHasRemovedInlineStyle] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const [learnBoxBodyOverflowStatus, setLearnBoxBodyOverflowStatus] = useState({width: false, height: false});
	const [displayBoxStatus, setDisplayBoxStatus] = useState('display-box-open');
	const [learnBoxStatus, setLearnBoxStatus] = useState('learn-box-open');
	 
	// =============== classes
	const [displayBoxWidthClass, setDisplayBoxWidthClass] = useState('display-box-open-width');
	const [displayBoxHeightClass, setDisplayBoxHeightClass] = useState('display-box-open-height');
	const [displayBoxTransitionClass, setDisplayBoxTransitionClass] = useState('display-box-no-transition');
	const [displayBoxResizeClass, setDisplayBoxResizeClass] = useState('');
	// const [contentContainerClass, setContentContainerClass] = useState('content-container-open');
	// const [contentContainerScrollClass, setContentContainerScrollClass] = useState('scroll-auto');

	// =============== props
	const buttons = [
		<RefreshButton onClick={onRefreshClick}/>,
		<GridButton handleClick={onGridClick} showGrid={showGrid}/>
	];	 

	// =========================== Element fns =========================== //
	/*function hasBeenResized(id, propertyNames) {
		const element = document.getElementById(id); 

		return !(element.style.width === '' && element.style.height === '');
	} */

	/*function removeInlineStyle(id) {
		// setDisplayBoxResizeClass('display-box-resize')

		const element = document.getElementById(id); 
		setSavedInlineStyle({width: element.style.width, height: element.style.height})
		element.style.width = '';
		element.style.height = ''; 
	}*/

	/*function restoreInlineStyle(id) {
		const element = document.getElementById(id);
		element.style.width = savedInlineStyle.width;
		element.style.height = savedInlineStyle.height;
		setSavedInlineStyle(null)
	}*/

	// function elementIsOverflowing(id) {
	// 	const element = document.getElementById(id);
	// 	if(!element) return;

	//   return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
	// }

	function elementWidthIsOverflowing(id) {
		const element = document.getElementById(id);
		if(!element) return;

	  return element.scrollWidth > element.clientWidth;
	}

	function elementHeightIsOverflowing(id) {
		const element = document.getElementById(id);
		if(!element) return;

	  return element.scrollHeight > element.clientHeight;
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
		// removeInlineStyle('display-box') 
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
		detectTransitions('display-box', ['max-height', 'min-height', 'height'], setDisplayBoxHeightTransitioning)
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

	// remove inline style
	/*useEffect(() => {
		if(displayBoxStatus === 'closing') {
			removeInlineStyle('display-box')
		}
	}, [displayBoxStatus])*/


	// =========================== Trigger Handlers =========================== //
	// =========== display resize
	// useEffect(() => {
	// 	if(resizeDisplayBox) {
	// 		handleDisplayBoxResize()
	// 	} else { 
	// 		resetAfterDisplayBoxResize()
	// 	}
	// }, [resizeDisplayBox])

	// resize display box to 100%
	useEffect(() => {
		// if(learnBoxIsOpen) resetAfterDisplayBoxResize()
		if(!learnBoxIsOpen) handleDisplayBoxResize()
	}, [learnBoxIsOpen])

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

  	if(!displayBoxHeightTransitioning && !displayBoxIsOpen) {
			newStatus = 'display-box-closed';
		}

  	if(!displayBoxHeightTransitioning && displayBoxIsOpen) {
			newStatus = 'display-box-open';
		}

 		newStatus && setDisplayBoxStatus(newStatus)
  }, [displayBoxHeightTransitioning])

  // learn box body overflow status -- make so must be open change to closing = don't reset if close before opened
  useEffect(() => {
  	if(!learnBoxIsOpen) {
  		console.log('set --------')
  		const widthIsOverflowing = elementWidthIsOverflowing('learn-box-body');
			const heightIsOverflowing = elementHeightIsOverflowing('learn-box-body');

			setLearnBoxBodyOverflowStatus({width: widthIsOverflowing, height: heightIsOverflowing})
  	}
  }, [learnBoxIsOpen])

	// =========================== Set Classes  =========================== //
	// =========== display box height class
	useEffect(() => {
		let baseClass;
 
		if(learnBoxStatus === 'learn-box-closing'
			&& displayBoxStatus === 'display-box-open') {
			baseClass = 'display-box-parent-closing';
		}

		if(learnBoxStatus === 'learn-box-closed'
			&& displayBoxStatus === 'display-box-open') {
			baseClass = 'display-box-parent-closed';
		}

		if(learnBoxStatus === 'learn-box-closed'
			&& displayBoxStatus === 'display-box-closing') {
			baseClass = 'display-box-closing';
		}

		if(learnBoxStatus === 'learn-box-closed'
			&& displayBoxStatus === 'display-box-closed') {
			baseClass = 'display-box-closed';
		}

		if(learnBoxStatus === 'learn-box-opening'
			&& displayBoxStatus === 'display-box-closed') {
			baseClass = 'display-box-parent-opening';
		}

		if(learnBoxStatus === 'learn-box-open'
			&& displayBoxStatus === 'display-box-closed') {
			baseClass = 'display-box-parent-open';
		}

		if(learnBoxStatus === 'learn-box-open'
			&& displayBoxStatus === 'display-box-opening') {
			baseClass = 'display-box-opening';
		}

		if(learnBoxStatus === 'learn-box-open'
			&& displayBoxStatus === 'display-box-open') {
			baseClass = 'display-box-open';
		}

		// const widthOverflow = learnBoxBodyOverflowStatus.width ? '-overflow' : '';
		
		
		// const widthClass = baseClass + '-width' + widthOverflow;
		// 

		// setDisplayBoxWidthClass(widthClass)
	 // 

	 const heightOverflow = learnBoxBodyOverflowStatus.height ? '-overflow' : '';
	 const heightClass =  baseClass + '-height' + heightOverflow;

	 setDisplayBoxHeightClass(heightClass)
	}, [learnBoxStatus, displayBoxStatus])

	// useEffect(() => {
	// 	let newClass;
	// 	let baseClass;
		
	// 	const widthOverflow = learnBoxBodyOverflowStatus.width ? '-overflow' : '';
	// 	const heightOverflow = learnBoxBodyOverflowStatus.height ? '-overflow' : '';

	// 	if(displayBoxStatus === 'display-box-open') {
	// 		baseClass = 'display-box-open'
	// 	} 

	// 	if(displayBoxStatus === 'display-box-closed') {
	// 		baseClass = 'display-box-closed'
	// 	}

	// 	if(displayBoxStatus === 'display-box-opening') {
	// 		baseClass = 'display-box-opening'
	// 	}

	// 	if(displayBoxStatus === 'display-box-closing') {
	// 		baseClass = 'display-box-closing'
	// 	}

	// 	const widthClass = baseClass + '-width' + widthOverflow;
	// 	const heightClass =  baseClass + '-height' + heightOverflow;

	// 	setDisplayBoxWidthClass(widthClass)
	// 	setDisplayBoxHeightClass(heightClass)
	// }, [displayBoxStatus, learnBoxBodyOverflowStatus])

	// =========== display box parent class  
	// useEffect(() => {
	// 	let newClass;
	// 	let baseClass;

	// 	const widthOverflow = learnBoxBodyOverflowStatus.width ? '-overflow' : '';
	// 	const heightOverflow = learnBoxBodyOverflowStatus.height ? '-overflow' : '';

	// 	if(learnBoxStatus === 'learn-box-open') {
	// 		baseClass = 'display-box-parent-open';
	// 	} 

	// 	if(learnBoxStatus === 'learn-box-closed') {
	// 		baseClass = 'display-box-parent-closed'; 
	// 	}

	// 	if(learnBoxStatus === 'learn-box-opening') {
	// 		baseClass = 'display-box-parent-opening';
	// 	}

	// 	if(learnBoxStatus === 'learn-box-closing') {
	// 		baseClass = 'display-box-parent-closing';
	// 	}

	// 	const widthClass = baseClass + '-width' + widthOverflow;
	// 	const heightClass =  baseClass + '-height' + heightOverflow;

	// 	setDisplayBoxWidthClass(widthClass)
	// 	setDisplayBoxHeightClass(heightClass)
	// }, [learnBoxStatus, learnBoxBodyOverflowStatus])

	// =========== display box transition class
	// start on click
	// useEffect(() => { 
	// 	setDisplayBoxTransitionClass('display-box-transition')
	// }, [learnBoxIsOpen])

	// end when display box opens / closes
	// useEffect(() => {
	// 	if(displayBoxStatus === 'display-box-open' 
	// 		|| displayBoxStatus === 'display-box-closed') {
	// 		setDisplayBoxTransitionClass('display-box-no-transition')
	// 	}
	// }, [displayBoxStatus])

	// useEffect(() => {
	// 	let newClass;

	// 	if(displayBoxStatus === 'display-box-open'
	// 		|| displayBoxStatus === 'display-box-closed') {
	// 		newClass = ''
	// 	} 

	// 	if(learnBoxStatus === 'display-box-opening'
	// 		|| learnBoxStatus === 'learn-box-closing') {
	// 		newClass = 'display-box-transition';
	// 	}

	// 	setDisplayBoxTransitionClass(newClass)
	// }, [learnBoxStatus, displayBoxStatus])


  // =========================== console.logs =========================== //
  // =================== Display box
  // ---- displayBoxStatus
  // useEffect(() => {
  // 	console.log('displayBoxStatus', displayBoxStatus);
  // }, [displayBoxStatus])

  // ---- displayBoxWidthClass
  // useEffect(() => {
  // 	console.log('displayBoxWidthClass', displayBoxWidthClass);
  // }, [displayBoxWidthClass])

  // ---- displayBoxWidthClass
  // useEffect(() => {
  // 	console.log('displayBoxHeightClass', displayBoxHeightClass);
  // }, [displayBoxHeightClass])

  // ---- displayBoxParentClass
  // useEffect(() => {
  // 	console.log('displayBoxParentClass', displayBoxParentClass);
  // }, [displayBoxParentClass])

  // ---- displayBoxParentClass
  // useEffect(() => {
  // 	console.log('displayBoxParentClass', displayBoxParentClass);
  // }, [displayBoxParentClass])

  // ---- displayBoxIsOpen
  // useEffect(() => {
  // 	console.log('displayBoxIsOpen', displayBoxIsOpen);
  // }, [displayBoxIsOpen])

	// displayBoxHeightTransitioning
  // useEffect(() => {
  // 	console.log('displayBoxHeightTransitioning', displayBoxHeightTransitioning);
  // }, [displayBoxHeightTransitioning])

 

  // showScrollClass
  // useEffect(() => {
  // 	console.log('showScrollClass', showScrollClass);
  // }, [showScrollClass])

  // displayBoxAnimatingClass 
  // useEffect(() => {
  // 	console.log('displayBoxAnimatingClass', displayBoxAnimatingClass);
  // }, [displayBoxAnimatingClass])

  // displayBoxHeightTransitioning
  // useEffect(() => {
  // 	console.log('displayBoxHeightTransitioning', displayBoxHeightTransitioning);
  // }, [displayBoxHeightTransitioning])

  // learnBoxStatus
  // useEffect(() => {
  // 	console.log('learnBoxStatus', learnBoxStatus);
  // }, [learnBoxStatus])
  
  // =========================== output =========================== //
	return (
		<div style={{width: '100%'}}>
			<LearnBox 
				title={title} 
				boxIsOpen={learnBoxIsOpen}
				handleOpenCloseToggleClick={onOpenCloseToggleClick}
				buttons={buttons}
			>	
				<div className={`display-box 
					${displayBoxWidthClass}
					${displayBoxHeightClass}
					${displayBoxTransitionClass} 
					${displayBoxResizeClass} 
					`} id="display-box">
				</div>
				{/*<div className={`display-box 
					${displayBoxWidthClass}
					${displayBoxHeightClass}
					${displayBoxTransitionClass} 
					${displayBoxResizeClass} 
					`} id="display-box">
				</div> */}
			</LearnBox>
			<div>
				{/*<p>displayBoxTransitionClass: {displayBoxTransitionClass}</p>
				<p>displayBoxIsOpen: {displayBoxIsOpen.toString()}</p>
				<p>displayBoxStatus: {displayBoxStatus}</p>
				<p>displayBoxHeightTransitioning: {displayBoxHeightTransitioning.toString()}</p>*/}
				{/*<p>learnBoxStatus: {learnBoxStatus}</p>
				*/}
			</div> 
		</div>
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