// reresh button component => pass button 1, button 2 etc.
// add grid toggle button

import React, {useState, useEffect, useRef} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import GridButton from './parts/GridButton.jsx'; 
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

	const [showGrid, setShowGrid] = useState(true);

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
	`;

	const gridStyle = `
		.grid-container {
			width: 100%;
			height: 100%;
			position: absolute;
			border: 2px solid #2196f3;
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

  useEffect(() => {  
  	const newString = grid + htmlString;
  	const newStyle = defaultStyles + gridStyle + cssString; 

  	setSource(`<style>${newStyle}</style> ${newString}`);
  }, [htmlString, cssString, showGrid]) 
   
	return (
		<OpenCloseBox title={title} button_2={<GridButton/>} handleRefresh={handleRefresh} bodyClass="display-box-background">
			<iframe srcdoc={source} className="iframe"id="iframe"/> 
		</OpenCloseBox>
	) 
}