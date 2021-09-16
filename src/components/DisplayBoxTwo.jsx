import React, {useState, useEffect} from 'react'; 
import LearnBoxTwo from './parts/LearnBoxTwo.jsx';
import RefreshButton from './parts/RefreshButton.jsx';
import GridButton from './parts/GridButton.jsx';
import GridOverlay from './parts/GridOverlay.jsx';

export default function DisplayBoxTwo({title, htmlString, cssString, i}) {
	// ================ State ========================= //
	const [gridStatus, setGridStatus] = useState('');
	const [showGrid, setShowGrid] = useState(false); 
	const [source, setSource] = useState(null);
	const [displayBoxResizeStatus, setDisplayBoxResizeStatus] = useState('');
	const [displayBoxRefreshClass, setDisplayBoxRefreshClass] = useState('');
	const [numTransitionStarts, setNumTransitionStarts] = useState(0);
	const [numTransitionEnds, setNumTransitionEnds] = useState(0);
	const [learnBoxStatus, setLearnBoxStatus] = useState('learn-box-open');

	// ================ Buttons ===================== //
	const buttons = [
		<RefreshButton onClick={onRefreshClick}/>,
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
		if(learnBoxStatus === 'learn-box-open' && userHasChangedSize('display-box')) {
		 setDisplayBoxResizeStatus('display-box-resizing')
		}
	}

	// ================ Event Handlers ===================== //
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

	function userHasChangedSize(id) {
		const element = document.getElementById(id); 

		return !(element.style.width === '' && element.style.height === '');
	}

	function removeInlineSize(id) { 
		const element = document.getElementById(id);  
		element.style.width = '';
		element.style.height = ''; 
	}

	// ============== Trigger Event Handlers ==================== // 
	// ======== Refresh //
	useEffect(() => {
		if(displayBoxResizeStatus === 'display-box-resizing') onRefreshStart()
		return () => { onRefreshEnd() } 
	}, [displayBoxResizeStatus])

	// ======== Code Input //
	useEffect(() => {  
  	onCodeChange(htmlString, cssString)
  }, [htmlString, cssString]) 

  // ============== Set Status ==================== // 
	useEffect(() => {
		if(displayBoxResizeStatus === 'display-box-resizing' 
			&& numTransitionStarts > 0
			&& numTransitionStarts === numTransitionEnds) {
			setDisplayBoxResizeStatus('display-box-resize-finished')
		}
	}, [numTransitionStarts, numTransitionEnds, displayBoxResizeStatus])

	// ============== Output ============================== //
	return (
		<LearnBoxTwo 
			title={title} 
			i={i}
			buttons={buttons} 
			learnBoxStatus={learnBoxStatus} 
			setLearnBoxStatus={setLearnBoxStatus}
			displayBoxResizeStatus={displayBoxResizeStatus}
			displayBoxRefreshClass={displayBoxRefreshClass}>
			<GridOverlay gridStatus={gridStatus} showGrid={showGrid}/>
			<iframe srcdoc={source} className="iFrame"/> 
		</LearnBoxTwo>
	)
}