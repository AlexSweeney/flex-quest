import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './../Buttons/OpenCloseToggle/OpenCloseToggle.jsx'; 
import { 
	triggerOnTransitionEnd, 
	resetScrollBars, 
	getScrollPositions, 
	moveScrollBars,
	shrinkElementOverflow,  
	elementIsOverflowing,
	getParentElement,
	removeInlineSize,
	getElementHeight,
	setElementHeight,
} from '../utils.js';
import './OpenCloseBox.css';

export default function OpenCloseBox({
	title = '',
	titleId,
	i,
	buttons = [],
	handleToggleClick = () => {}, 
	handleBoxOpen = () => {},
	fade = null,
	showOverlay = false,
	bodyOverlay = null,
	children,
}) {  
	/*
		* show title   	
		* show buttons  
		* show open close toggle

		* on press open close toggle
			* Close - animate
				* close overflow ->
				* close box ->
				* close content container ->
			* Open - animate
				* open content container
				* open box
				* if width overflow show scroll bar on open box.  
				* open box to previous size  
	*/

	// ======================================== Constants ========================================= //
	// =================== Id's 
	if(!titleId) titleId = `title-id-${i}`;
	const boxId = `box-${i}`;
	const boxBodyId = `box-body-${i}`;
	const contentContainerId = `content-container-${i}`;
	const displayContainerId = `display-container-${i}`;

	// =================== State
	const [boxIsOpen, setBoxIsOpen] = useState(true);
	const [toggleIsOpen, setToggleIsOpen] = useState(false); 

	const [widthOverflowOnClose, setWidthOverflowOnClose] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [savedHeight, setSavedHeight] = useState(null);

	const [savedScrollPositions, setSavedScrollPositions] = useState(null);

	// ==================== Classes
	const [titleFadeClass, setTitleFadeClass] = useState('title-no-fade');
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [contentContainerOpenClass, setContentContainerOpenClass] = useState('content-container-open');

	// ======================================== Event Handlers ========================================= //
	// ==================== Press open / close
	function onClickOpenCloseToggle() { 
		if(!isAnimating) { 
			setIsAnimating(true) 

			if(boxIsOpen) closeBox()
			if(!boxIsOpen) openBox()

			handleToggleClick(boxIsOpen)
		} 
	} 

	function onBoxClosed() {
 		setBoxIsOpen(false)
 		setToggleIsOpen(true)
 	}
 
 	function onBoxOpen() {
 		setBoxIsOpen(true) 
 		setToggleIsOpen(false) 
 		handleBoxOpen()
 	}
 
 	function onContentContainerClosed() {
 		setIsAnimating(false)
 		removeInlineSize(contentContainerId)
 		setContentContainerOpenClass('content-container-closed')
 	}

 	function onContentContainerOpen() {
 		setIsAnimating(false)
 		removeInlineSize(contentContainerId)
 		setContentContainerOpenClass('content-container-open')
 	}

 	function onFadeStart() {
 		setTitleFadeClass('title-fade')
 	}

 	function onFadeEnd() {
 		setTitleFadeClass('title-no-fade')
 	}

 	// ==================== Close Box
	function closeBox() {   
		saveSize()
		saveScrollPositions()
		 
		moveScrollBarsToTopLeft()
			.then(closeContentContainerOverflow)
			.then(closeBoxWidth) 
			.then(closeContentContainerHeight) 
	} 

	function saveSize() {
		setSavedHeight(getElementHeight(contentContainerId))
		setWidthOverflowOnClose(elementIsOverflowing(contentContainerId, 'width'))
	}

	function saveScrollPositions() {
		const newScrollPositions = getScrollPositions(boxBodyId); 
		setSavedScrollPositions(newScrollPositions)
	}

	function moveScrollBarsToTopLeft() {
		return resetScrollBars(boxBodyId, 200);
	}

	function closeContentContainerOverflow() {
		setContentContainerOpenClass('content-container-closing-overflow')
		return shrinkElementOverflow(contentContainerId);
	}
  
 	function closeBoxWidth() {
 		return new Promise(resolve => {
	 		triggerOnTransitionEnd(boxId, 'width', () => {
	 			onBoxClosed()
	 			resolve()
	 		})

	 		setBoxOpenClass('box-closed')
	 		setContentContainerOpenClass('content-container-closing-x')
	 	}) 
 	}

 	function closeContentContainerHeight() {
 		triggerOnTransitionEnd(contentContainerId, 'height', onContentContainerClosed)

 		setContentContainerOpenClass('content-container-closing-y')
 	}

 	// ==================== Open Box
 	function openBox() {
 		openBoxWidth() 
 			.then(openContainerHeight) 
 			.then(moveScrollBarsToSavedPosition)
 	}

 	function openBoxWidth() {
 		return new Promise(resolve => {
 			triggerOnTransitionEnd(boxId, 'width', () => {
 				onBoxOpen()
 				resolve()
 			})
 
 			setContentContainerOpenClass(getContentContainerOpeningXClass())
 			setBoxOpenClass('box-open')
 		})
 	}

 	function getContentContainerOpeningXClass() {
 		return widthOverflowOnClose ? 'content-container-opening-x-overflow' : 'content-container-opening-x';
 	}

 	function openContainerHeight() { 
 		return new Promise(resolve => {
 			triggerOnTransitionEnd(contentContainerId, 'height', () => {
 				onContentContainerOpen()
 				resolve()
 			})

	 		setContentContainerOpenClass('content-container-opening-y')
	 
	 		setElementHeight(contentContainerId, savedHeight)
 		}) 
 	}

 	function moveScrollBarsToSavedPosition() {
 		moveScrollBars(boxBodyId, savedScrollPositions, 200)
 	}

 	// ======================================== Listen / Trigger ================================= //
 	useEffect(() => {
 		if(fade) onFadeStart()
 		if(!fade) onFadeEnd()
 	}, [fade])

	// ======================================== Output =========================================== //
	return (
		<div className={`box ${boxOpenClass}`} id={boxId} key={boxId}>
			<div className="box-header">
				<div className="box-buttons-container">
					{buttons.map(button => button)}
				</div>

				<div className={`title ${titleFadeClass}`} id={titleId}>{title}</div>
	
				<div className="open-close-toggle-container">
					<OpenCloseToggle 	
						handleClick={onClickOpenCloseToggle}
						toggleIsOpen={toggleIsOpen}
						i={i}
					/>
				</div>
			</div>
			<div className="body-container">
				<div className="body-overlay-container">
					{ bodyOverlay && bodyOverlay }
				</div> 

				<div className={`box-body`} id={boxBodyId}> 
					<div className={`content-container ${contentContainerOpenClass}`} id={contentContainerId}>	
						{children}
					</div>
				</div>
			</div>
		</div>
	)
} 