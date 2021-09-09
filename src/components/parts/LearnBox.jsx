// change display box size then close 
// a smaller then close
// b bigger then close
// change size the close box

// seperate -> resize with margin ?

// import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
// import RefreshButton from './parts/RefreshButton.jsx';
// import GridButton from './parts/GridButton.jsx'; 
// import GridOverlay from './parts/GridOverlay.jsx';

import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './OpenCloseToggle/OpenCloseToggle.jsx'
import {detectTransitions} from './../utils.js';
import './LearnBox.css';

export default function LearnBox({title, i}) {
	const learnBoxId = `learn-box-${i}`;

	const [learnBoxIsOpen, setLearnBoxIsOpen] = useState(true);
	const [learnBoxIsAnimating, setLearnBoxIsAnimating] = useState(false);
	const [learnBoxStatus, setLearnBoxStatus] = useState('learn-box-open');
	const [learnBoxClass, setLearnBoxClass] = useState('learn-box-open');

	const [contentContainerClass, setContentContainerClass] = useState('content-container-open');

 	const [openCloseToggleIsOpen, setOpenCloseToggleIsOpen] = useState(false);

 	const [isAnimating, setIsAnimating] = useState(false);

 	function handleOpenCloseToggleClick() {
		setLearnBoxIsOpen(oldVal => !oldVal)
	}  

	// detect learn box animations
	useEffect(() => {
		detectTransitions(learnBoxId, 'width', setLearnBoxIsAnimating)
	}, [])

	// set class learn box
	useEffect(() => {
		let newClass = learnBoxIsOpen ? 'learn-box-open' : 'learn-box-closed';
		setLearnBoxClass(newClass)
	}, [learnBoxIsOpen])

	// set box status 
	useEffect(() => { 
		let newStatus;

		if(learnBoxIsAnimating) {
			if(learnBoxIsOpen)  newStatus = 'learn-box-opening';
			else newStatus = 'learn-box-closing';
		} else {
			if(learnBoxIsOpen && learnBoxStatus === 'learn-box-opening') newStatus =  'learn-box-open';
			else if(!learnBoxIsOpen && learnBoxStatus === 'learn-box-closing') newStatus = 'learn-box-closed';
		} 

		newStatus && setLearnBoxStatus(newStatus)
	}, [learnBoxIsAnimating, learnBoxIsOpen, learnBoxStatus])

	// set open-close-toggle open / closed
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') {
			setOpenCloseToggleIsOpen(false)
		} else if(learnBoxStatus === 'learn-box-closed') {
			setOpenCloseToggleIsOpen(true)
		}
	}, [learnBoxStatus])

	// set isAnimating
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') {
			setIsAnimating(false)
		} else if(learnBoxStatus === 'learn-box-opening') {
			setIsAnimating(true)
		} else if(learnBoxStatus === 'learn-box-closed') {
			setIsAnimating(false)
		} else if(learnBoxStatus === 'learn-box-closing') {
			setIsAnimating(true)
		}
	}, [learnBoxStatus])

	// set content container open / closed
	// set isAnimating
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') {
			setContentContainerClass('content-container-open')
		} else if(learnBoxStatus === 'learn-box-closed') {
			setContentContainerClass('content-container-closed')
		}
	}, [learnBoxStatus])
	
	return (
		<div className={`learn-box ${learnBoxClass}`} id={learnBoxId}>
			<div className="header">
				<div className="title">{title}</div>

				<div className="open-close-toggle-container">
					<OpenCloseToggle 	
						toggleIsOpen={openCloseToggleIsOpen}
						handleClick={handleOpenCloseToggleClick}
						parentIsAnimating={isAnimating}
					/>
				</div>
			</div>

			<div className="body">
				<div className={`content-container ${contentContainerClass}`}>

				</div>
			</div>
		</div>
	)
}

		{/*<OpenCloseBox
			id={openCloseBoxId}
			title={title} 
			boxIsOpen={boxIsOpen}
			handleToggleClick={handleToggleClick}
			toggleIsOpen={toggleIsOpen}
			isAnimating={isAnimating}
		>
			<div className={"display-box-background custom-scroll"}> 
				<div className={`display-box ${displayBoxHeightClass} ${displayBoxTransitionClass}`} id={displayBoxId}>
				</div>
				<div className={`display-box ${displaySizeClass} `} id="display-box">
					<GridOverlay showGrid={showGrid}/>
					<iframe srcdoc={source} className="iframe"/>  
				</div>
			</div>
		</OpenCloseBox>*/}
{/*button_1={<RefreshButton onClick={handleRefresh}/>} 
			button_2={<GridButton handleClick={handleGridClick} selected={showGrid}/>}*/}

