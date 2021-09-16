import React, {useState, useEffect} from 'react'; 
import LearnBoxTwo from './parts/LearnBoxTwo.jsx';
import GridButton from './parts/GridButton.jsx';
import GridOverlay from './parts/GridOverlay.jsx';

export default function DisplayBoxTwo({title, htmlString, cssString, i}) {
	// ================ State ========================= //
	const [gridStatus, setGridStatus] = useState('');
	const [showGrid, setShowGrid] = useState(false); 
	const [source, setSource] = useState(null);

		// ================ Buttons ===================== //
/*	<RefreshButton onClick={onRefreshClick}/>,*/

	const buttons = [
		
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

	// ================ Code Input Handler ===================== //
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

	// ============== Code Input ============================== //
	useEffect(() => {  
  	handleCodeInput(htmlString, cssString)
  }, [htmlString, cssString]) 

	// ============== Output ============================== //
	return (
		<LearnBoxTwo title={title} buttons={buttons} i={i}>
			<GridOverlay gridStatus={gridStatus} showGrid={showGrid}/>
			<iframe srcdoc={source} className="iFrame"/> 
		</LearnBoxTwo>
	)
}