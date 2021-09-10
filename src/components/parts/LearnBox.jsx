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
import {detectTransition, detectTransitions} from './../utils.js';
import './LearnBox.css';

export default function LearnBox({buttons, title, i, isAnimating, setIsAnimating, children}) {
	const learnBoxId = `learn-box-${i}`;
	const contentContainerId = `content-container-${i}`;

	const [learnBoxIsOpen, setLearnBoxIsOpen] = useState(true);
	const [learnBoxIsAnimating, setLearnBoxIsAnimating] = useState(false);

	const [contentContainerIsAnimating, setContentContainerIsAnimating] = useState(false);
	const learnBoxOpenClass = learnBoxIsOpen ? 'learn-box-open' : 'learn-box-closed';

	
	const [learnBoxStatus, setLearnBoxStatus] = useState('learn-box-open');

	
	const [contentContainerStatus, setContentContainerStatus] = useState('content-container-open');
	const [contentContainerClass, setContentContainerClass] = useState('content-container-open');
	/* 
	const [learnBoxClass, setLearnBoxClass] = useState('learn-box-open');
	*/
	
 	const [openCloseToggleIsOpen, setOpenCloseToggleIsOpen] = useState(false);

 	function handleOpenCloseToggleClick() {
		setLearnBoxIsOpen(oldVal => !oldVal)
	}  

	// detect transitions
	useEffect(() => {
		detectTransition(learnBoxId, 'width', setLearnBoxIsAnimating)
		detectTransition(contentContainerId, 'height', setContentContainerIsAnimating)
	}, [])

	// ======================== Set Status ======================== //
	// =========== set status learn box 
	useEffect(() => { 
		let newStatus;

		if(learnBoxIsAnimating) {
			newStatus = learnBoxIsOpen ? 'learn-box-opening' : 'learn-box-closing'; 
		} else {
			newStatus = learnBoxIsOpen ? 'learn-box-open' : 'learn-box-closed'; 
		}

		newStatus && setLearnBoxStatus(newStatus)
	}, [learnBoxIsAnimating])

	// =========== set status content container
	useEffect(() => {
		let newStatus;

		if(contentContainerIsAnimating) {
			if(learnBoxStatus === 'learn-box-open') {
				newStatus = 'content-container-opening';
			} 

			if(learnBoxStatus === 'learn-box-closed') {
				newStatus = 'content-container-closing';
			}
		} else {
			if(learnBoxStatus === 'learn-box-open' 
				&& contentContainerStatus === 'content-container-opening') {
				newStatus = 'content-container-open';
			} 

			if(learnBoxStatus === 'learn-box-closed' 
				&& contentContainerStatus === 'content-container-closing') {
				newStatus = 'content-container-closed';
			}
		}

		newStatus && setContentContainerStatus(newStatus)
	}, [contentContainerIsAnimating, learnBoxStatus, contentContainerStatus])

	// set open-close-toggle open / closed
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') {
			setOpenCloseToggleIsOpen(false)
		} else if(learnBoxStatus === 'learn-box-closed') {
			setOpenCloseToggleIsOpen(true)
		}
	}, [learnBoxStatus])

	// set animation status
	/*useEffect(() => { 
		// close box start
		if(learnBoxStatus === 'closing') {
			setAnimationStatus('learn-box-closing')
		} 
		// close box end 
		if(learnBoxStatus === 'closed') {
			if(contentContainerIsAnimating) {
				setAnimationStatus('content-container-closing')
			} else if(!contentContainerIsAnimating && animationStatus === 'content-container-closing') {

			}
		}

		// open box start

		// open box end

		// on close
	}, [learnBoxStatus, animationStatus, learnBoxIsAnimating, contentContainerIsAnimating])*/

	/*useEffect(() => { 
		if(learnBoxIsAnimating || contentContainerIsAnimating) {
			setIsAnimating(true)
		} else if(!learnBoxIsAnimating && !contentContainerIsAnimating) {
			setIsAnimating(false)
		} 
	}, [learnBoxIsAnimating, contentContainerIsAnimating])*/

	/*useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') {
			setIsAnimating(false)
		} else if(learnBoxStatus === 'learn-box-opening') {
			setIsAnimating(true)
		} else if(learnBoxStatus === 'learn-box-closed') {
			setIsAnimating(false)
		} else if(learnBoxStatus === 'learn-box-closing') {
			setIsAnimating(true)
		}
	}, [learnBoxStatus])*/
	
	// ======================== Set Class ======================== //
	// content container open / closed
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') {
			setContentContainerClass('content-container-open')
		} else if(learnBoxStatus === 'learn-box-closed') {
			setContentContainerClass('content-container-closed')
		}
	}, [learnBoxStatus])


	// ======================== console logs ======================== //
	// useEffect(() => {
	// 	console.log('isAnimating', isAnimating)
	// }, [isAnimating])

	// useEffect(() => {
	// 	console.log('learnBoxIsAnimating', learnBoxIsAnimating)
	// }, [learnBoxIsAnimating])

	// useEffect(() => {
	// 	console.log('learnBoxStatus', learnBoxStatus)
	// }, [learnBoxStatus])

	// useEffect(() => {
	// 	console.log('contentContainerIsAnimating', contentContainerIsAnimating)
	// }, [contentContainerIsAnimating])

	useEffect(() => {
		console.log('contentContainerStatus', contentContainerStatus)
	}, [contentContainerStatus])
	
	return (
		<div className={`learn-box ${learnBoxOpenClass}`} id={learnBoxId}>
			<div className="learn-box-header">
				<div className="learn-box-buttons-container">
					{buttons && buttons.map(button => {
						return (<div className="learn-box-button">
							 {button}
						</div>)
					})}
				</div>

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
				<div className={`content-container ${contentContainerClass}`} id={contentContainerId}>
					{
						// children && children
					}
				</div>
			</div>
		</div>
	)
}
	{/**/}

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
