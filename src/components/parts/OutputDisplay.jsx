import React, {useState, useEffect} from 'react'; 
import LearnBox from './LearnBox/LearnBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import GridButton from './Buttons/GridButton/GridButton.jsx';
import GridOverlay from './Buttons/GridButton/GridOverlay.jsx';
import './OutputDisplay.css';

export default function OutputDisplay({title, htmlString, cssString, i}) {
	/*
		Resizable box with border
		Not resizable when learn box is changing size
		Displays output of html and css string
		Updates when html or css string changed
		
		handle grid button press
		handle refresh button press
	*/

	// ================ State ========================= //
	// ====== Grid //
	const [gridStatus, setGridStatus] = useState('');
	const [showGrid, setShowGrid] = useState(false); 

	// ====== Source //
	const [source, setSource] = useState(null);

	// ====== Refresh //
	const [outputDisplayResizeStatus, setOutputDisplayResizeStatus] = useState('');
	
	// const [displayBoxRefreshClass, setDisplayBoxRefreshClass] = useState('');
	const [numTransitionStarts, setNumTransitionStarts] = useState(0);
	const [numTransitionEnds, setNumTransitionEnds] = useState(0);

	// ====== Open Close //
	const [learnBoxStatus, setLearnBoxStatus] = useState('learn-box-open');

	// ================ Class========================= //
	const [outputDisplayClass, setOutputDisplayClass] = useState('output-display-open');
	const [outputDisplayResizeClass, setOutputDisplayResizeClass] = useState('');

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
		console.log('click refresh')
		if(learnBoxStatus === 'learn-box-open' && userHasChangedSize('output-display')) {
		 setOutputDisplayResizeStatus('output-display-resizing')
		}
	}

	// ================ Event Handlers ===================== //
	function onRefreshStart() { 
		addRefreshListeners()
		setOutputDisplayResizeClass('output-display-refresh') 
		removeInlineSize('output-display') 
	}

	function onRefreshEnd() { 
		removeRefreshListeners()
		setNumTransitionStarts(0)
		setNumTransitionEnds(0)
		setOutputDisplayResizeClass('') 
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
			&& e.srcElement.id === 'output-display'
			&& outputDisplayResizeStatus === 'output-display-resizing') {
			setNumTransitionStarts(oldVal => oldVal + 1)
		}
	}

	function handleTransitionStartHeight(e) {
		if(e.propertyName === 'height' 
			&& e.srcElement.id === 'output-display'
			&& outputDisplayResizeStatus === 'output-display-resizing') {
			setNumTransitionStarts(oldVal => oldVal + 1)
		}
	}

	function handleTransitionEndWidth(e) {
		if(e.propertyName === 'width' 
			&& e.srcElement.id === 'output-display'
			&& outputDisplayResizeStatus === 'output-display-resizing') {
			setNumTransitionEnds(oldVal => oldVal + 1)
		}
	}

	function handleTransitionEndHeight(e) {
		if(e.propertyName === 'height' 
			&& e.srcElement.id === 'output-display'
			&& outputDisplayResizeStatus === 'output-display-resizing') {
			setNumTransitionEnds(oldVal => oldVal + 1)
		}
	}

	function addRefreshListeners() {
		const outputDisplayElement = document.getElementById('output-display');
		 
		outputDisplayElement.addEventListener('transitionstart', handleTransitionStartWidth)
		outputDisplayElement.addEventListener('transitionstart', handleTransitionStartHeight)

		outputDisplayElement.addEventListener('transitionend', handleTransitionEndWidth)
		outputDisplayElement.addEventListener('transitionend', handleTransitionEndHeight)
	}

	function removeRefreshListeners() { 
		const outputDisplayElement = document.getElementById('output-display');
		
		outputDisplayElement.removeEventListener('transitionstart', handleTransitionStartWidth)
		outputDisplayElement.removeEventListener('transitionstart', handleTransitionStartHeight)

		outputDisplayElement.removeEventListener('transitionend', handleTransitionEndWidth)
		outputDisplayElement.removeEventListener('transitionend', handleTransitionEndHeight)
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
		if(outputDisplayResizeStatus === 'output-display-resizing') onRefreshStart()
		return () => { onRefreshEnd() } 
	}, [outputDisplayResizeStatus])

	// ======== Code Input //
	useEffect(() => {  
  	onCodeChange(htmlString, cssString)
  }, [htmlString, cssString]) 

  // ============== Set Status ==================== // 
	useEffect(() => {
		if(outputDisplayResizeStatus === 'output-display-resizing' 
			&& numTransitionStarts > 0
			&& numTransitionStarts === numTransitionEnds) {
			setOutputDisplayResizeStatus('output-display-resize-finished')
		}
	}, [numTransitionStarts, numTransitionEnds, outputDisplayResizeStatus])

  // ============== Set Class ==================== // 
  useEffect(() => {
  	if(learnBoxStatus === 'learn-box-open') setOutputDisplayClass('output-display-open')
  	else setOutputDisplayClass('')
  }, [learnBoxStatus])

	// ============== Output ============================== //
	return ( 
		<div>
			{buttons.map((button) => <div className="button"> {button} </div>)}
			
			<div className="container"> 
				<div className={`output-display ${outputDisplayClass} ${outputDisplayResizeClass}`} id="output-display">
					<GridOverlay gridStatus={gridStatus} showGrid={showGrid}/>
					<iframe srcDoc={source} className="iFrame"/> 
				</div> 
			</div> 
		</div>
	)
}
/*
<LearnBox 
			title={title} 
			i={i}
			buttons={buttons} 
			learnBoxStatus={learnBoxStatus} 
			setLearnBoxStatus={setLearnBoxStatus}
			displayBoxResizeStatus={displayBoxResizeStatus}
			displayBoxRefreshClass={displayBoxRefreshClass}>
</LearnBox>*/