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
		if(!isAnimating) { 
			setIsAnimating(true)

			if(boxIsOpen) closeBox()
			// if(!boxIsOpen) onOpen()

			// handleToggleClick(!boxIsOpen, elementWidthIsOverflowing(boxBodyId), elementHeightIsOverflowing(boxBodyId))
		} 
	} 

	function onBoxClosed() {
 		setBoxIsOpen(false)
 	}

 	function onBoxOpen() {
 		setBoxIsOpen(true)
 	}

 	function onContentContainerClosed() {
 		setIsAnimating(false)
 	}

 	function onContentContainerOpened() {
 		setIsAnimating(false)
 	}

 	// ==================== Close Box
	function closeBox() { 
		closeContentContainerOverflow().then(closeBoxWidth).then(closeContentContainerHeight)
	}

	function closeContentContainerOverflow() {
		return new Promise(resolve => {
			setContentContainerOpenClass('content-container-closing-overflow') 

			const widthPromise = closeOverflow(contentContainerId, 'width');
			const heightPromise = closeOverflow(contentContainerId, 'height');
 			
			Promise.all([widthPromise, heightPromise]).then(resolve)
		})  
 	} 

 	function closeOverflow(id, property) {
 		return new Promise(resolve => {
 			const isOverflowing = elementIsOverflowing(id, property)
 			
 			if(!isOverflowing) resolve()
 			
 			if(isOverflowing) {
 				triggerOnTransitionEnd(id, property, resolve)
 				setSizeInPx(id, property)
 				setToParentSize(id, property)
 			}
 		})
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

 	function setSizeInPx(id, property) {
		const element = document.getElementById(id);
		
		if(property === 'width') {
			element.style.width = element.clientWidth + 'px';
		}
		
		if(property === 'height') {
			element.style.height = element.clientHeight + 'px';
		}
	}

	function setToParentSize(id, property) {
		const element = document.getElementById(id);
		const parentElement = getParentElement(id); 
		const parentStyle = window.getComputedStyle(parentElement);

		if(property === 'width') {
			element.style.width = parentStyle.width;
		}
		
		if(property === 'height') {
			element.style.height = parentStyle.height;
		}
	}

	function getParentElement(id) {
		const parentId = document.getElementById(id).parentElement.id;
		return document.getElementById(parentId);   
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
					{children}
				</div>
			</div>
		</div>
	)
}