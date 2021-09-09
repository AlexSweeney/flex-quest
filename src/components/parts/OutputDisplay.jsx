import React, {useState, useEffect} from 'react'; 
import LearnBox from './LearnBox.jsx';
import './OutputDisplay.css';

export default function OutputDisplay({title, i, htmlString, cssString}) {
	const [source, setSource] = useState(null);

	// handle updates from code boxes
  useEffect(() => {  
  	setSource(`
  		<html lang="en">
  		<head>
  			<style>
  				body { padding: 0; margin: 0; overflow: hidden; }
  				${cssString}
  			</style>
  		</head>
  		<body>${htmlString}</body>
  		</html>`);
  }, [htmlString, cssString]) 

	return (
		<div className="output-display">
			<LearnBox title={title} i={i}>
				<div className="display-box-container">
					<div className={`display-box`} id="display-box">
						{/*<GridOverlay showGrid={showGrid}/>*/}
						{/*<iframe srcdoc={source} className="iframe"/>  */}
					</div>
				</div>
			</LearnBox>
		</div>
	)
}	