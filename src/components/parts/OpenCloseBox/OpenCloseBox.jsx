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

		try -> can promise.All to return when overflow is shrunk

	*/

	// ======================================== Constants ========================================= //
	// =================== Id's 
	const boxId = `box-${i}`;
	// if(!boxBodyId) boxBodyId = `box-body-${i}`;
	// if(!contentContainerId) contentContainerId = `content-container-${i}`;
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
	// =================== State Old
	// const [clickedOpen, setClickedOpen] = useState(null);
	// const [boxIsOpen, setBoxIsOpen] = useState(true);

	const [isAnimating, setIsAnimating] = useState(false);
	// const [toggleIsOpen, setToggleIsOpen] = useState(false);

	
	// const [heightOverflowOnClose, setHeightOverflowOnClose] = useState(false);
	const [savedHeight, setSavedHeight] = useState(null);

	// const [widthIsOverflowing, setWidthIsOverflowing] = useState(false);
	// const [heightIsOverflowing, setHeightIsOverflowing] = useState(false);
	// const [overflowIsShrinking, setOverflowIsShrinking] = useState(false);

	// const [boxWidthTransitionHasEnded, setBoxWidthTransitionHasEnded] = useState(false);

	// ==================== Classes
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [contentContainerOpenClass, setContentContainerOpenClass] = useState('content-container-open');

	// ======================================== Event Handlers ========================================= //
	// ==================== Press open / close
	function onClickOpenCloseToggle() {
		if(!isAnimating) { 
			setIsAnimating(true)
 
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
 		console.log('onOpen')
 		setIsAnimating(true)
 		if(widthOverflowOnClose) onOpenBoxOverflow()
 		if(!widthOverflowOnClose) onOpenBox()
 	}

 	// ==================== Open Box =================== //
 	function onOpenBoxOverflow() {
 		console.log('onOpenBoxOverflow ------------------')
 		setBoxOpenClass('box-open')
 		setContentContainerOpenClass('content-container-opening-x-overflow')
 		triggerOnTransitionEnd(boxId, 'width', onBoxOpen)
 	// 		setIsAnimating(true)
		// setBoxOpenClass('box-open')
		
		// if(widthOverflowOnClose) setContentContainerOpenClass('content-container-opening-x')
		// if(!widthOverflowOnClose) setContentContainerOpenClass('content-container-opening-x-max-width')
		// removeInlineWidth(contentContainerId)
		// addListeners(boxId, 'width', () => { setBoxWidthTransitionHasEnded(true) })
 	}

 	function onOpenBox() {
 		console.log('onOpenBox -----------------------')
 		//document.addEventListener('transitionend', (e) => { console.log('trans end', e)})
 		// triggerOnTransitionEnd(boxId, 'width', () => {console.log('trans end')})
 		setBoxOpenClass('box-open') 
 		setContentContainerOpenClass('content-container-opening-x') 
 		triggerOnTransitionEnd(boxId, 'width', onBoxOpen)
 	}

 	function onBoxOpen() {
 		console.log('boxOpen ========================')
 		onOpenContentContainer()
 	}

 	// ==================== Open ContentContainer =================== //
 	function onOpenContentContainer() {
 		removeInlineWidth(contentContainerId)
 		triggerOnTransitionEnd(contentContainerId, 'min-height', onContentContainerOpen)
 		setContentContainerOpenClass('content-container-opening-y')	
 	}

 	function onContentContainerOpen() {
 		setIsAnimating(false) 
 	}

	// function onCloseBox() {
	// 	setBoxOpenClass('box-closed')
	// 	setContentContainerOpenClass('content-container-closing-x')
	// 	triggerOnTransitionEnd(boxId, 'width', onBoxClosed)
	// }
	
	

	/*function onClickOpenCloseToggleOld() {
		if(!isAnimating) { 
			let newValue;

			if(clickedOpen === null) newValue = false;
			if(clickedOpen === false) newValue = true;
			if(clickedOpen === true) newValue = false;

			setClickedOpen(newValue) 
			handleToggleClick(newValue, elementWidthIsOverflowing(boxBodyId), elementHeightIsOverflowing(boxBodyId))
		} 
	} */
 
	


	// function onPressBoxOpening() { 
	// 	setIsAnimating(true)
	// 	setBoxOpenClass('box-open')
		
	// 	if(widthOverflowOnClose) setContentContainerOpenClass('content-container-opening-x')
	// 	if(!widthOverflowOnClose) setContentContainerOpenClass('content-container-opening-x-max-width')
	// 	removeInlineWidth(contentContainerId)
	// 	addListeners(boxId, 'width', () => { setBoxWidthTransitionHasEnded(true) })
	// }

	// function onPressBoxClosing() { 
	// 	setIsAnimating(true) 
		
	// 	if(boxIsOpen) {
	// 		const thisWidthIsOverflowing = elementWidthIsOverflowing(boxBodyId); 
	// 		setWidthOverflowOnClose(thisWidthIsOverflowing) 

	// 		const thisHeightIsOverflowing = elementHeightIsOverflowing(boxBodyId);
	// 		setHeightOverflowOnClose(thisHeightIsOverflowing) 
	  
	// 		if(thisWidthIsOverflowing || thisHeightIsOverflowing) setOverflowIsShrinking(true)
	// 		if(thisWidthIsOverflowing) closeWidthOverflow()
	// 		if(thisHeightIsOverflowing) {
	// 			saveHeight(contentContainerId)
	// 			closeHeightOverflow() 
	// 		}

	// 		if(!thisWidthIsOverflowing && !thisHeightIsOverflowing) onBoxClosing() 
	// 	}

	// 	if(!boxIsOpen) {
	// 		onBoxClosing() 
	// 	}
	// }

	// function onBoxClosing() { 
	// 	setBoxIsOpen(false)
	// 	setBoxOpenClass('box-closed')
	// 	setContentContainerOpenClass('content-container-closing-x')
	// 	addListeners(boxId, 'width', () => onBoxClosed())
	// }

	// function onBoxWidthOpen() { 
	// 	setToggleIsOpen(false)
	// 	addListeners(contentContainerId, 'min-height', () => { onContentContainerOpen() })

	// 	if(heightOverflowOnClose) {
	// 		setHeightTo(contentContainerId, '0') 
	// 		setHeightTo(contentContainerId, savedHeight)
	// 		setContentContainerOpenClass('content-container-opening-y')
	// 	}

	// 	if(!heightOverflowOnClose) {
	// 		setHeightTo(contentContainerId, '0') 
	// 		setHeightToFull(contentContainerId, boxBodyId)
	// 		setContentContainerOpenClass('content-container-opening-y')
	// 	}
	// } 

	// function onContentContainerOpen() { 
	// 	setIsAnimating(false)
	// 	removeInlineHeight(contentContainerId)
	// 	setContentContainerOpenClass('content-container-open')
	// }

	// function onContentContainerClosed() { 
	// 	setIsAnimating(false)
	// }

	// function onBoxClosed() {
	// 	setToggleIsOpen(true)
	// 	setContentContainerOpenClass('content-container-closing-y')
	// 	addListeners(contentContainerId, 'height', () => { onContentContainerClosed() })
	// }

	// function onOverflowClosed() { 
	// 	onBoxClosing()
	// 	handleOverflowHidden()
	// }

	// ======================================== Helper Fns ========================================= //
	/*function closeContentContainerOverflow() {  
		const [thisWidthIsOverflowing, thisHeightIsOverflowing] = checkForOverflow(boxBodyId);
		
		if(thisWidthIsOverflowing || thisHeightIsOverflowing) onClosingOverflow()
		if(thisWidthIsOverflowing) closeWidthOverflow()
		if(thisHeightIsOverflowing) closeHeightOverflow()  
		if(!thisWidthIsOverflowing && !thisHeightIsOverflowing) onClosedOverflow()
	} */

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


	// function addListeners(id, property, fn) { 
	// 	const element = document.getElementById(id);

	// 	function handleEnd(e) {
	// 		if(e.propertyName === property && e.srcElement.id === id) {
	// 			fn()
	// 			element.removeEventListener('transitionend', handleEnd)
	// 		}
	// 	}

	// 	element.addEventListener('transitionend', handleEnd)
	// }

	// function removeInlineHeight(id) {
	// 	const element = document.getElementById(id);
	// 	element.style.height = '';
	// }



	



	// function saveHeight(id) {
	// 	const element = document.getElementById(id);  
	// 	const height = element.offsetHeight + 'px';   
	// 	setSavedHeight(height)
	// }

	// function setHeightTo(id, height) {
	// 	const element = document.getElementById(id);
	// 	element.style.height = height;
	// }

	


	

	

	// function checkIfOverflowing(id) {
	// 	return elementWidthIsOverflowing(id) || elementHeightIsOverflowing(id);
	// }

	// ======================================== Listen / Trigger ================================== //
	// =================== open / close content container
	// useEffect(() => {
	// 	// if(isAnimating && boxIsOpen) openContentContainer()
	// 	if(isAnimating && !boxIsOpen) onCloseContentContainer()
	// }, [boxIsOpen, isAnimating])

	// =================== overflow closed
	useEffect(() => { 
		if(overflowIsShrinking && widthOverflowClosed && heightOverflowClosed) {
			onClosedOverflow()
		}
	}, [overflowIsShrinking, widthOverflowClosed, heightOverflowClosed])
 

	// useEffect(() => {
	// 	document.addEventListener('transitionstart', (e) => {
	// 		if(e.propertyName === 'width') {
	// 			console.log('width trans start')
	// 			console.log(e)
	// 		}
			
	// 	})

	// 	document.addEventListener('transitionend', (e) => {
	// 		if(e.propertyName === 'width') {
	// 			console.log('width trans end')
	// 			console.log(e)
	// 		} 
	// 	})
	// }, [])

	/*useEffect(() => {
		if(clickedOpen === true) onPressBoxOpening()
		if(clickedOpen === false) onPressBoxClosing()
		if(clickedOpen === null) onContentContainerOpen()
	}, [clickedOpen]) */

	// detect box resized
	// useEffect(() => {
	// 	if(overflowIsShrinking) {
	// 		if(!widthIsOverflowing && !heightIsOverflowing) { 
	// 			onOverflowClosed()
	// 			setOverflowIsShrinking(false)
	// 		}
	// 	}
	// }, [overflowIsShrinking, widthIsOverflowing, heightIsOverflowing])

	// detect box open 
	// useEffect(() => { 
	// 	if(clickedOpen && boxWidthTransitionHasEnded) {
	// 		onBoxWidthOpen()
	// 		setBoxWidthTransitionHasEnded(false)
	// 		setBoxIsOpen(true)
	// 	}
	// }, [clickedOpen, boxWidthTransitionHasEnded])

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
					{/*{children}*/}
					<p>hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello</p>
					{/*<p>hellohellohello</p>*/}
				</div>
			</div>
		</div>
	)
}