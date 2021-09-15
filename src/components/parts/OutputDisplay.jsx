// fix - detect display box closed / open
// waiting for status = inconsistent => reformat -> rely on events not status

// open close
// fresh x
// smaller - height x width x
// bigger - height width

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
	const learnBoxId = 'learn-box';
	 
	// =============== state
	const [learnBoxIsOpen, setLearnBoxIsOpen] = useState(true); 
	// const [displayBoxIsOpen, setDisplayBoxIsOpen] = useState(true);
	const [showGrid, setShowGrid] = useState(false);
	const [source, setSource] = useState(null);
	const [savedInlineStyle, setSavedInlineStyle] = useState(null);
 
	// =============== status
	const [isLearnBoxTranstionEnd, setIsLearnBoxTranstionEnd] = useState(false);

	const [displayBoxHeightTransitioning, setDisplayBoxHeightTransitioning] = useState(false);

	const [displayBoxStatus, setDisplayBoxStatus] = useState('display-box-open');
	const [learnBoxStatus, setLearnBoxStatus] = useState('learn-box-open');
	 
	// =============== classes
	// const [displayBoxWidthClass, setDisplayBoxWidthClass] = useState('display-box-open-width');
	// const [displayBoxHeightClass, setDisplayBoxHeightClass] = useState('display-box-open-height');
	const [displayBoxClass, setDisplayBoxClass] = useState('display-box-open');
	const [displayBoxRefreshClass, setDisplayBoxRefreshClass] = useState('');
	const [displayBoxOverflowClass, setDisplayBoxOverflowClass] = useState('');
	const [displayBoxResizeStatus, setDisplayBoxResizeStatus] = useState('');
	
	const [numTransitionStarts, setNumTransitionStarts] = useState(0);
	const [numTransitionEnds, setNumTransitionEnds] = useState(0);
	
	const [displayBoxHeightTransitionFinished, setDisplayBoxHeightTransitionFinished] = useState(false);

	// const [displayBoxTransitionClass, setDisplayBoxTransitionClass] = useState('display-box-no-transition');
	// const [displayBoxResizeClass, setDisplayBoxResizeClass] = useState('');
	// const [contentContainerClass, setContentContainerClass] = useState('content-container-open');
	// const [contentContainerScrollClass, setContentContainerScrollClass] = useState('scroll-auto');

	// =============== props
	const buttons = [
		<RefreshButton onClick={onRefreshClick}/>,
		<GridButton handleClick={onGridClick} showGrid={showGrid}/>
	];	 

	// =========================== Element fns =========================== // 
	function removeInlineSize(id) { 
		const element = document.getElementById(id);  
		element.style.width = '';
		element.style.height = ''; 
	}

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

	function getOverflowClass(id) {
		const heightOverflow = elementHeightIsOverflowing(id);
		const heightOverflowClass = heightOverflow ? 'display-box-height-overflow' : '';

		const widthOverflow = elementWidthIsOverflowing(id);
		const widthOverflowClass = widthOverflow ? 'display-box-width-overflow' : '';

		if(heightOverflow && widthOverflow) {
			return heightOverflowClass + ' ' + widthOverflowClass;
		}

		if(heightOverflow) return heightOverflowClass;
		if(widthOverflow) return widthOverflowClass
		return '';
	}

	function handleTransitionStartWidth(e) {
		if(e.propertyName === 'width' 
			&& e.srcElement.id === 'display-box'
			&& displayBoxResizeStatus === 'display-box-resizing') {
			setNumTransitionStarts(oldVal => oldVal + 1)
		}
	}

	function handleTransitionStartHeight(e) {
		if(e.propertyName === 'height' 
			&& e.srcElement.id === 'display-box'
			&& displayBoxResizeStatus === 'display-box-resizing') {
			setNumTransitionStarts(oldVal => oldVal + 1)
		}
	}

	function handleTransitionEndWidth(e) {
		if(e.propertyName === 'width' 
			&& e.srcElement.id === 'display-box'
			&& displayBoxResizeStatus === 'display-box-resizing') {
			setNumTransitionEnds(oldVal => oldVal + 1)
		}
	}

	function handleTransitionEndHeight(e) {
		if(e.propertyName === 'height' 
			&& e.srcElement.id === 'display-box'
			&& displayBoxResizeStatus === 'display-box-resizing') {
			setNumTransitionEnds(oldVal => oldVal + 1)
		}
	}

	function addRefreshListeners() {
		const displayBoxElement = document.getElementById('display-box');
		 
		displayBoxElement.addEventListener('transitionstart', handleTransitionStartWidth)
		displayBoxElement.addEventListener('transitionstart', handleTransitionStartHeight)

		displayBoxElement.addEventListener('transitionend', handleTransitionEndWidth)
		displayBoxElement.addEventListener('transitionend', handleTransitionEndHeight)
	}

	function removeRefreshListeners() {
		console.log('removeRefreshListeners ==========')
		const displayBoxElement = document.getElementById('display-box');
		
		displayBoxElement.removeEventListener('transitionstart', handleTransitionStartWidth)
		displayBoxElement.removeEventListener('transitionstart', handleTransitionStartHeight)

		displayBoxElement.removeEventListener('transitionend', handleTransitionEndWidth)
		displayBoxElement.removeEventListener('transitionend', handleTransitionEndHeight)
	}

	// =========================== Event Handlers =========================== //
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

	function onOpenCloseToggleClick() {
		setLearnBoxIsOpen(oldVal => !oldVal)
	}

	function onRefreshClick() {
		if(learnBoxStatus === 'learn-box-open') setDisplayBoxResizeStatus('display-box-resizing')
	}

	function onRefreshStart() {
		console.log('onRefreshStart ============')
		setDisplayBoxRefreshClass('display-box-refresh')
		addRefreshListeners()
		removeInlineSize('display-box') 
	}

	function onRefreshEnd() {
		console.log('onRefresh end ============') 
		setDisplayBoxRefreshClass('')
		removeRefreshListeners()
		setNumTransitionStarts(0)
		setNumTransitionEnds(0)
	}

	function onGridClick() {
		setShowGrid(oldVal => !oldVal)
	} 

	function onLearnBoxClosing() {
		setDisplayBoxOverflowClass(getOverflowClass('learn-box-body'))
		setDisplayBoxClass('display-box-closing display-box-closing-x')
	}

	function onLearnBoxOpening() {
		setDisplayBoxClass('display-box-opening display-box-opening-x')
	}

	function onLearnBoxClosed() {
		setDisplayBoxClass(`display-box-closing display-box-closing-y`)
	}

	function onLearnBoxOpen() {
		setDisplayBoxClass('display-box-opening display-box-opening-y')
	}

	function onDisplayBoxOpen() {
		setDisplayBoxOverflowClass('')
		setDisplayBoxClass('display-box-open')
	}

	function onDisplayBoxClosed() {
		setDisplayBoxClass('display-box-closed')
	}
 
	// =========================== Set Status =========================== //
	// ============== Display Box
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-closed'
			&& displayBoxStatus === 'display-box-open') {
			setDisplayBoxStatus('display-box-closing')
		}

		if(learnBoxStatus === 'learn-box-open'
			&& displayBoxStatus === 'display-box-closed') {
			setDisplayBoxStatus('display-box-opening')
		}
	}, [learnBoxStatus, displayBoxStatus])

	// open close
	useEffect(() => {
		const displayBoxElement = document.getElementById('display-box')

		displayBoxElement.addEventListener('transitionstart', (e) => {
			if(e.propertyName === 'height' && e.srcElement.id === 'display-box') { 
				setDisplayBoxHeightTransitionFinished(false)
			}
		})

		displayBoxElement.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'height' && e.srcElement.id === 'display-box') { 
				setDisplayBoxHeightTransitionFinished(true)
			}
		})
	})

	useEffect(() => {
		if(displayBoxHeightTransitionFinished) {
			if(displayBoxStatus === 'display-box-closing') {
				setDisplayBoxStatus('display-box-closed')
			}

			if(displayBoxStatus === 'display-box-opening') {
				setDisplayBoxStatus('display-box-open')
			}

			setDisplayBoxHeightTransitionFinished(false)
		}
	}, [displayBoxHeightTransitionFinished, displayBoxStatus])

	// ============= refresh end
	useEffect(() => {
		console.log('numTransitionStarts', numTransitionStarts)
		console.log('numTransitionEnds', numTransitionEnds)
		if(displayBoxResizeStatus === 'display-box-resizing' 
			&& numTransitionStarts > 0
			&& numTransitionStarts === numTransitionEnds) {
			setDisplayBoxResizeStatus('display-box-resize-finished')
		}
	}, [numTransitionStarts, numTransitionEnds, displayBoxResizeStatus])


	// =========================== Trigger Handler Fns =========================== //
	// ============== Learn Box
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') onLearnBoxOpen()
		if(learnBoxStatus === 'learn-box-opening') onLearnBoxOpening()
		if(learnBoxStatus === 'learn-box-closed') onLearnBoxClosed()
		if(learnBoxStatus === 'learn-box-closing') onLearnBoxClosing()
	}, [learnBoxStatus])

	// ============== Dispalay Box
	useEffect(() => {
		if(displayBoxStatus === 'display-box-open') onDisplayBoxOpen()
		if(displayBoxStatus === 'display-box-closed') onDisplayBoxClosed()
	}, [displayBoxStatus])


	// ============== Refresh 
	useEffect(() => {
		if(displayBoxResizeStatus === 'display-box-resizing') onRefreshStart()
		if(displayBoxResizeStatus === 'display-box-resize-finished') onRefreshEnd()
	}, [displayBoxResizeStatus])

  // =========================== output =========================== //
	return (
		<div style={{width: '100%'}}>
			<LearnBox 
				title={title} 
				boxIsOpen={learnBoxIsOpen}
				handleOpenCloseToggleClick={onOpenCloseToggleClick}
				buttons={buttons}
				learnBoxStatus={learnBoxStatus}
				setLearnBoxStatus={setLearnBoxStatus}
			>	
				<div className={`display-box 
					${displayBoxClass} 
					${displayBoxOverflowClass}
					${displayBoxRefreshClass}`} id="display-box">
				}
				}
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
				{/*<p>learnBoxStatus: {learnBoxStatus}</p>
				<p>displayBoxStatus: {displayBoxStatus}</p>
				<p>displayBoxClass: {displayBoxClass}</p>
				<p>displayBoxOverflowClass: {displayBoxOverflowClass}</p>*/}
				<p>numTransitionStarts: {numTransitionStarts}</p>
				<p>numTransitionEnds: {numTransitionEnds}</p>
				 
			</div> 
		</div>
	)
}	 

