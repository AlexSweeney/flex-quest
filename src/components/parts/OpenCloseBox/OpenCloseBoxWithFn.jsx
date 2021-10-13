import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './../Buttons/OpenCloseToggle/OpenCloseToggle.jsx'; 
import { triggerOnTransitionEnd } from './../../utils.js';
import './OpenCloseBox.css';

export default function OpenCloseBox({
	title = '',
	i,
	/*boxBodyId = null,
	contentContainerId = null,*/
	buttons = [],   
	handleToggleClick = () => {},
	handleOverflowHidden = () => {},
	setContentContainerStatus = () => {}, 
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
			
		* normal 
		width overflow = jerky on open
		height overflow = broken
		width + height
		try -> can promise.All to return when overflow is shrunk

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

	const [widthOverflowClosed, setWidthOverflowClosed] = useState(false);
	const [heightOverflowClosed, setHeightOverflowClosed] = useState(false);
	const [overflowIsShrinking, setOverflowIsShrinking] = useState(false);

	const [widthOverflowOnClose, setWidthOverflowOnClose] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [savedHeight, setSavedHeight] = useState(null);

	// ==================== Classes
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [contentContainerOpenClass, setContentContainerOpenClass] = useState('content-container-open');

	// ======================================== Event Handlers ========================================= //
	// ==================== Press open / close
	function onClickOpenCloseToggle() {
		console.log('click toggler')
		console.log('box is open', boxIsOpen)
		if(!isAnimating) { 
			if(boxIsOpen) onClose()
			if(!boxIsOpen) onOpen()

			handleToggleClick(!boxIsOpen, elementWidthIsOverflowing(boxBodyId), elementHeightIsOverflowing(boxBodyId))
		} 
	} 
  
	// ==================== On Close =============== //
	function onClose() {
		const isOverflowing = elementIsOverflowing(boxBodyId); 

		if(isOverflowing) onClosingOverflow()
		if(!isOverflowing) onClosedOverflow()

		saveWidthOverflowStatus(boxBodyId)
	}
	
	// ==================== Close Overflow -> then
	function onClosingOverflow() { 
		updateOverflowStatus() 
		setContentContainerOpenClass('content-container-closing-overflow') 
		closeOverflow(contentContainerId, boxBodyId)
	}
 
	function onClosedOverflow() {
		setOverflowIsShrinking(false)
		onCloseBox() 
	} 

	// ==================== Close Box -> then
	function onCloseBox() {
		setBoxIsOpen(false)
		setBoxOpenClass('box-closed')
		setContentContainerOpenClass('content-container-closing-x')
		triggerOnTransitionEnd(boxId, 'width', onBoxClosed)
	} 

	function onBoxClosed() { 
		setToggleIsOpen(true)
		onCloseContentContainer()
	}

	// ==================== Close Content Container - finished
 	function onCloseContentContainer() {
 		setContentContainerOpenClass('content-container-closing-y')
 		setIsAnimating(false)
 	} 

 	// ==================== On Open ===> =============== //
 	function onOpen() { 
 		setIsAnimating(true)
 		if(widthOverflowOnClose) onOpenBoxOverflow()
 		if(!widthOverflowOnClose) onOpenBox()
 	}

 	// ==================== Open Box =================== //
 	function onOpenBoxOverflow() {
 		setBoxOpenClass('box-open')
 		setContentContainerOpenClass('content-container-opening-x-overflow')
 		triggerOnTransitionEnd(boxId, 'width', onBoxOpen)
 	}

 	function onOpenBox() {
 		setBoxOpenClass('box-open') 
 		setContentContainerOpenClass('content-container-opening-x') 
 		triggerOnTransitionEnd(boxId, 'width', onBoxOpen)
 	}

 	function onBoxOpen() {
 		console.log('boxOpen ========================')
 		onOpenContentContainer()
 		setBoxIsOpen(true)
 	}

 	// ==================== Open ContentContainer =================== //
 	function onOpenContentContainer() {
 		setToggleIsOpen(false)
 		removeInlineSize(contentContainerId)
 		triggerOnTransitionEnd(contentContainerId, 'min-height', onContentContainerOpen)
 		setContentContainerOpenClass('content-container-opening-y')	
 	}

 	function onContentContainerOpen() {
 		setIsAnimating(false) 
 	} 

	// =============== Detect Overflow
	function elementIsOverflowing(id) { 
		return elementWidthIsOverflowing(id) || elementHeightIsOverflowing(id);
	}

	function checkForOverflow(id) {
		return [elementWidthIsOverflowing(id), elementHeightIsOverflowing(id)];
	}

	function elementWidthIsOverflowing(id) {
		const element = document.getElementById(id);  

	  return element.scrollWidth > element.clientWidth;
	}

	function elementHeightIsOverflowing(id) {
		const element = document.getElementById(id); 

	  return element.scrollHeight > element.clientHeight;
	} 

	function setOverflowStatus(parentId) {
		const [thisWidthIsOverflowing, thisHeightIsOverflowing] = checkForOverflow(parentId);
		
		setWidthOverflowClosed(!thisWidthIsOverflowing)
		setHeightOverflowClosed(!thisHeightIsOverflowing)
	}

	function saveWidthOverflowStatus(parentId) {
		const thisWidthIsOverflowing = elementWidthIsOverflowing(parentId);
		setWidthOverflowOnClose(thisWidthIsOverflowing)
	}

	// =============== Close Overflow
	function closeOverflow(id, parentId) {
		const [thisWidthIsOverflowing, thisHeightIsOverflowing] = checkForOverflow(parentId);

		if(thisWidthIsOverflowing || thisHeightIsOverflowing) setOverflowIsShrinking(true)
		if(thisWidthIsOverflowing) closeWidthOverflow(id, parentId)
		if(thisHeightIsOverflowing) closeHeightOverflow(id, parentId)  
	}

	function closeWidthOverflow(id, parentId) { 
		setWidthInPx(id)
		setToParentWidth(id, parentId)
	}

	function closeHeightOverflow(id, parentId) { 
		setHeightInPx(id)
		setToParentHeight(id, parentId)
	}  

	// =============== Listen for transition end
	function updateOverflowStatus() {
		setOverflowStatus(boxBodyId)
		updateOverflowStatusOnTransition(contentContainerId, boxBodyId)
	}

	function updateOverflowStatusOnTransition(id, parentId) {
		const [thisWidthIsOverflowing, thisHeightIsOverflowing] = checkForOverflow(parentId);

		if(thisWidthIsOverflowing) listenForWidthTransition(id) 
		if(thisHeightIsOverflowing) listenForHeightTransition(id)  
	}

	function listenForWidthTransition(id) {   
		triggerOnTransitionEnd(id, 'width', () => { setWidthOverflowClosed(true) })
	}

	function listenForHeightTransition(id) {  
		triggerOnTransitionEnd(id, 'height', () => { setHeightOverflowClosed(true)})
	} 

	// =============== Change Size
	function setWidthInPx(id) {
		const element = document.getElementById(id);
		element.style.width = element.clientWidth + 'px';
	}

	function setHeightInPx(id) {
		const element = document.getElementById(id);  
		element.style.height = element.offsetHeight + 'px';
	}

	function setToParentHeight(id, parentId) {
		const element = document.getElementById(id);
		const parentElement = document.getElementById(parentId); 

		element.style.height = window.getComputedStyle(parentElement).height;
	}

	function setToParentWidth(id, parentId) {
		const element = document.getElementById(id);
		const parentElement = document.getElementById(parentId); 
 		 
		element.style.width = window.getComputedStyle(parentElement).width;
	}

	function removeInlineWidth(id) {
		const element = document.getElementById(id);
		element.style.width = '';
	} 

	function removeInlineSize(id) {
		const element = document.getElementById(id);
		element.style.width = '';
		element.style.height = '';
	}

	// ======================================== Listen / Trigger ================================== //
	// =================== overflow closed
	useEffect(() => { 
		if(overflowIsShrinking && widthOverflowClosed && heightOverflowClosed) {
			onClosedOverflow()
		}
	}, [overflowIsShrinking, widthOverflowClosed, heightOverflowClosed])
 
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
					{children}
				</div>
			</div>
		</div>
	)
}