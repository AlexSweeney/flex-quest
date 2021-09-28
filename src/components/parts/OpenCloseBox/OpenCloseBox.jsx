import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './../OpenCloseToggle/OpenCloseToggle.jsx'; 
import './OpenCloseBox.css';

export default function OpenCloseBox({
	title = '',
	i,
	buttons = [],  
	setBoxStatus = () => {},
	setContentContainerStatus = () => {},
	resizeStatus = '',
	children
}) {  
	/*
		* show title   	
		* show buttons  
		* show open close toggle

		* on press open close toggle
			- close overflow
			- close box

			- open box to previous size

	*/

	// =========================== Id's ============================ //
	const boxId = `box-${i}`;
	const boxBodyId = `box-body-${i}`;
	const contentContainerId = `content-container-${i}`;
	const displayContainerId = `display-container-${i}`;

	// ======================= State ======================= // 
	const [clickedOpen, setClickedOpen] = useState(null);
	const [boxIsOpen, setBoxIsOpen] = useState(null);

	const [widthIsOverflowing, setWidthIsOverflowing] = useState(false);
	const [heightIsOverflowing, setHeightIsOverflowing] = useState(false);
	const [overflowIsShrinking, setOverflowIsShrinking] = useState(false);

	// ======================= Classes ======================= //
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [contentContainerOpenClass, setContentContainerOpenClass] = useState('content-container-open');

	// ======================= Event Handlers ======================= //
	function onClickOpenCloseToggle() {
		setClickedOpen(oldVal => {
			if(oldVal === null) return false;
			if(oldVal === false) return true;
			if(oldVal === true) return false;
		}) 
	} 

	function onPressBoxOpening() {

	}

	function onPressBoxClosing() {
		const thisWidthIsOverflowing = elementWidthIsOverflowing(boxBodyId);
		setWidthIsOverflowing(thisWidthIsOverflowing)

		const thisHeightIsOverflowing = elementHeightIsOverflowing(boxBodyId);
		setHeightIsOverflowing(thisHeightIsOverflowing)

		if(thisWidthIsOverflowing || thisHeightIsOverflowing) setOverflowIsShrinking(true)
		if(thisWidthIsOverflowing) closeWidthOverflow()
		if(thisHeightIsOverflowing) closeHeightOverflow() 

		if(!thisWidthIsOverflowing && !thisHeightIsOverflowing) onBoxClosing() 
	}

	function onBoxClosing() {
		console.log('onBoxClosing ------------------')
		setBoxOpenClass('box-closed')
		setContentContainerOpenClass('content-container-closing-x')
	}

	function onBoxOpen() {
		setContentContainerOpenClass('content-container-open')
	}

	function onOverflowClosed() {
		onBoxClosing()
	}

	// ======================= Helper Fns ========================== //  
	function addListeners(id, property, fn) {
		const element = document.getElementById(id);
		element.addEventListener('transitionend', (e) => {
			if(e.propertyName === property && e.srcElement.id === id) {
				fn()
			}
		})
	}

	function closeWidthOverflow() {
		console.log('close width overflow')
		addListeners(contentContainerId, 'width', () => { setWidthIsOverflowing(false);  console.log('width finished') })
		keepWidth(contentContainerId)
		setWidthToFull(contentContainerId, boxBodyId)
		setContentContainerOpenClass('content-container-closing-overflow') 
	}

	function closeHeightOverflow() {
		console.log('close height overflow')
		addListeners(contentContainerId, 'height', () => { setHeightIsOverflowing(false); console.log('height finished') })
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

	function setHeightToFull(id, heightId) {
		const element = document.getElementById(id);
		const heightElement = document.getElementById(heightId); 
		const height = heightElement.offsetHeight;  
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

	// ======================= Event Detects ======================= //
	// toggle click triggers
	useEffect(() => {
		if(clickedOpen === true) onPressBoxOpening()
		if(clickedOpen === false) onPressBoxClosing()
		if(clickedOpen === null) onBoxOpen()
	}, [clickedOpen]) 

	// detect box resized
	useEffect(() => {
		if(overflowIsShrinking) {
			if(!widthIsOverflowing && !heightIsOverflowing) { 
				onOverflowClosed()
			}
		}
	}, [overflowIsShrinking, widthIsOverflowing, heightIsOverflowing])

	// trigger overflow status update !!!!!!!!!!!! update to only trigger if clicked when boxIsOpen
	/*useEffect(() => {
		if(clickedOpen === false) updateOverflow() 
	}, [clickedOpen])*/

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
						toggleIsOpen={true}
						parentIsAnimating={false}
					/>
				</div>
			</div>

			<div className={`box-body`} id={boxBodyId}> 
				<div className={`content-container ${contentContainerOpenClass}`} id={contentContainerId}>
					<p>abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg--- end </p>
			 			<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>asdfjaksdfllllllllllllll</p>
						<p>end</p> 
				</div>
			</div>
		</div>
	)
}