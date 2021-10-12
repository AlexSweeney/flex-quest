import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './../Buttons/OpenCloseToggle/OpenCloseToggle.jsx'; 
import './OpenCloseBox.css';

export default function OpenCloseBox({
	title = '',
	i,
	boxBodyId = null,
	contentContainerId = null,
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
			* close overflow the close box
			* show width bar on open

			* open box to previous size 
	*/

	// =========================== Id's ============================ //
	const boxId = `box-${i}`;
	if(!boxBodyId) boxBodyId = `box-body-${i}`;
	if(!contentContainerId) contentContainerId = `content-container-${i}`;
	const displayContainerId = `display-container-${i}`;

	// ======================= State ======================= // 
	const [clickedOpen, setClickedOpen] = useState(null);
	const [boxIsOpen, setBoxIsOpen] = useState(true);

	const [isAnimating, setIsAnimating] = useState(false);
	const [toggleIsOpen, setToggleIsOpen] = useState(false);

	const [widthOverflowOnClose, setWidthOverflowOnClose] = useState(false);
	const [heightOverflowOnClose, setHeightOverflowOnClose] = useState(false);
	const [savedHeight, setSavedHeight] = useState(null);

	const [widthIsOverflowing, setWidthIsOverflowing] = useState(false);
	const [heightIsOverflowing, setHeightIsOverflowing] = useState(false);
	const [overflowIsShrinking, setOverflowIsShrinking] = useState(false);

	const [boxWidthTransitionHasEnded, setBoxWidthTransitionHasEnded] = useState(false);

	// ======================= Classes ======================= //
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [contentContainerOpenClass, setContentContainerOpenClass] = useState('content-container-open');

	// ======================= Event Handlers ======================= //
	function onClickOpenCloseToggle() {
		if(!isAnimating) {
			let newValue;

			if(clickedOpen === null) newValue = false;
			if(clickedOpen === false) newValue = true;
			if(clickedOpen === true) newValue = false;

			setClickedOpen(newValue) 
			handleToggleClick(newValue, elementWidthIsOverflowing(boxBodyId), elementHeightIsOverflowing(boxBodyId))
		} 
	} 

	function onPressBoxOpening() { 
		setIsAnimating(true)
		setBoxOpenClass('box-open')
		
		if(widthOverflowOnClose) setContentContainerOpenClass('content-container-opening-x')
		if(!widthOverflowOnClose) setContentContainerOpenClass('content-container-opening-x-max-width')
		removeInlineWidth(contentContainerId)
		addListeners(boxId, 'width', () => { setBoxWidthTransitionHasEnded(true) })
	}

	function onPressBoxClosing() { 
		setIsAnimating(true)
		console.log('press closing ----------------------')
		
		if(boxIsOpen) {
			const thisWidthIsOverflowing = elementWidthIsOverflowing(boxBodyId);
			console.log('thisWidthIsOverflowing --', thisWidthIsOverflowing)
			setWidthOverflowOnClose(thisWidthIsOverflowing) 

			const thisHeightIsOverflowing = elementHeightIsOverflowing(boxBodyId);
			setHeightOverflowOnClose(thisHeightIsOverflowing)
			console.log('thisHeightIsOverflowing ===========', thisHeightIsOverflowing)
	  
			if(thisWidthIsOverflowing || thisHeightIsOverflowing) setOverflowIsShrinking(true)
			if(thisWidthIsOverflowing) closeWidthOverflow()
			if(thisHeightIsOverflowing) {
				saveHeight(contentContainerId)
				closeHeightOverflow() 
			}

			if(!thisWidthIsOverflowing && !thisHeightIsOverflowing) onBoxClosing() 
		}

		if(!boxIsOpen) {
			onBoxClosing() 
		}
	}

	function onBoxClosing() { 
		setBoxIsOpen(false)
		setBoxOpenClass('box-closed')
		setContentContainerOpenClass('content-container-closing-x')
		addListeners(boxId, 'width', () => onBoxClosed())
	}

	function onBoxWidthOpen() { 
		setToggleIsOpen(false)
		addListeners(contentContainerId, 'min-height', () => { onContentContainerOpen() })

		if(heightOverflowOnClose) {
			setHeightTo(contentContainerId, '0') 
			setHeightTo(contentContainerId, savedHeight)
			setContentContainerOpenClass('content-container-opening-y')
		}

		if(!heightOverflowOnClose) {
			setHeightTo(contentContainerId, '0') 
			setHeightToFull(contentContainerId, boxBodyId)
			setContentContainerOpenClass('content-container-opening-y')
		}
	} 

	function onContentContainerOpen() { 
		setIsAnimating(false)
		removeInlineHeight(contentContainerId)
		setContentContainerOpenClass('content-container-open')
	}

	function onContentContainerClosed() { 
		setIsAnimating(false)
	}

	function onBoxClosed() {
		setToggleIsOpen(true)
		setContentContainerOpenClass('content-container-closing-y')
		addListeners(contentContainerId, 'height', () => { onContentContainerClosed() })
	}

	function onOverflowClosed() { 
		onBoxClosing()
		handleOverflowHidden()
	}

	// ======================= Helper Fns ========================== //  
	function addListeners(id, property, fn) { 
		const element = document.getElementById(id);

		function handleEnd(e) {
			if(e.propertyName === property && e.srcElement.id === id) {
				fn()
				element.removeEventListener('transitionend', handleEnd)
			}
		}

		element.addEventListener('transitionend', handleEnd)
	}

	function removeInlineHeight(id) {
		const element = document.getElementById(id);
		element.style.height = '';
	}

	function removeInlineWidth(id) {
		const element = document.getElementById(id);
		element.style.width = '';
	}

	function closeWidthOverflow() {
		setWidthIsOverflowing(true)
		addListeners(contentContainerId, 'width', () => { setWidthIsOverflowing(false)})
		keepWidth(contentContainerId)
		setWidthToFull(contentContainerId, boxBodyId)
		setContentContainerOpenClass('content-container-closing-overflow') 
	}

	function closeHeightOverflow() {
		setHeightIsOverflowing(true)
		addListeners(contentContainerId, 'height', () => { setHeightIsOverflowing(false)})
		keepHeight(contentContainerId)
		setHeightToFull(contentContainerId, boxBodyId)
		setContentContainerOpenClass('content-container-closing-overflow')
	}

	function keepWidth(id) {
		const element = document.getElementById(id);
		const width = element.clientWidth + 'px';
 
		element.style.width = width; 
	}

	function keepHeight(id) {
		const element = document.getElementById(id);  
		const height = element.offsetHeight + 'px';  
		element.style.height = height;
	}

	function saveHeight(id) {
		const element = document.getElementById(id);  
		const height = element.offsetHeight + 'px';   
		setSavedHeight(height)
	}

	function setHeightTo(id, height) {
		const element = document.getElementById(id);
		element.style.height = height;
	}

	function setHeightToFull(id, heightId) {
		const element = document.getElementById(id);
		const heightElement = document.getElementById(heightId); 
		const height = heightElement.clientHeight;  
		element.style.height = height + 'px';
	}

	function setWidthToFull(id, widthId) {
		const element = document.getElementById(id);
		const widthElement = document.getElementById(widthId); 
		const width = widthElement.offsetWidth; 
		element.style.width = width + 'px';
	}

	function elementWidthIsOverflowing(id) {
		const element = document.getElementById(id);
		if(!element) return;

	  return element.scrollWidth > element.clientWidth;
	}

	function elementHeightIsOverflowing(id) {
		const element = document.getElementById(id);
		if(!element) return;

	  return element.scrollHeight > element.clientHeight;
	}

	function checkIfOverflowing(id) {
		return elementWidthIsOverflowing(id) || elementHeightIsOverflowing(id);
	}

	// ======================= Event Detects ======================= //
	// toggle click triggers
	useEffect(() => {
		if(clickedOpen === true) onPressBoxOpening()
		if(clickedOpen === false) onPressBoxClosing()
		if(clickedOpen === null) onContentContainerOpen()
	}, [clickedOpen]) 

	// detect box resized
	useEffect(() => {
		if(overflowIsShrinking) {
			if(!widthIsOverflowing && !heightIsOverflowing) { 
				onOverflowClosed()
				setOverflowIsShrinking(false)
			}
		}
	}, [overflowIsShrinking, widthIsOverflowing, heightIsOverflowing])

	// detect box open 
	useEffect(() => { 
		if(clickedOpen && boxWidthTransitionHasEnded) {
			onBoxWidthOpen()
			setBoxWidthTransitionHasEnded(false)
			setBoxIsOpen(true)
		}
	}, [clickedOpen, boxWidthTransitionHasEnded])

	// =========================== Output ============================ //
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
						parentIsAnimating={isAnimating}
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