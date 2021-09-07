// change display box size then close

import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import RefreshButton from './parts/RefreshButton.jsx';
import GridButton from './parts/GridButton.jsx'; 
import GridOverlay from './parts/GridOverlay.jsx';
import './DisplayBox.css';

export default function DisplayBox({title, htmlString, cssString, i = Math.random()}) {    
	const thisId = `open-close-box_${i}`;
	const [source, setSource] = useState(null);

  const [hideDisplay, setHideDisplay] = useState(false);
  const [displaySizeClass, setDisplaySizeClass] = useState('display-box-open');

 	const [sizeTransition, setSizeTransition] = useState(false);
 	const [isRefresh, setIsRefresh] = useState(false);
 	const [displayTransitionClass, setDisplayTransitionClass] = useState('');
  
  const [showGrid, setShowGrid] = useState(false);

  // Refresh
  function handleRefresh() { 
  	setIsRefresh(true);
  	// const displayBoxElement = document.getElementById('display-box');
  	// displayBoxElement.style = "";

		/*setDisplaySizeClass('display-box-open'); 
		setDisplayTransitionClass('display-box-transition')

		setTimeout(() => {
			setDisplaySizeClass('');
		}, 500); */
	}

	// grid
	function handleGridClick() { 
  	setShowGrid(oldVal => !oldVal);
  }
 	
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

  // refresh - on / off
  function handleRefresh() { 
  	setIsRefresh(true);
  }

  function handleRefreshEnd(e) {
  	if((e.propertyName === 'height' || e.propertyName === 'width') && e.srcElement.id === 'display-box') {
  		setIsRefresh(false);
  	} 
  }

  useEffect(() => {
  	const openCloseBoxElement = document.getElementById(thisId);

  	if(isRefresh) {
  		openCloseBoxElement.addEventListener('transitionend', handleRefreshEnd)
  	} else {
  		openCloseBoxElement.removeEventListener('transitionend', handleRefreshEnd)
  	}
  }, [isRefresh]) 

  // handle refresh 
  useEffect(() => {
  	if(isRefresh) {
  		removeDisplayInlineStyle()
  		setDisplaySizeClass('display-box-open')
  		setDisplayTransitionClass('display-box-transition')
  	} else {
  		setDisplayTransitionClass('')
  	}
	}, [isRefresh])

	function removeDisplayInlineStyle() {
		const displayBoxElement = document.getElementById('display-box');
		displayBoxElement.style = '';
	}

  /*useEffect(() => {

  }, [isRefresh])
*/
  // detect time to shrink display
	/*useEffect(() => {
		openCloseBoxElement.addEventListener('transitionstart', (e) => {
			if(e.propertyName === 'transform' && e.srcElement.id === 'vert-line') {
				setHideDisplay(oldVal => !oldVal);
			}
		})
	}, [])*/

	// detect changing size
	// useEffect(() => {
	// 	const openCloseBoxElement = document.getElementById(thisId);
  
	// 	openCloseBoxElement.addEventListener('transitionstart', (e) => {

	// 	}) 
	// })

	// hide / show display
	/*useEffect(() => {
		console.log('hideDisplay', hideDisplay);
		if(hideDisplay) {
			setDisplaySizeClass('display-closed');
		} else {
			setDisplaySizeClass('display-open');
		}
	}, [hideDisplay])*/
   
	return (
		<OpenCloseBox
			title={title}
			id={thisId} 
			button_1={<RefreshButton onClick={handleRefresh}/>} 
		>	
			<div className={`display-box-background `}>
				<div className={`display-box ${displaySizeClass} ${displayTransitionClass}`} id="display-box">
					{/*<GridOverlay showGrid={showGrid}/>*/}
					<iframe srcdoc={source} className="iframe"/> 
				</div>
			</div>
		</OpenCloseBox>
	) 
} 

{/*
			button_2={<GridButton handleClick={handleGridClick} selected={showGrid}/>}*/}