import React, {useState, useEffect, useRef} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import RefreshButton from './parts/RefreshButton.jsx';
import GridButton from './parts/GridButton.jsx'; 
import GridOverlay from './parts/GridOverlay.jsx';
import './DisplayBox.css';

export default function DisplayBox({title, htmlString, cssString}) {    
  const [source, setSource] = useState(null);
  // const defaultStyle = '.container { overflow: hidden; background: red} ';

  const handleRefresh = function() {
		const iframeElement = document.getElementById('iframe');

		iframeElement.style.opacity = 0;
		iframeElement.style.overflow = 'hidden';

		setTimeout(() => {
			iframeElement.style.opacity = 1;
			iframeElement.style.padding = 0;
			iframeElement.style.width = '100%';
			iframeElement.style.height = '100%'; 
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
				<div className="iframe-container">
					<GridOverlay showGrid={showGrid}/>
					<iframe srcdoc={source} className="iframe" id="iframe"/> 
				</div>
			</div>
		</OpenCloseBox>
	) 
} 