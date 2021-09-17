// refresh button colors 

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
	const [showGrid, setShowGrid] = useState(false);
	const [source, setSource] = useState(null);
	const [savedInlineStyle, setSavedInlineStyle] = useState(null); 
 
	// =============== status
	const [isLearnBoxTranstionEnd, setIsLearnBoxTranstionEnd] = useState(false);
	const [gridStatus, setGridStatus] = useState('');
	const [displayBoxHeightTransitioning, setDisplayBoxHeightTransitioning] = useState(false);

	const [displayBoxStatus, setDisplayBoxStatus] = useState('display-box-open');
	const [learnBoxStatus, setLearnBoxStatus] = useState('learn-box-open');
	 
	// =============== classes
	const [displayBoxClass, setDisplayBoxClass] = useState('display-box-open');
	const [displayBoxRefreshClass, setDisplayBoxRefreshClass] = useState('');
	const [displayBoxOverflowClass, setDisplayBoxOverflowClass] = useState('');
	const [displayBoxResizeStatus, setDisplayBoxResizeStatus] = useState('');
	
	const [numTransitionStarts, setNumTransitionStarts] = useState(0);
	const [numTransitionEnds, setNumTransitionEnds] = useState(0);
	
	const [displayBoxHeightTransitionFinished, setDisplayBoxHeightTransitionFinished] = useState(false);

	// =============== props
	const buttons = [
		<RefreshButton onClick={onRefreshClick}/>,
		<GridButton handleClick={onGridClick} 
		gridStatus={gridStatus} 
		setGridStatus={setGridStatus}
		showGrid={showGrid}
		setShowGrid={setShowGrid}/>
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

	function userHasChangedSize(id) {
		const element = document.getElementById(id); 

		return !(element.style.width === '' && element.style.height === '');
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
		if(learnBoxStatus === 'learn-box-open' && userHasChangedSize('display-box')) setDisplayBoxResizeStatus('display-box-resizing')
	}

	function onRefreshStart() { 
		addRefreshListeners()
		setDisplayBoxRefreshClass('display-box-refresh') 
		removeInlineSize('display-box') 
	}

	function onRefreshEnd() { 
		removeRefreshListeners()
		setNumTransitionStarts(0)
		setNumTransitionEnds(0)
		setDisplayBoxRefreshClass('') 
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

	// ============== Display Box
	useEffect(() => {
		if(displayBoxStatus === 'display-box-open') onDisplayBoxOpen()
		if(displayBoxStatus === 'display-box-closed') onDisplayBoxClosed()
	}, [displayBoxStatus])

	// ============== Refresh 
	useEffect(() => {
		if(displayBoxResizeStatus === 'display-box-resizing') onRefreshStart()

		return () => { onRefreshEnd() } 
	}, [displayBoxResizeStatus])

	// ============== Code Input
	useEffect(() => {  
  	handleCodeInput(htmlString, cssString)
  }, [htmlString, cssString]) 

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
				resizeStatus={displayBoxResizeStatus}
			>	
				<div className={`display-box 
					${displayBoxClass} 
					${displayBoxOverflowClass}
					${displayBoxRefreshClass}`} id="display-box">
					<GridOverlay gridStatus={gridStatus} showGrid={showGrid}/>
					<iframe srcdoc={source} className="iframe"/> 
				</div> 
			</LearnBox>
		</div>
	)
}	 