/*export default function DisplayBox({title, htmlString, cssString, i = Math.random()}) {    
	const thisId = `open-close-box_${i}`;
	const [source, setSource] = useState(null);

  // const [hideDisplay, setHideDisplay] = useState(false);
  const [boxIsOpen, setBoxIsOpen] = useState(true);
 	const [displayContainerSizeClass, setDisplayContainerSizeClass] = useState('display-container-open')
 	const [displayContainerTransitionClass, setDisplayContainerTransitionClass] = useState('');

 	const [isRefresh, setIsRefresh] = useState(false);
 	const [displayBoxContainerStatus, setDisplayBoxContainerStatus] = useState('');
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

	

	function openContainer() {
		setDisplayContainerSizeClass('display-box-container-open')
		setDisplayContainerTransitionClass('display-box-container-transition')
	}

	function closeContainer() {
		setDisplayContainerSizeClass('display-box-container-closed')
		setDisplayContainerTransitionClass('display-box-container-transition')
	}

	function openDisplayBox() {
		setDisplaySizeClass('display-box-open')
	}

	function closeDisplayBox() {
		setDisplaySizeClass('display-box-closed')
	}

	// detect box open and close 
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

	// detect display box open and close
	useEffect(() => {
		const displayBoxElement = document.getElementById('display-box-container');

		displayBoxElement.addEventListener('transitionstart', (e) => {
			if(e.propertyName === 'height') {
				setDisplayBoxContainerStatus('started')
			}
		})

		displayBoxElement.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'height') {
				setDisplayBoxContainerStatus('finished')
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
			openContainer()
			
		} else {
			closeContainer()
			closeDisplayBox()
		}
	}, [boxIsOpen])

	useEffect(() => {
		if(displayBoxContainerStatus === 'finished' && boxIsOpen) {
			openDisplayBox() 
			setDisplayBoxContainerStatus('')
		} else if(displayBoxContainerStatus === 'finished' && !boxIsOpen) {
			closeDisplayBox()
			setDisplayBoxContainerStatus('')
		}
	}, [displayBoxContainerStatus, boxIsOpen])

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
			<div className={'display-box-background custom-scroll'}>
				<div className={`display-box-container ${displayContainerSizeClass} ${displayContainerTransitionClass}`} id='display-box-container'>
					<div className={`display-box ${displaySizeClass} ${displayTransitionClass}`} id="display-box">
						{/*<GridOverlay showGrid={showGrid}/>
						<iframe srcdoc={source} className="iframe"/> 
					</div>
				</div>
			</div>
		</OpenCloseBox>
	) 
} */

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

		// detect display box open close
	/*useEffect(() => {
		const openCloseBoxElement = document.getElementById(openCloseBoxId); 

		openCloseBoxElement.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'width') {
				setDisplayIsOpen(oldVal => !oldVal)
			}
		})
	}, [])*/

	// detect animation end
	// useEffect(() => {
	// 	detectTransitions(openCloseBoxId, 'width', setOpenCloseBoxIsAnimating)
	// 	detectTransitions(displayBoxId, 'height', setDisplayBoxIsAnimating)
	// }, [])

	/*useEffect(() => {
		if(!openCloseBoxIsAnimating && !displayBoxIsAnimating) {
			setIsAnimating(false)
		}
	}, [openCloseBoxIsAnimating, displayBoxIsAnimating])*/

	// handle box open and close
	/*useEffect(() => { 
		if(displayIsOpen) {
			setToggleIsOpen(false)
			setDisplayBoxHeightClass('display-box-open')
		} else {
			setToggleIsOpen(true)
			setDisplayBoxHeightClass('display-box-closed')
		}
	}, [displayIsOpen])*/

	// handle displaybox size change
	/*useEffect(() => {
		// on close = set max width
		if(!boxIsOpen) {
			setMaxSize(displayBoxId)
		}
		// on open = reset inline style to old value
	}, [boxIsOpen])*/

	// handle animation start and end
	/*useEffect(() => { 
		if(isAnimating) {
			setDisplayBoxTransitionClass('display-box-transition')
		} else if(!displayBoxIsAnimating && !displayBoxIsAnimating) {
			setDisplayBoxTransitionClass('')
		}
	}, [isAnimating])*/

	// const [boxIsTransitioning, setBoxIsTransitioning] = useState(false);
	 
	// const [displaySizeClass, setDisplaySizeClass] = useState('display-box-open');
	// const [displayTransitionClass, setDisplayTransitionClass] = useState('');

	// function handleToggleClick() {

	// }

	// function adjustDisplayInlineStyle() {
	// 	const displayElement = document.getElementById('display-box');

	// 	let width = displayElement.style.width;
	// 	let height = displayElement.style.height;

	// 	displayElement.style.width = '';
	// 	displayElement.style.height = '';

	// 	// displayElement.style['max-width'] = width;
	// 	// displayElement.style['max-height'] = height;
	// }

	// detect box open / close 
	// useEffect(() => {
	// 	const openCloseBoxElement = document.getElementById(openCloseBoxId);

	// 	openCloseBoxElement.addEventListener('transitionstart', (e) => {
	// 		if(e.propertyName === 'width' || e) {
	// 			setBoxIsTransitioning(true)
	// 		}
	// 	})

	// 	openCloseBoxElement.addEventListener('transitionend', (e) => {
	// 		if(e.propertyName === 'width') {
	// 			setBoxIsTransitioning(false)

	// 			const isOpen = e.srcElement.getAttribute('isopen');
				
	// 			if(isOpen === 'true') {
	// 				setBoxIsOpen(true)
	// 			} else if (isOpen === 'false') {
	// 				setBoxIsOpen(false)
	// 			}
	// 		}
	// 	})
	// }, [])

	// detect display open / close
	/*useEffect(() => {
		const displayBoxElement = document.getElementById('diplay-box');

		displayElement.addEventListener('transitionstart', (e) => {

		})

		displayElement.addEventListener('transitionend', (e) => {
			
		})
	}, [])*/
 
	// handle box open / close
	// useEffect(() => {
	// 	if(boxIsOpen) {
	// 		setDisplaySizeClass('display-box-open')
	// 	} else {
	// 		adjustDisplayInlineStyle()
	// 		setDisplaySizeClass('display-box-closed')
	// 	}
	// }, [boxIsOpen])

	/*useEffect(() => {
		if(boxIsTransitioning) {
			console.log('is trans')
			setDisplayTransitionClass('display-box-transition')
		} else if (!displayIsTransitioning){	
			console.log('is not trans')
			setDisplayTransitionClass('')
		}
	}, [boxIsTransitioning, displayIsTransitioning])*/
