import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import RefreshButton from './parts/RefreshButton.jsx';
import GridButton from './parts/GridButton.jsx'; 
import GridOverlay from './parts/GridOverlay.jsx';
import './DisplayBox.css';

export default function DisplayBox({title, htmlString, cssString, i = Math.random()}) {    
	const thisId = `open-close-box_${i}`;
  const [source, setSource] = useState(null);
 //  const [iframeContainerClass, setIframeContainerClass] = useState('iframe-container'); 
  const [hideDisplay, setHideDisplay] = useState(false);
  const [displaySizeClass, setDisplaySizeClass] = useState('display-open');

  // Refresh
 //  const handleRefresh = function() {
 //  	const iframeElement = document.getElementById('iframe-container');
 //  	iframeElement.style = "";

	// 	setIframeContainerClass('iframe-container iframe-container-big'); 

	// 	setTimeout(() => {
	// 		setIframeContainerClass('iframe-container');
	// 	}, 500); 
	// }

	// grid
	const [showGrid, setShowGrid] = useState(false);

	function handleGridClick() { 
  	setShowGrid(oldVal => !oldVal);
  }
 	
 	// handle updates from code boxes
  useEffect(() => {  
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
  }, [htmlString, cssString]) 

  // detect time to change size
	useEffect(() => {
		const openCloseBoxElement = document.getElementById(thisId);
		openCloseBoxElement.addEventListener('transitionstart', (e) => {
			if(e.propertyName === 'transform') {
				setHideDisplay(oldVal => !oldVal);
			}
		})
	}, [])

	// hide / show display
	useEffect(() => {
		if(hideDisplay) {
			setDisplaySizeClass('display-closed');
		} else {
			setDisplaySizeClass('display-open');
		}
	}, [hideDisplay])
   
	return (
		<OpenCloseBox
			title={title}
			id={thisId} 
		>	
			<div className={`display-box-background `}>
				<div className={`display-box ${displaySizeClass}`} id="iframe-container">
					<GridOverlay showGrid={showGrid}/>
					<iframe srcdoc={source} className="iframe"/> 
				</div>
			</div>
		</OpenCloseBox>
	) 
} 

{/*button_1={<RefreshButton onClick={handleRefresh}/>} 
			button_2={<GridButton handleClick={handleGridClick} selected={showGrid}/>}*/}