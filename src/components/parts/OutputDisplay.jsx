import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import GridButton from './Buttons/GridButton/GridButton.jsx';
import GridOverlay from './Buttons/GridButton/GridOverlay.jsx';
import {
	elementHasInlineSize,
	removeInlineSize,  
	setToContainerSize,
	transitionendPromise, 
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

	// ====== Grid //
	const [gridStatus, setGridStatus] = useState('grid-off'); 

	// ====== Source //
	const [source, setSource] = useState(null); 

	// ================ Class========================= //
	const [outputDisplayOpenClass, setOutputDisplayOpenClass] = useState('output-display-open'); 

	// ================ Buttons ===================== //
	const buttons = [
		<RefreshButton onClick={onRefreshClick} i={i}/>,
		<GridButton  
			gridStatus={gridStatus} 
			setGridStatus={setGridStatus}/>
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
 
	// ====================================== Listen / Trigger ================================== //
	// ======== Code Change //
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
				<GridOverlay gridStatus={gridStatus}/>
			</div>  
		</OpenCloseBox>
	)
}