import React, {useState, useEffect, useRef} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';  
import './DisplayBox.css';

export default function DisplayBox({htmlString, cssString}) {    
  const [source, setSource] = useState(null);
  const iframeStyle = '* {padding: 0; margin: 0;}';

  useEffect(() => { 
  	setSource(htmlString + `<style>${cssString} ${iframeStyle}</style>`);
  }, [htmlString, cssString]) 
  
	return (
		<OpenCloseBox>    
			<iframe srcdoc={source} id="iframe"/>
		</OpenCloseBox>
	) 
}