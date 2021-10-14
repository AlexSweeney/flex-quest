import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './../Buttons/OpenCloseToggle/OpenCloseToggle.jsx'; 
import { 
	triggerOnTransitionEnd, 
	resetScrollBars, 
	getScrollPositions, 
	moveScrollBars,
	shrinkElementOverflow, 
	getElementHeight 
} from './../../utils.js';
import './OpenCloseBox.css';

export default function OpenCloseBox({
	title = '',
	i,
	/*boxBodyId = null,
	contentContainerId = null,*/
	buttons = [],   
	/*handleToggleClick = () => {},*/
	/*handleOverflowHidden = () => {},
	setContentContainerStatus = () => {}, */
	children
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
		  
		tidy
		fix - reset scroll postion
			start 
			mid
			end
			
		scroll bar edge issue
		move to utils
		push 
		commit
	*/

	// ======================================== Constants ========================================= //
	// =================== Id's 
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
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [contentContainerOpenClass, setContentContainerOpenClass] = useState('content-container-open');

	// ======================================== Event Handlers ========================================= //
	// ==================== Press open / close
	function onClickOpenCloseToggle() { 
		if(!isAnimating) { 
			setIsAnimating(true) 

			if(boxIsOpen) closeBox()
			if(!boxIsOpen) openBox()

			// handleToggleClick(!boxIsOpen, elementWidthIsOverflowing(boxBodyId), elementHeightIsOverflowing(boxBodyId))
		} 
	} 

	function onBoxClosed() {
 		setBoxIsOpen(false)
 		setToggleIsOpen(true)
 	}

 	function onBoxOpen() {
 		setBoxIsOpen(true)
 		setToggleIsOpen(false)
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
		setSavedScrollPositions(getScrollPositions(boxBodyId))
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

 	// ======================================== Utils =========================================== //
 	function elementIsOverflowing(id, property) {
 		const parentElement = getParentElement(id);
 		
 		if(property === 'width') {
 			return parentElement.scrollWidth > parentElement.clientWidth;
 		}

 		if(property === 'height') {
 			return parentElement.scrollHeight > parentElement.clientHeight;
 		}
 	}
 
	function getParentElement(id) {
		const parentId = document.getElementById(id).parentElement.id;
		return document.getElementById(parentId);   
	}

	function removeInlineSize(id) {
		const element = document.getElementById(id);
		element.style.width = '';
		element.style.height = '';
	}

	function getElementHeight(id) {
		const element = document.getElementById(id);
		return window.getComputedStyle(element).height;
	}

	function setElementHeight(id, height) { 
		const element = document.getElementById(id);
		element.style.height = height;
	}
 
	// ======================================== Output =========================================== //
	return (
		<div className={`box ${boxOpenClass}`} id={boxId}>
			<div className="box-header">
				<div className="box-buttons-container">
					{buttons.map(button => button)}
				</div>

				<div className="title">{title}</div>

				<div className="open-close-toggle-container">
					<OpenCloseToggle 	
						handleClick={onClickOpenCloseToggle}
						toggleIsOpen={toggleIsOpen}
						i={i}
					/>
				</div>
			</div>

			<div className={`box-body`} id={boxBodyId}> 
				<div className={`content-container ${contentContainerOpenClass}`} id={contentContainerId}>
					 <div style={{width: '500px', height: '500px', background: 'pink'}}></div>
					
					{/*{children}*/}
				</div>
			</div>
		</div>
	)
} 