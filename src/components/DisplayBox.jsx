import React, {useState, useEffect, useRef} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';  
import './DisplayBox.css';

export default function DisplayBox({title, htmlString, cssString}) {    
  const [source, setSource] = useState(null);
  const iframeStyle = '* {padding: 0; margin: 0;} *:hover { cursor: default; }';

  useEffect(() => { 
  	setSource(htmlString + `<style>${cssString} ${iframeStyle}</style>`);
  }, [htmlString, cssString]) 
  
	return (
		<OpenCloseBox title={title} background="white-background">    
			<iframe srcdoc={source} className="iframe"/>
		</OpenCloseBox>
	) 
}