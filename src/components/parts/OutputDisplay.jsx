import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import GridButton from './Buttons/GridButton/GridButton.jsx';
import GridOverlay from './Buttons/GridButton/GridOverlay.jsx';
import {
	onTransition, 
	elementWidthIsOverflowing, 
	elementHeightIsOverflowing, 
	elementHasInlineSize,
	removeInlineSize,
	setToElementSize,
} from './../utils.js';
import './OutputDisplay.css';

export default function OutputDisplay({title, htmlString, cssString, i}) {
	/*
		* Resizable display box with border
		
		* display box closes / opens when box opens and closes

		* display box not resizable when box is opening / closing
		
		* Displays output of html and css string
	
		* Updates when html or css string changed
		
		* handle grid button press
		
		* handle refresh button press  
	*/

	// tidy class adds
		/* 
				closing
				closed
				opening
				open
		*/

	// remove ids = fragile

	// close over flow height - is overflowing content container

	// fragility = refresh depends on boxBody having box-sizing: border-box
	// -> set content container size -> shrink content container back to 100%

	// ================ State ========================= //
	// ====== Ids //
	const outputDisplayId = `output-display-${i}`;
	const boxBodyId =  `box-body-${i}`;
	const contentContainerId = `content-container-${i}`;

	// ====== Box Status //
	const [savedHeight, setSavedHeight] = useState(null);
	const [savedWidth, setSavedWidth] = useState(null);
	const [isOverflowing, setIsOverflowing] = useState(false);

	// ====== Grid //
	const [gridStatus, setGridStatus] = useState('');
	const [showGrid, setShowGrid] = useState(false); 

	// ====== Source //
	const [source, setSource] = useState(null);

	// ====== Refresh //
	const [isResizing, setIsResizing] = useState(false);
	const [numTransitionStarts, setNumTransitionStarts] = useState(0);
	const [numTransitionEnds, setNumTransitionEnds] = useState(0); 

	// ================ Class========================= //
	const [outputDisplayClass, setOutputDisplayClass] = useState('output-display-open');

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

	// ================ Click Handlers ===================== //
	function onGridClick() {
		setShowGrid(oldVal => !oldVal)
	} 

	function onRefreshClick() {  
		if(elementHasInlineSize(outputDisplayId)) { 
			setOutputDisplayClass('output-display-resizing') 
			setIsResizing(true)
		}
	}

	// ================ Event Handlers ===================== //
	function onRefreshStart() { 
		addRefreshListeners()
		setToElementSize(outputDisplayId, boxBodyId)
	}

	function onRefreshEnd() {  
		setOutputDisplayClass('output-display-open')
		setNumTransitionStarts(0)
		setNumTransitionEnds(0) 
		setIsResizing(false) 
	}

	function onRefreshTransitionStart() {
		setNumTransitionStarts(oldVal => oldVal + 1)
	}

	function onRefreshTransitionEnd() {
		setNumTransitionEnds(oldVal => oldVal + 1)
	}

	function onClickToggle(boxIsOpen, widthIsOverflowing, heightIsOverflowing) {
		if(boxIsOpen) onClickBoxOpen(widthIsOverflowing, heightIsOverflowing)
		if(!boxIsOpen) onClickBoxClosed()
	}

	function onClickBoxClosed(widthIsOverflowing, heightIsOverflowing) {
		const thisIsOverflowing = updateIsOverflowing(widthIsOverflowing, heightIsOverflowing)

		if(thisIsOverflowing) {
			// set content container size in pixels to allow animated overflow shrink
			setToElementSize(contentContainerId, outputDisplayId)
		}   

		// use !important style to over-ride inline width and height
		setOutputDisplayClass('output-display-closing')
	}

	function onClickBoxOpen() {
		setOutputDisplayClass('output-display-opening')

		if(isOverflowing) setToSavedSize(outputDisplayId)
		addOutputDisplayListeners()
	}

	function onBoxOpen() {
		setOutputDisplayClass('output-display-open')
	}

	function onBoxClosed() {

	}

	function onCodeChange() {
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

	// ================ Helper Fns ===================== //
	function updateIsOverflowing(widthIsOverflowing, heightIsOverflowing) {
		const thisIsOverflowing = widthIsOverflowing || heightIsOverflowing;
		setIsOverflowing(thisIsOverflowing)
		return thisIsOverflowing;
	} 

	function setToSavedSize(id) {
		const element = document.getElementById(id)
		
		if(savedWidth) element.style.width = savedWidth;
		if(savedHeight) element.style.height = savedHeight;

		resetSavedSize()
	}

	function resetSavedSize() {
		setSavedWidth(null)
		setSavedHeight(null)
	}
 
	function addRefreshListeners() {
		const transitionStart = () => onRefreshTransitionStart();
		const transitionEnd = () => onRefreshTransitionEnd();

		onTransition(outputDisplayId, 'width', transitionStart, transitionEnd)
		onTransition(outputDisplayId, 'height', transitionStart, transitionEnd)
	} 

	function addOutputDisplayListeners() {
		const transitionStart = () => { };
		const transitionEnd = () => { onBoxOpen() };

		onTransition(contentContainerId, 'height', transitionStart, transitionEnd)
	}

	// ============== Detect Refresh Start & End =================== //
	useEffect(() => {
		if(isResizing) {
			if(numTransitionStarts === 0) {
				onRefreshStart() 
			}

			if(numTransitionStarts > 0
			&& numTransitionStarts === numTransitionEnds) {
				onRefreshEnd()
			}
		}
	}, [isResizing, numTransitionStarts, numTransitionEnds]) 

	// ======== Code Input //
	useEffect(() => {  
  	onCodeChange(htmlString, cssString)
  }, [htmlString, cssString]) 
 
  // ============== Console logs ==================== // 
  // useEffect(() => {
  // 	console.log('outputDisplayClass', outputDisplayClass)
  // }, [outputDisplayClass])

  // useEffect(() => {
  // 	console.log('overflowStatus', overflowStatus)
  // }, [overflowStatus])

	// ============== Output ============================== //
	return ( 
		<OpenCloseBox 
			title={title} 
			i={i}
			handleToggleClick={onClickToggle}
			boxBodyId={boxBodyId}
			contentContainerId={contentContainerId}
			buttons={buttons}>  
			<div className={`output-display ${outputDisplayClass}`} id={outputDisplayId}>
				<iframe srcDoc={source} className="iFrame"/> 
				<GridOverlay gridStatus={gridStatus} showGrid={showGrid}/>
			</div>  
		</OpenCloseBox>
	)
}

/* BIN


	function getElementWidth(element) {
	 
		return window.getComputedStyle(element).width;  
	}

	function getElementHeight(element) {
		
		return window.getComputedStyle(element).height;  
	}
	function resetContentContainerSize() {
		setToCurrentSize(contentContainerId)
		setToParentSize(contentContainerId) 
	}

	function resetOutputDisplaySize() {
		setToCurrentSize(outputDisplayId)
		setToParentSize(outputDisplayId) 
	}
  // ============== Set Class ==================== // 
  /*useEffect(() => {
  	if(boxStatus === 'box-open') {
  		if(contentContainerStatus === 'content-container-opening') { 
  			setOutputDisplayClass('output-display-opening-y')
  		} else if(contentContainerStatus === 'content-container-open') {
  			setOutputDisplayClass('output-display-open-y') 
  			setOverflowStatus(null)
  		} 
  	} 
  	if(boxStatus === 'box-opening') {
  		let newClass = 'output-display-opening-x';
  		const widthIsOverflowing = overflowStatus.width;
  		newClass += widthIsOverflowing ? '-width-overflow' : '';

  		setOutputDisplayClass(newClass)
  	}
  	if(boxStatus === 'box-closed') setOutputDisplayClass('output-display-closed-x')
  	if(boxStatus === 'box-closing') { 
  		if(!overflowStatus) {
  			const widthIsOverflowing = elementWidthIsOverflowing('box-body');
  			const heightIsOverflowing = elementHeightIsOverflowing('box-body');

	  		let baseClass = 'output-display-closing-x';
	  		let widthClass = 'output-display-closing-x-width';	
	  		let heightClass = 'output-display-closing-x-height';

	  		widthClass += widthIsOverflowing ? '-overflow' : '';
	  		heightClass += heightIsOverflowing ? '-overflow' : ''; 

	  		const newClass = baseClass + ' ' + widthClass + ' ' + heightClass; 
	  		setOutputDisplayClass(newClass) 
	  		setOverflowStatus({width: widthIsOverflowing, height: heightIsOverflowing})
  		}
  		
  	}
  }, [boxStatus, contentContainerStatus, overflowStatus]) 

*/