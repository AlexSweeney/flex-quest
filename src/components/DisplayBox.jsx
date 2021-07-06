import React, {useState, useEffect, useRef} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';  
import './DisplayBox.css';

export default function DisplayBox({title, htmlString, cssString, fade}) {    
  const [source, setSource] = useState(null);
  const iframeStyle = '* {padding: 0; margin: 0; transition: opacity 2s; } *:hover { cursor: default; }';
  const fadeStyle = fade ? { opacity: 0 } : {};
  

  useEffect(() => { 
  	setSource(htmlString + `<style>${cssString} ${iframeStyle} ${fadeStyle}</style>`);
  }, [htmlString, cssString]) 
  
	return (
		<OpenCloseBox title={title} background="white-background">   
			<div style={fadeStyle} className="iframe-container">
				<iframe srcdoc={source} className="iframe"/>
			</div> 		
		</OpenCloseBox>
	) 
}