// change display box size then close - use container -> so don't interfere with chaning size transiiont
// press refresh loads

import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import RefreshButton from './parts/RefreshButton.jsx';
import GridButton from './parts/GridButton.jsx'; 
import GridOverlay from './parts/GridOverlay.jsx';
import './DisplayBox.css';

export default function DisplayBox({title, htmlString, cssString, i = Math.random()}) {    
	const thisId = `open-close-box_${i}`;
	const [source, setSource] = useState(null);

  // const [hideDisplay, setHideDisplay] = useState(false);
  const [boxIsOpen, setBoxIsOpen] = useState(true);
 	const [displayContainerSizeClass, setDisplayContainerSizeClass] = useState('display-container-open')
 	const [displayContainerTransitionClass, setDisplayContainerTransitionClass] = useState('');

 	const [isRefresh, setIsRefresh] = useState(false);
 	const [displaySizeClass, setDisplaySizeClass] = useState('display-box-open');
 	const [displayTransitionClass, setDisplayTransitionClass] = useState('');
  
  const [showGrid, setShowGrid] = useState(false);

	// grid
	function handleGridClick() { 
  	setShowGrid(oldVal => !oldVal);
  }
 	
  function handleRefresh() { 
  	const displayBoxElement = document.getElementById('display-box'); 
  	
  	if(displayBoxElement.style.width !== '' || displayBoxElement.style.height !== '') {
  		setIsRefresh(true);
  	} 
  }

  function handleRefreshEnd(e) {
  	if((e.propertyName === 'height' || e.propertyName === 'width') && e.srcElement.id === 'display-box') {
  		setIsRefresh(false);
  	} 
  }

	function removeDisplayInlineStyle() {
		const displayBoxElement = document.getElementById('display-box');
		displayBoxElement.style = '';
	}

	// box open and close detect
	useEffect(() => {
		const openCloseBoxElement = document.getElementById(thisId);

		openCloseBoxElement.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'width') {
				const isOpen = e.srcElement.getAttribute('isopen')
				
				if(isOpen === 'true') {
					setBoxIsOpen(true)
				} else if (isOpen === 'false') {
					setBoxIsOpen(false)
				}
			}
		})
	}, [])

	// handle refresh 
  useEffect(() => {
  	if(isRefresh) {
  		removeDisplayInlineStyle()
  		setDisplayTransitionClass('display-box-transition')
  		setDisplaySizeClass('display-box-open')
  	} else {
  		setDisplayTransitionClass('')
  	}
	}, [isRefresh])

	// handle refresh end
	useEffect(() => {
  	const openCloseBoxElement = document.getElementById(thisId);

  	if(isRefresh) {
  		openCloseBoxElement.addEventListener('transitionend', handleRefreshEnd)
  	} else {
  		openCloseBoxElement.removeEventListener('transitionend', handleRefreshEnd)
  	}
  }, [isRefresh]) 

	// handle box open and close
	useEffect(() => {
		if(boxIsOpen) {
			setDisplayContainerTransitionClass('display-box-container-transition')
  		setDisplayContainerSizeClass('display-box-container-open')
		} else {
			setDisplayContainerSizeClass('display-box-container-closed')
			setDisplayContainerTransitionClass('display-box-container-transition')
		}
	}, [boxIsOpen])

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
		<OpenCloseBox
			title={title}
			id={thisId} 
			button_1={<RefreshButton onClick={handleRefresh}/>} 
			button_2={<GridButton handleClick={handleGridClick} selected={showGrid}/>}
		>
			<div className={`display-box-background `}>
				<div className={`display-box-container ${displayContainerSizeClass} ${displayContainerTransitionClass}`}>
					<div className={`display-box ${displaySizeClass} ${displayTransitionClass}`} id="display-box">
						<GridOverlay showGrid={showGrid}/>
						<iframe srcdoc={source} className="iframe"/> 
					</div>
				</div>
			</div>
		</OpenCloseBox>
	) 
} 

{/*
	*/}


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