// animate refresh
// handle input for iframe

import React, {useState, useEffect, useRef} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';  
import './DisplayBox.css';

export default function DisplayBox({title, htmlString, cssString, fade}) {    
  const [source, setSource] = useState(null);
  // const iframeStyle = '* {padding: 0; margin: 0; transition: opacity 2s; overflow: hidden;} *:hover { cursor: default; }';

  // const fadeStyle = fade ? { opacity: 0 } : {};
  const initialIframeStyle = {
  	width: '100%',
  	height: '100%',
  }

  const handleRefresh = function() {
		const iframeElement = document.getElementById('iframe');

		iframeElement.style.opacity = 0;

		setTimeout(() => {
			iframeElement.style.opacity = 1;
			iframeElement.style.padding = 0;
			iframeElement.style.width = '100%';
			iframeElement.style.height = '100%'; 
		}, 1000); 
	}
  
  // useEffect(() => { 
  // 	// setSource(htmlString + `<style>${cssString} ${iframeStyle} ${fadeStyle}</style>`);
  // }, [htmlString, cssString])

  useEffect(() => { 
  	setSource(htmlString + `<style>body { padding: 0; margin: 0; } ${cssString}</style>`);
  }, [htmlString, cssString]) 
  
  /*useEffect(() => {
  	const iframeElement = document.getElementById('iframe');
  	iframeElement.style.padding = 0;
  }, [])*/
  
	return (
		<OpenCloseBox title={title} handleRefresh={handleRefresh} bodyClass="iframe-background"> 
			<iframe srcdoc={source} className="iframe" id="iframe"/>   
			{/*<iframe srcdoc={source} style={defaultIframeStyle} className="iframe" id="iframe"/>*/}
		</OpenCloseBox>
	) 
}