// =========================== Element fns =========================== //
	/*function hasBeenResized(id, propertyNames) {
		const element = document.getElementById(id); 

		return !(element.style.width === '' && element.style.height === '');
	} */

	/**/

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
	// =========================== Detect Changes =========================== //
	// =========== display box resize
	// useEffect(() => { 
	// 	detectTransitions('display-box', ['max-height', 'min-height', 'height'], setDisplayBoxHeightTransitioning)
	// }, [])

	// =========================== Trigger Changes =========================== //
	// open / close display box
	// useEffect(() => {
	// 	if(learnBoxStatus === 'learn-box-open') {
	// 		setDisplayBoxIsOpen(true)
	// 	} 

	// 	if(learnBoxStatus === 'learn-box-closed') {
	// 		setDisplayBoxIsOpen(false)
	// 	}
	// }, [learnBoxStatus])

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
	// // }, [resizeDisplayBox])

	// // resize display box to 100%
	// useEffect(() => {
	// 	// if(learnBoxIsOpen) resetAfterDisplayBoxResize()
	// 	if(!learnBoxIsOpen) handleDisplayBoxResize()
	// }, [learnBoxIsOpen])

	// // =========== code change
	// useEffect(() => {  
 //  	handleCodeInput(htmlString, cssString)
 //  }, [htmlString, cssString]) 

  // =========================== Set Status  =========================== //
  // display box status - opening / closing
 //  useEffect(() => {
 //  	let newStatus;

 //  	if(displayBoxIsOpen) {
	// 		newStatus = 'display-box-opening';
	// 	}

 //  	if(!displayBoxIsOpen) {
	// 		newStatus = 'display-box-closing';
	// 	}

 // 		newStatus && setDisplayBoxStatus(newStatus)
 //  }, [displayBoxIsOpen])

 //  // display box status - open closed
 //   useEffect(() => { 
 //  	let newStatus;

 //  	if(!displayBoxHeightTransitioning && !displayBoxIsOpen) {
	// 		newStatus = 'display-box-closed';
	// 	}

 //  	if(!displayBoxHeightTransitioning && displayBoxIsOpen) {
	// 		newStatus = 'display-box-open';
	// 	}

 // 		newStatus && setDisplayBoxStatus(newStatus)
 //  }, [displayBoxHeightTransitioning])

 //  // learn box body overflow status -- make so must be open change to closing = don't reset if close before opened
 //  useEffect(() => {
 //  	if(!learnBoxIsOpen) {
 //  		console.log('set --------')
 //  		const widthIsOverflowing = elementWidthIsOverflowing('learn-box-body');
	// 		const heightIsOverflowing = elementHeightIsOverflowing('learn-box-body');

	// 		setLearnBoxBodyOverflowStatus({width: widthIsOverflowing, height: heightIsOverflowing})
 //  	}
 //  }, [learnBoxIsOpen])

	// // =========================== Set Classes  =========================== //
	// // =========== display box height class
	// useEffect(() => {
	// 	let baseClass;
 
	// 	if(learnBoxStatus === 'learn-box-closing'
	// 		&& displayBoxStatus === 'display-box-open') {
	// 		baseClass = 'display-box-parent-closing';
	// 	}

	// 	if(learnBoxStatus === 'learn-box-closed'
	// 		&& displayBoxStatus === 'display-box-open') {
	// 		baseClass = 'display-box-parent-closed';
	// 	}

	// 	if(learnBoxStatus === 'learn-box-closed'
	// 		&& displayBoxStatus === 'display-box-closing') {
	// 		baseClass = 'display-box-closing';
	// 	}

	// 	if(learnBoxStatus === 'learn-box-closed'
	// 		&& displayBoxStatus === 'display-box-closed') {
	// 		baseClass = 'display-box-closed';
	// 	}

	// 	if(learnBoxStatus === 'learn-box-opening'
	// 		&& displayBoxStatus === 'display-box-closed') {
	// 		baseClass = 'display-box-parent-opening';
	// 	}

	// 	if(learnBoxStatus === 'learn-box-open'
	// 		&& displayBoxStatus === 'display-box-closed') {
	// 		baseClass = 'display-box-parent-open';
	// 	}

	// 	if(learnBoxStatus === 'learn-box-open'
	// 		&& displayBoxStatus === 'display-box-opening') {
	// 		baseClass = 'display-box-opening';
	// 	}

	// 	if(learnBoxStatus === 'learn-box-open'
	// 		&& displayBoxStatus === 'display-box-open') {
	// 		baseClass = 'display-box-open';
	// 	}

	// 	// const widthOverflow = learnBoxBodyOverflowStatus.width ? '-overflow' : '';
		
		
	// 	// const widthClass = baseClass + '-width' + widthOverflow;
	// 	// 

	// 	// setDisplayBoxWidthClass(widthClass)
	//  // 

	//  const heightOverflow = learnBoxBodyOverflowStatus.height ? '-overflow' : '';
	//  const heightClass =  baseClass + '-height' + heightOverflow;

	//  setDisplayBoxHeightClass(heightClass)
	// }, [learnBoxStatus, displayBoxStatus])

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
