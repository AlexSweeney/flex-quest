import React, {useState, useEffect, useRef} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import RefreshButton from './parts/RefreshButton.jsx';
import GridButton from './parts/GridButton.jsx'; 
import GridOverlay from './parts/GridOverlay.jsx';
import './DisplayBox.css';

export default function DisplayBox({title, htmlString, cssString, fade}) {    
  const [source, setSource] = useState(null);

  const handleRefresh = function() {
		const iframeElement = document.getElementById('iframe');

		iframeElement.style.opacity = 0;

		setTimeout(() => {
			iframeElement.style.opacity = 1;
			iframeElement.style.padding = 0;
			iframeElement.style.width = '100%';
			iframeElement.style.height = '100%'; 
		}, 500); 
	}

	const [showGrid, setShowGrid] = useState(false);

	const grid = `
	<div class="grid-container">
		<div class="grid-line-vert"></div>
		<div class="grid-line-vert"></div>
		<div class="grid-line-vert"></div>
		<div class="grid-line-vert"></div>
		<div class="grid-line-vert"></div>
		<div class="grid-line-vert"></div>
		<div class="grid-line-vert"></div>
		<div class="grid-line-vert"></div>
		<div class="grid-line-vert"></div>

		<div class="grid-line-horiz" style="left: 0"></div>
		<div class="grid-line-horiz" style="left: 10%"></div>
		<div class="grid-line-horiz" style="left: 20%"></div>
		<div class="grid-line-horiz" style="left: 30%"></div>
		<div class="grid-line-horiz" style="left: 40%"></div>
		<div class="grid-line-horiz" style="left: 50%"></div>
		<div class="grid-line-horiz" style="left: 60%"></div>
		<div class="grid-line-horiz" style="left: 70%"></div>
		<div class="grid-line-horiz" style="left: 80%"></div> 
	</div>`;

	const defaultStyles = `
		body { 
			padding: 0; 
			margin: 0; 
		} 

		* {
			box-sizing: border-box;
		}

		::-webkit-scrollbar {
		  height: 16px;
		  width: 16px;
		  background: #E8E4E4;
		}

		::-webkit-scrollbar-corner {
			background: #a7a7a7;
		}
		 
		::-webkit-scrollbar-thumb {
			background: #a7a7a7;  
		}

		::-webkit-scrollbar-thumb:hover { 
			background: #d6d1d1;
		} 
	`;

	const gridStyle = `
		.grid-container {
			width: 100%;
			height: 100%;
			position: absolute;
			border: 2px solid #2196f3;
			opacity: 0.5;
			transition: opacity 1s ease-in-out;
		}

		.grid-container-hide {
			opacity: 0;
		}

		.grid-line-vert {
			border-bottom: 2px solid #2196f3;
			height: 10%;
			width: 100%;
		}

		.grid-line-horiz {
			border-right: 2px solid #2196f3;
			height: 100%;
			width: 10%;
			position: absolute;
		  top: 0;
		}`;

  // useEffect(() => {  
  // 	// const newString = showGrid ? grid + htmlString : htmlString;
  // 	// const newStyle =  showGrid ? defaultStyles + gridStyle + cssString : defaultStyles + cssString ; 
  // 	const newString = showGrid ? grid + htmlString : hideGrid + htmlString;
  // 	const newStyle =  defaultStyles + gridStyle + cssString; 

  // 	setSource(`<style>${newStyle}</style> ${newString}`);
  // }, [htmlString, cssString, showGrid]) 

  function handleGridClick() { 
  	setShowGrid(oldVal => !oldVal);
  }
   
	return (
		<OpenCloseBox
			title={title}
			button_1={<RefreshButton onClick={handleRefresh}/>} 
			button_2={<GridButton handleClick={handleGridClick} selected={showGrid}/>}
			bodyClass="display-box-background"
		>	
			<div className="iframe-container">
				<GridOverlay showGrid={showGrid}/>
				<iframe className="iframe"/>
			</div>
				{/*<iframe srcdoc={source} className="iframe" id="iframe"/>  */}
			
		</OpenCloseBox>
	) 
} 