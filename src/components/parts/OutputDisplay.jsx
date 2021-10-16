import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import GridButton from './Buttons/GridButton/GridButton.jsx';
import GridOverlay from './Buttons/GridButton/GridOverlay.jsx';
import {
	elementHasInlineSize,
	removeInlineSize, 
	/*setSizeInPx,
	setToParentSize,*/
	setToContainerSize,
	transitionendPromise,
	/*onTransition, 
	elementWidthIsOverflowing, 
	elementHeightIsOverflowing, 
	
	,
	setToElementSize,*/ 
} from './../utils.js';
import './OutputDisplay.css';

export default function OutputDisplay({title, htmlString, cssString, i}) {
	/*
		* show title

		* Show output of htmlString and Css String

		* on resize 
			* show overflow

		* on close 			
			* close box animate

		* on open 
			* open to previous size

		* on press grid button
			* toggle grid on / off
		 
		* on press refresh
			* revert to original size
		  
	*/

	// ====================================== Constants ================================== //
	// ====== Ids //
	const outputDisplayId = `output-display-${i}`;
	// const boxBodyId =  `box-body-${i}`;
	// const contentContainerId = `content-container-${i}`;

	// ====== Box Status //
	// const [savedHeight, setSavedHeight] = useState(null);
	// const [savedWidth, setSavedWidth] = useState(null);
	// const [isOverflowing, setIsOverflowing] = useState(false);

	// ====== Grid //
	const [gridStatus, setGridStatus] = useState('');
	const [showGrid, setShowGrid] = useState(false); 

	// ====== Source //
	const [source, setSource] = useState(null);

	// ====== Refresh //
	// const [isResizing, setIsResizing] = useState(false);
	// const [numTransitionStarts, setNumTransitionStarts] = useState(0);
	// const [numTransitionEnds, setNumTransitionEnds] = useState(0); 

	// ================ Class========================= //
	const [outputDisplayOpenClass, setOutputDisplayOpenClass] = useState('output-display-open');
	// const [outputDisplayClass, setOutputDisplayClass] = useState('output-display-open');

	// ================ Buttons ===================== //
	const buttons = [
		<RefreshButton onClick={onRefreshClick} i={i}/>,
		<GridButton 
			handleClick={onGridClick} 
			gridStatus={gridStatus} 
			setGridStatus={setGridStatus}
			showGrid={showGrid}
			setShowGrid={setShowGrid}/>
	];	  

	// ====================================== Constants ================================== //
	function onCodeChange() {
		updateIframeSource() 
	}

	function onClickToggle(boxIsOpen) {
		if(boxIsOpen)	setOutputDisplayOpenClass('output-display-closing')
		if(!boxIsOpen) setOutputDisplayOpenClass('output-display-opening')
	}

	function onBoxOpen() { 
		setOutputDisplayOpenClass('output-display-open')
	} 

	function onGridClick() {
		setShowGrid(oldVal => !oldVal)
	} 

	function onRefreshClick() {  
		if(elementHasInlineSize(outputDisplayId)) { 
			setOutputDisplayOpenClass('output-display-resizing') 
			
			listenForRefreshEnd()
			resizeOutputDisplay()
		}
	}

	function onRefreshEnd() {
		setOutputDisplayOpenClass('output-display-open')
		removeInlineSize(outputDisplayId)
	}

		// function onBoxClosed() {
	// 	setOutputDisplayOpenClass('output-display-closed')
	// }

	// function onClickToggle(boxIsOpen, widthIsOverflowing, heightIsOverflowing) {
	// 	// if(boxIsOpen) onClickBoxOpen(widthIsOverflowing, heightIsOverflowing)
	// 	// if(!boxIsOpen) onClickBoxClosed()
	// }

	// function onClickBoxOpen() {
	// 	setOutputDisplayClass('output-display-opening')

	// 	if(isOverflowing) setToSavedSize(outputDisplayId)
	// 	addOutputDisplayListeners()
	// }

	// function onBoxOpen() {
	// 	setOutputDisplayClass('output-display-open')
	// } 

	// ================ Event Handlers ===================== //

	// function onRefreshStart() { 
	// 	addRefreshListeners()
	// 	setToElementSize(outputDisplayId, boxBodyId)
	// }

	// function onRefreshEnd() {  
	// 	setOutputDisplayClass('output-display-open')
	// 	setNumTransitionStarts(0)
	// 	setNumTransitionEnds(0) 
	// 	setIsResizing(false) 
	// }

	// function onRefreshTransitionStart() {
	// 	setNumTransitionStarts(oldVal => oldVal + 1)
	// }

	// function onRefreshTransitionEnd() {
	// 	setNumTransitionEnds(oldVal => oldVal + 1)
	// }

	
	// function onClickBoxClosed(widthIsOverflowing, heightIsOverflowing) {
	// 	const thisIsOverflowing = updateIsOverflowing(widthIsOverflowing, heightIsOverflowing)

	// 	if(thisIsOverflowing) {
	// 		// set content container size in pixels to allow animated overflow shrink
	// 		setToElementSize(contentContainerId, outputDisplayId)
	// 	}   

	// 	// use !important style to over-ride inline width and height
	// 	setOutputDisplayClass('output-display-closing')
	// }

	
	

// ====================================== Helper Fns ================================== //
	function updateIframeSource() {
		setSource(`
  		<html lang="en">
  		<head>
  			<style>
  				body { padding: 0; margin: 0; overflow: hidden; cursor: default; }
  				${cssString}
  			</style>
  		</head>
  		<body>${htmlString}</body>
  		</html>`);
	}

	function resizeOutputDisplay() { 
		setToContainerSize(outputDisplayId)
	}

	function listenForRefreshEnd() {
		const width = transitionendPromise(outputDisplayId, 'width');
		const height = transitionendPromise(outputDisplayId, 'height');
		Promise.all([width, height]).then(onRefreshEnd)
	}

	// function updateIsOverflowing(widthIsOverflowing, heightIsOverflowing) {
	// 	const thisIsOverflowing = widthIsOverflowing || heightIsOverflowing;
	// 	setIsOverflowing(thisIsOverflowing)
	// 	return thisIsOverflowing;
	// } 

	// function setToSavedSize(id) {
	// 	const element = document.getElementById(id)
		
	// 	if(savedWidth) element.style.width = savedWidth;
	// 	if(savedHeight) element.style.height = savedHeight;

	// 	resetSavedSize()
	// }

	// function resetSavedSize() {
	// 	setSavedWidth(null)
	// 	setSavedHeight(null)
	// }
 
	// function addRefreshListeners() {
	// 	const transitionStart = () => onRefreshTransitionStart();
	// 	const transitionEnd = () => onRefreshTransitionEnd();

	// 	onTransition(outputDisplayId, 'width', transitionStart, transitionEnd)
	// 	onTransition(outputDisplayId, 'height', transitionStart, transitionEnd)
	// } 

	// function addOutputDisplayListeners() {
	// 	const transitionStart = () => { };
	// 	const transitionEnd = () => { onBoxOpen() };

	// 	onTransition(contentContainerId, 'height', transitionStart, transitionEnd)
	// }

	// ====================================== Listen / Trigger ================================== //
	// useEffect(() => {
	// 	if(isResizing) {
	// 		if(numTransitionStarts === 0) {
	// 			onRefreshStart() 
	// 		}

	// 		if(numTransitionStarts > 0
	// 		&& numTransitionStarts === numTransitionEnds) {
	// 			onRefreshEnd()
	// 		}
	// 	}
	// }, [isResizing, numTransitionStarts, numTransitionEnds]) 

	// ======== Code Input //
	useEffect(() => {  
  	onCodeChange(htmlString, cssString)
  }, [htmlString, cssString]) 
 
	// ========================================= Output ========================================= //
	return ( 
		<OpenCloseBox 
			title={title} 
			i={i}
			handleToggleClick={onClickToggle}
			handleBoxOpen={onBoxOpen}
			buttons={buttons}>  
			<div className={`output-display ${outputDisplayOpenClass}`} id={outputDisplayId}>
				<iframe srcDoc={source} className="iFrame"/> 
{/*				<GridOverlay gridStatus={gridStatus} showGrid={showGrid}/>*/}
			</div>  
		</OpenCloseBox>
	)
}