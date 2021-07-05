import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';  

export default function DisplayBox({htmlString, cssString}) {    
  const [source, setSource] = useState(null);

  useEffect(() => { 
  	setSource(htmlString + `<style>${cssString}</style>`);
  }, [htmlString, cssString]) 

	return (
		<OpenCloseBox>    
			<iframe srcdoc={source}/>
		</OpenCloseBox>
	) 
}