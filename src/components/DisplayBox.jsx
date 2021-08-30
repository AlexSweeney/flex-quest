// animate refresh
// handle input for iframe

import React, {useState, useEffect, useRef} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';  
import './DisplayBox.css';

export default function DisplayBox({title, htmlString, cssString, fade}) {    
  const [source, setSource] = useState(null);
  // const iframeStyle = '* {padding: 0; margin: 0; transition: opacity 2s; overflow: hidden;} *:hover { cursor: default; }';
  
  const defaultIframeStyle = {
  	transition: 'opacity 2s',
  	overflow: 'auto',
  	width: '100%',
  	height: '100%',
  };

  const fadeStyle = fade ? { opacity: 0 } : {};

  const handleRefresh = function() {
		const iframeElement = document.getElementById('iframe');
		iframeElement.style.width = '100%';
		iframeElement.style.height = '100%'; 
	}
  
  // useEffect(() => { 
  // 	// setSource(htmlString + `<style>${cssString} ${iframeStyle} ${fadeStyle}</style>`);
  // }, [htmlString, cssString]) 
  
	return (
		<OpenCloseBox title={title} handleRefresh={handleRefresh} background="white-background">   
			<div style={fadeStyle} className="iframe-container">
				<div className="iframe-background">
					<iframe srcdoc={source} style={defaultIframeStyle} className="iframe" id="iframe"/>
				</div>
			</div> 		
		</OpenCloseBox>
	) 
}