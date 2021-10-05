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