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
	// const [boxStatus, setBoxStatus] = useState('box-open');
	// const [contentContainerStatus, setContentContainerStatus] = useState('content-container-open');
	const [savedHeight, setSavedHeight] = useState(null);
	const [savedWidth, setSavedWidth] = useState(null);
	const [isOverflowing, setIsOverflowing] = useState(false);
	// const [outputDisplayStatus, setOutputDisplayStatus] = useState('output-display-open')

	// ====== Grid //
	const [gridStatus, setGridStatus] = useState('');
	const [showGrid, setShowGrid] = useState(false); 

	// ====== Source //
	const [source, setSource] = useState(null);

	// ====== Refresh //
	// const [outputDisplayResizeStatus, setOutputDisplayResizeStatus] = useState('');
	const [isResizing, setIsResizing] = useState(false);
	const [numTransitionStarts, setNumTransitionStarts] = useState(0);
	const [numTransitionEnds, setNumTransitionEnds] = useState(0);

	// ====== Open Close // 
	const [overflowStatus, setOverflowStatus] = useState(null);

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
		resetSize()
	}

	function onRefreshEnd() {  
		setOutputDisplayClass('output-display-open')
		setNumTransitionStarts(0)
		setNumTransitionEnds(0) 
		setIsResizing(false)
		// removeInlineSize(contentContainerId)
		// removeInlineSize(outputDisplayId)
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
		const thisIsOverflowing = widthIsOverflowing || heightIsOverflowing;
		setIsOverflowing(thisIsOverflowing)

		setOutputDisplayClass('output-display-closing')

		if(thisIsOverflowing) {
			setParentSizeToChildSize(outputDisplayId)
			removeInlineSize(outputDisplayId)
		}
	}

	function onClickBoxOpen() {
		setOutputDisplayClass('output-display-opening')

		if(isOverflowing) setToSavedSize(outputDisplayId)
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
	function setParentSizeToChildSize(id) {
		const outputElement = document.getElementById(id)
		const parentElement = outputElement.parentNode; 

		const inlineHeight = outputElement.offsetHeight && outputElement.offsetHeight + 'px';
		const inlineWidth =  outputElement.offsetWidth && outputElement.offsetWidth + 'px';

		if(inlineWidth) parentElement.style.width =  outputElement.offsetWidth + 'px';
		if(inlineHeight) parentElement.style.height = outputElement.offsetHeight + 'px';

		setSavedHeight(outputElement.offsetWidth + 'px')
		setSavedWidth(outputElement.offsetHeight + 'px')
	} 

	function setToSavedSize(id) {
		const element = document.getElementById(id)
		if(savedWidth) element.style.width = savedWidth;
		if(savedHeight) element.style.height = savedHeight;

		setSavedWidth(null)
		setSavedHeight(null)
	}
 
	function addRefreshListeners() {
		function transitionStart() {
			onRefreshTransitionStart()
		}

		function transitionEnd() {
			onRefreshTransitionEnd()
		}

		onTransition(outputDisplayId, 'width', transitionStart, transitionEnd)
		onTransition(outputDisplayId, 'height', transitionStart, transitionEnd)
	} 

	function resetSize(id) { 
		const boxBodyElement = document.getElementById(boxBodyId);
		const outputDisplayElement = document.getElementById(outputDisplayId);  

		let newWidth;
		let newHeight;

		const compStyle = window.getComputedStyle(boxBodyElement);  

		outputDisplayElement.style.height = compStyle.height;
		outputDisplayElement.style.width = compStyle.width;
	} 

	// ============== Detect Refresh End =================== //
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
  }, [boxStatus, contentContainerStatus, overflowStatus])*/

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

*/