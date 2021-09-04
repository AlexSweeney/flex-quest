import React, {useState, useEffect, useRef} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import RefreshButton from './parts/RefreshButton.jsx';
import GridButton from './parts/GridButton.jsx'; 
import GridOverlay from './parts/GridOverlay.jsx';
import './DisplayBox.css';

export default function DisplayBox({title, htmlString, cssString}) {    
  const [source, setSource] = useState(null);
  const [iframeContainerClass, setIframeContainerClass] = useState('iframe-container'); 

  const handleRefresh = function() {
  	const iframeElement = document.getElementById('iframe-container');
  	iframeElement.style = "";

		setIframeContainerClass('iframe-container iframe-container-big');
 		// const iframeElement = document.getElementById('iframe-container-small');
		/*iframeElement.style.width = '200px';
		iframeElement.style.height = '200px';
		*/
		setTimeout(() => {
			setIframeContainerClass('iframe-container');
		}, 500); 
	}

	const [showGrid, setShowGrid] = useState(false);
 
  useEffect(() => {  
  	setSource(`
  		<html lang="en">
  		<head>
  			<style>
  				body { padding: 0; margin: 0; }
  				${cssString}
  			</style>
  		</head>
  		<body>${htmlString}</body>
  		</html>`);
  }, [htmlString, cssString]) 

  function handleGridClick() { 
  	setShowGrid(oldVal => !oldVal);
  }
   
	return (
		<OpenCloseBox
			title={title}
			button_1={<RefreshButton onClick={handleRefresh}/>} 
			button_2={<GridButton handleClick={handleGridClick} selected={showGrid}/>}
		>	
			<div className="display-box-background">
				<div className={iframeContainerClass} id="iframe-container">
					<GridOverlay showGrid={showGrid}/>
					<iframe srcdoc={source} className="iframe"/> 
				</div>
			</div>
		</OpenCloseBox>
	) 
} 