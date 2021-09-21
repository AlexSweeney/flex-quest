import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import GridButton from './Buttons/GridButton/GridButton.jsx';
import GridOverlay from './Buttons/GridButton/GridOverlay.jsx';
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

	// ====== Box Status //
	const [boxStatus, setBoxStatus] = useState('box-open');
	const [contentContainerStatus, setContentContainerStatus] = useState('content-container-open');

	// ====== Grid //
	const [gridStatus, setGridStatus] = useState('');
	const [showGrid, setShowGrid] = useState(false); 

	// ====== Source //
	const [source, setSource] = useState(null);

	// ====== Refresh //
	const [outputDisplayResizeStatus, setOutputDisplayResizeStatus] = useState('');
	 
	const [numTransitionStarts, setNumTransitionStarts] = useState(0);
	const [numTransitionEnds, setNumTransitionEnds] = useState(0);

	// ====== Open Close // 
	const [overflowStatus, setOverflowStatus] = useState(null);

	// ================ Class========================= //
	const [outputDisplayClass, setOutputDisplayClass] = useState('output-display-open');
	const [outputDisplayResizeClass, setOutputDisplayResizeClass] = useState('');

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
		if(boxStatus === 'box-open' && userHasChangedSize(outputDisplayId)) { 
			setOutputDisplayResizeStatus('output-display-resizing')
		}
	}

	// ================ Event Handlers ===================== //
	function onRefreshStart() {  
		addRefreshListeners()
		setOutputDisplayResizeClass('output-display-refresh') 
		removeInlineSize(outputDisplayId) 
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

	function handleTransitionStartWidth(e) {
		if(e.propertyName === 'width' 
			&& e.srcElement.id === outputDisplayId
			&& outputDisplayResizeStatus === 'output-display-resizing') {
			setNumTransitionStarts(oldVal => oldVal + 1)
		}
	}

	function handleTransitionStartHeight(e) {
		if(e.propertyName === 'height' 
			&& e.srcElement.id === outputDisplayId
			&& outputDisplayResizeStatus === 'output-display-resizing') {
			setNumTransitionStarts(oldVal => oldVal + 1)
		}
	}

	function handleTransitionEndWidth(e) {
		if(e.propertyName === 'width' 
			&& e.srcElement.id === outputDisplayId
			&& outputDisplayResizeStatus === 'output-display-resizing') {
			setNumTransitionEnds(oldVal => oldVal + 1)
		}
	}

	function handleTransitionEndHeight(e) {
		if(e.propertyName === 'height' 
			&& e.srcElement.id === outputDisplayId
			&& outputDisplayResizeStatus === 'output-display-resizing') {
			setNumTransitionEnds(oldVal => oldVal + 1)
		}
	}

	function addRefreshListeners() {
		const outputDisplayElement = document.getElementById(outputDisplayId);
		 
		outputDisplayElement.addEventListener('transitionstart', handleTransitionStartWidth)
		outputDisplayElement.addEventListener('transitionstart', handleTransitionStartHeight)

		outputDisplayElement.addEventListener('transitionend', handleTransitionEndWidth)
		outputDisplayElement.addEventListener('transitionend', handleTransitionEndHeight)
	}

	function removeRefreshListeners() { 
		const outputDisplayElement = document.getElementById(outputDisplayId);
		
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

	 // ============== Update Status on Resize end ==================== // 
	useEffect(() => {
		if(outputDisplayResizeStatus === 'output-display-resizing' 
			&& numTransitionStarts > 0
			&& numTransitionStarts === numTransitionEnds) {
			setOutputDisplayResizeStatus('output-display-resized')
		}
	}, [numTransitionStarts, numTransitionEnds, outputDisplayResizeStatus])

	// ============== Update resize status when closing from open ==================== // 
	// useEffect(() => {
	// 	if(boxStatus === 'box-closing') {
	// 		const widthIsOverflowing = elementWidthIsOverflowing('box-body');
 //  		const heightIsOverflowing = elementHeightIsOverflowing('box-body');

 //  		setOverflowStatus({'width': widthIsOverflowing, 'height': heightIsOverflowing})
	// 	}

	// 	if(boxStatus === 'box-open') {
	// 		setOverflowStatus(null)
	// 	}
	// }, [])

	// ============== Trigger Event Handlers ==================== // 
	// ======== Refresh //
	useEffect(() => {
		if(outputDisplayResizeStatus === 'output-display-resizing') onRefreshStart()
		if(outputDisplayResizeStatus === 'output-display-resized') onRefreshEnd() 
	}, [outputDisplayResizeStatus])

	// ======== Code Input //
	useEffect(() => {  
  	onCodeChange(htmlString, cssString)
  }, [htmlString, cssString]) 

  // ============== Set Class ==================== // 
  useEffect(() => {
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
			buttons={buttons} 
			setContentContainerStatus={setContentContainerStatus}
			setBoxStatus={setBoxStatus}
			resizeStatus={outputDisplayResizeStatus}> 
			<div className={`output-display ${outputDisplayClass} ${outputDisplayResizeClass}`} id={outputDisplayId}>
				<iframe srcDoc={source} className="iFrame"/> 
				<GridOverlay gridStatus={gridStatus} showGrid={showGrid}/>
			</div>  
		</OpenCloseBox>
	)
}