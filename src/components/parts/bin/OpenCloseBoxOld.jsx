import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './../OpenCloseToggle/OpenCloseToggle.jsx'; 
import './OpenCloseBox.css';

export default function OpenCloseBoxOld({
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
		* open and close on press toggle

		* animate 
			same size / smaller: *
			 
			overflow
			 	x - 
			 		closing - listen for body closing = when body size goes down = use transition 
			 			-> apply overflow hidden

			 		opening - 
			 	y 
			 	x + y
	*/ 
	
	// ======================= Id's ======================= //
	const boxId = `box-${i}`;
	const boxBodyId = `box-body-${i}`;
	const contentContainerId = `content-container-${i}`;
	const displayContainerId = `display-container-${i}`;

	// ======================= State ======================= // 
	const [boxIsOpen, setBoxIsOpen] = useState(null);
	
	const [widthTransitionEnded, setWidthTransitionEnded] = useState(false); 

	const [overflowIsClosing, setOverflowIsClosing] = useState(false);
	const [widthIsOverflowing, setWidthIsOverflowing] = useState(false);
	const [heightIsOverflowing, setHeightIsOverflowing] = useState(false);

	const [contentContainerTransitionEnded, setContentContainerTransitionEnded] = useState(false);
	const [contentContainerWidthChangeEnd, setContentContainerWidthChangeEnd] = useState(false);
	const [savedHeight, setSavedHeight] = useState(null);

	// ======================= Classes ======================= //
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [boxOverflowClass, setBoxOverflowClass] = useState('');
	const [contentContainerOpenClass, setContentContainerOpenClass] = useState('content-container-open');
	const [displayContainerOpenClass, setDisplayContainerOpenClass] = useState('display-container-open');
	
	// ======================= Event Handlers ======================= //
	function onClickOpenCloseToggle() {
		setBoxIsOpen(oldVal => {
			if(oldVal === null) return false;
			if(oldVal === false) return true;
			if(oldVal === true) return false;
		}) 
	} 

	function onPressToClose() { 
		const thisWidthIsOverflowing = elementWidthIsOverflowing(boxBodyId);
		setWidthIsOverflowing(thisWidthIsOverflowing)

		const thisHeightIsOverflowing = elementHeightIsOverflowing(boxBodyId);
		setHeightIsOverflowing(thisHeightIsOverflowing)

		if(thisWidthIsOverflowing) closeWidthOverflow()
		if(thisHeightIsOverflowing) closeHeightOverflow() 

		if(!thisWidthIsOverflowing && !thisHeightIsOverflowing) onBoxClosing() 
	}

	function closeWidthOverflow() {
		keepWidth(contentContainerId)
		setWidthToFull(contentContainerId, boxBodyId)
	}

	function closeHeightOverflow() {
		keepHeight(contentContainerId)
		setHeightToFull(contentContainerId, boxBodyId)
	}

	/*function onOverflowClosed() {
		onBoxClosing()
	}*/

	function onPressToOpen() {

	}

/*	function onContentContainerShrunk() {
		console.log('content container shrunk')
		setContentContainerOpenClass('content-container-width-shrunk')
		setBoxOpenClass('box-closed')
	}
*/

	function onBoxClosing() { 
		console.log('on box closing -----------------------------------')
		setBoxOpenClass('box-closed')
		setContentContainerOpenClass('content-container-x-closing')
	


		// saveWidthIsOverflowing(boxBodyId)

		// keepWidth(displayContainerId)
		// setWidthToFull(displayContainerId, boxBodyId)
		// saveWidthIsOverflowing(boxBodyId)
		
		
		

		// keepHeight(contentContainerId)
		// setHeightToFull(contentContainerId, boxBodyId)
		// saveHeight(contentContainerId, setSavedHeight)

		 

		// setDisplayContainerOpenClass('display-container-x-closing') 
	}

	function onBoxClosingX() {
		// const isOverflowing = elementWidthIsOverflowing(boxBodyId);

		// if(isOverflowing) {
			
			// setWidthIsOverflowing(true)
		// } else {
		// 	setDisplayContainerOpenClass('display-container-x-closing-no-overflow')
		// }
	}

	function onBoxClosingY() {
		// const isOverflowing = elementHeightIsOverflowing(boxBodyId);

		// if(isOverflowing) {
			// keepHeight(contentContainerId)
			// setHeightToFull(contentContainerId, boxBodyId)
			// saveHeight(contentContainerId, setSavedHeight)
		// } 
	}

	function onBoxClosed() {
		console.log('onBoxClosed')
		setContentContainerOpenClass('content-container-x-closed')
		// removeInlineStyles(displayContainerId)	


		// saveWidth(contentContainerId, setSavedWidth)

		
		

		// removeInlineStyles(contentContainerId)
	}

	function onBoxOpening() { 
		setBoxOpenClass('box-open')
		setContentContainerOpenClass('content-container-x-opening')
		setDisplayContainerOpenClass('display-container-x-opening')  

		if(widthIsOverflowing) {
			console.log('open width overflow')
		}

		// if width overflow don't remove inline style
		// if(!widthIsOverflowing) removeInlineWidth(displayContainerId)
		/*if(!widthIsOverflowing) {
			setBoxOverflowClass('box-opening-no-overflow-x')
		}*/
	}

	function onBoxOpen() {
		console.log('onBoxOpen')
		setContentContainerOpenClass('content-container-open')

		setBoxOverflowClass('')
		// set height to saved value
		setHeight(contentContainerId, savedHeight)
	}

	function onContentContainerOpen() {
		console.log('content container open')
		// remove inline height
		removeInlineStyles(contentContainerId)
	}

	function onWidthTransitionEnd() {  
		setDisplayContainerOpenClass('display-container-x-closing')
		setBoxOpenClass('box-closed')
		// setWidthTransitionFinished(true)
	}

	// ======================= Helper Fns ======================= //
	function saveWidthIsOverflowing(id) {
		const isOverflowing = elementWidthIsOverflowing(id);
		console.log('isOverflowing', isOverflowing)
		setWidthIsOverflowing(isOverflowing)
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

	function removeInlineStyles(id) {
		const element = document.getElementById(id);
		element.style = [];
	}

	function removeInlineWidth(id) {
		const element = document.getElementById(id);
		element.style.width = '';
	}

	// onHeightTransitionENd removeHeight(contentContainerId)
	function keepWidth(id) {
		const element = document.getElementById(id);
		const width = element.clientWidth + 'px';
 
		element.style.width = width; 
	}

	function keepHeight(id, heightId) {
		const element = document.getElementById(id);
		// const heightElement = document.getElementById(heightId);
		// const height = window.getComputedStyle(element).height;
		
		const height = element.offsetHeight + 'px';
		// console.log('heightElement.clientHeight', heightElement.clientHeight)
		// console.log('heightElement.offsetHeight', heightElement.offsetHeight)  
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

	function removeHeight(id) {
		const element = document.getElementById(id); 
		element.style.height = '';
	}

	function saveHeight(id, saveFn) {
		const element = document.getElementById(id);
		const height = element.offsetHeight + 'px'; 
		saveFn(height) 
	}

	function setHeight(id, height) {
		const element = document.getElementById(id);
		element.height = '';
		element.style.height = height;
	}

	useEffect(() => {
		if(boxIsOpen === true) onBoxOpening()
		if(boxIsOpen === false) onBoxClosing()
		if(boxIsOpen === null) onBoxOpen()
	}, [boxIsOpen])
  
	// ======================= Transition Functions ======================= //
	function addTransitionEndListener(id, fn) {
		const element = document.getElementById(id);
		element.addEventListener('transitionend', fn)
	}

	function removeTransitionEndListener(id, fn) {
		const element = document.getElementById(id);
		element.removeEventListener('transitionend', fn)
	} 

	// Add / Remove Listeners
	/*useEffect(() => {
		const displayElement = document.getElementById(displayContainerId);
		

		displayElement.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'width') onWidthTransitionEnd()
		})   
	}, [])*/

	// listen for box open / closed
	const [boxTransitionEnded, setBoxTransitionEnded] = useState(false)

	// ======================= Listeners ======================= //
	// =========== detect box closed and open
	useEffect(() => {
		if(boxTransitionEnded) {
			if(boxIsOpen) onBoxOpen()
			if(!boxIsOpen) onBoxClosed()

			setBoxTransitionEnded(false)
		}
	}, [boxIsOpen, boxTransitionEnded])

	useEffect(() => {
		const boxElement = document.getElementById(boxId);

		boxElement.addEventListener('transitionstart', (e) => { 
			if(e.propertyName === 'width' && e.srcElement.id === boxId) setBoxTransitionEnded(false)
		}) 

		boxElement.addEventListener('transitionend', (e) => { 
			if(e.propertyName === 'width' && e.srcElement.id === boxId) setBoxTransitionEnded(true)
		}) 
	}, [])
 
	// =========== detect overflow change

	// =========== detect content container width change


	/*useEffect(() => {
		if(contentContainerWidthChangeEnd) {
			onClosedWidthOverflow()
			setContentContainerWidthChangeEnd(false)
		}
	}, [contentContainerWidthChangeEnd])

	useEffect(() => {
		const contentContainerElement = document.getElementById(contentContainerId);

		contentContainerElement.addEventListener('transitionstart', (e) => { 
			if(e.propertyName === 'width' && e.srcElement.id === contentContainerId) setContentContainerWidthChangeEnd(false)
		}) 

		contentContainerElement.addEventListener('transitionend', (e) => { 
			if(e.propertyName === 'width' && e.srcElement.id === contentContainerId) setContentContainerWidthChangeEnd(true)
		}) 
	}, [])
*/
	// detect content container height change
	useEffect(() => {
		if(contentContainerTransitionEnded) {
			if(boxIsOpen) onContentContainerOpen()
			if(!boxIsOpen) 

			setContentContainerTransitionEnded(false)
		}
	}, [boxIsOpen, contentContainerTransitionEnded])

	useEffect(() => {
		const contentContainerElement = document.getElementById(contentContainerId);

		contentContainerElement.addEventListener('transitionstart', (e) => { 
			if(e.propertyName === 'height' && e.srcElement.id === contentContainerId) setContentContainerTransitionEnded(false)
		}) 

		contentContainerElement.addEventListener('transitionend', (e) => { 
			if(e.propertyName === 'height' && e.srcElement.id === contentContainerId) setContentContainerTransitionEnded(true)
		}) 
	}, [])

	// ======================= Component ======================= //
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

			<div className={`box-body ${boxOverflowClass}`} id={boxBodyId}> 
				{/*<div className={`display-container ${displayContainerOpenClass}`} id={displayContainerId}>*/}
					<div className={`content-container ${contentContainerOpenClass}`} id={contentContainerId}>
						{/*<p>abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg--- end </p>*/}
			 			<p>asdfjaksdfllllllllllllll</p>
						{/*<p>asdfjaksdfllllllllllllll</p>
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
						<p>end</p> */}
					</div>
				</div> 
		</div>
	)
} 

/*const widthTransitionEndFunction = makeListenerFunction('width', contentContainerId, () => {
		onWidthTransitionEnd()
	})

	function makeListenerFunction(propertyName, id, fn) { 
		return (e) => {
			if(e.propertyName === propertyName && e.srcElement.id === id) { 
				fn()
			}
		}; 
	}
*/
	/*const heightTransitionEndFunction = makeListenerFunction('height', contentContainerId, () => {
		onHeightTransitionEnd()
	})*/
	
	// ======================= Event Handlers ======================= //
	
  
	/*function onBoxOpen() { 
		setToggleIsOpen(false)
		setIsAnimating(false) 
		setContentContainerIsOpen(true) 
	}

	function onBoxClosed() {
		setToggleIsOpen(true)
		setIsAnimating(false)
		setContentContainerIsOpen(false) 
	}  

	function onRefreshStart() { 
		setBoxBodyClass('box-body-refresh')
	}

	function onRefreshEnd() { 
		setBoxBodyClass('')
	}

	function onWidthTransitionEnd() {
		setWidthTransitionFinished(true)
	}

	function onHeightTransitionEnd() { 
		setHeightTransitionFinished(true)
	}*/

	// ======================= Detect Transitions ======================= //
	// Helper functions
	/*function makeListenerFunction(propertyName, id, fn) { 
		return (e) => {
			if(e.propertyName === propertyName && e.srcElement.id === id) { 
				fn()
			}
		}; 
	}	*/

	/*useEffect(() => { 
		if(contentContainerIsOpen) addTransitionEndListener(contentContainerId, heightTransitionEndFunction)
		if(!contentContainerIsOpen) removeTransitionEndListener(contentContainerId, heightTransitionEndFunction)
	}, [contentContainerIsOpen]) */

	// ======================= Set Status ======================= //
	//  ================ box (for this)
	// opening / closing
	/*useEffect(() => {
		if(boxIsOpen 
			&& (boxOpenStatus === 'box-closed' || boxOpenStatus === 'box-closing')) {
			setBoxOpenStatus('box-opening')
		} 
		if(!boxIsOpen 
			&& (boxOpenStatus === 'box-open' || boxOpenStatus === 'box-opening')) {
			setBoxOpenStatus('box-closing')
		} 
	}, [boxIsOpen, boxOpenStatus])*/

	// open / close
	/*useEffect(() => {
		if(widthTransitionFinished) { 
			if(boxIsOpen) setBoxOpenStatus('box-open')
			if(!boxIsOpen) setBoxOpenStatus('box-closed')

			setWidthTransitionFinished(false)
		} 
	}, [widthTransitionFinished])*/

	//  ================ box (for parent)
	/*useEffect(() => {
		setBoxStatus(boxOpenStatus)
	}, [boxOpenStatus])*/

	// ================ content container 
	// opening closing
	/*useEffect(() => {
		if(contentContainerIsOpen
			&& (contentContainerOpenStatus === 'content-container-closed' 
				|| contentContainerOpenStatus === 'content-container-closing')) {
			setContentContainerOpenStatus('content-container-opening')
		}
		if(!contentContainerIsOpen
			&& (contentContainerOpenStatus === 'content-container-open'
				|| contentContainerOpenStatus === 'content-container-opening'
			)) {
			setContentContainerOpenStatus('content-container-closing')
		}
	}, [contentContainerIsOpen, contentContainerOpenStatus])*/

	// open close
	/*useEffect(() => {
		if(heightTransitionFinished) {
			if(boxIsOpen) setContentContainerOpenStatus('content-container-open')
			if(!boxIsOpen) setContentContainerOpenStatus('content-container-closed')

			setHeightTransitionFinished(false)
		} 
	}, [heightTransitionFinished, boxIsOpen]) */

	// ================ content container (for parent)
	/*useEffect(() => {
		setContentContainerStatus(contentContainerOpenStatus)
	}, [contentContainerOpenStatus])*/

	// ======================= Trigger Functions ======================= //
	/*useEffect(() => {
		if(boxOpenStatus === 'box-open') onBoxOpen()
		if(boxOpenStatus === 'box-closed') onBoxClosed()
	}, [boxOpenStatus])

	useEffect(() => { 
		if(resizeStatus === 'output-display-resizing') onRefreshStart()
		if(resizeStatus === 'output-display-resized') onRefreshEnd() 
	}, [resizeStatus])*/

	// ======================= Console logs ======================= // 
	// useEffect(() => {
	// 	console.log('boxIsOpen', boxIsOpen)
	// }, [boxIsOpen]) 

	// useEffect(() => {
	// 	console.log('boxOpenStatus', boxOpenStatus)
	// }, [boxOpenStatus])

	// useEffect(() => {
	// 	console.log('contentContainerIsOpen', contentContainerIsOpen)
	// }, [contentContainerIsOpen])

	// useEffect(() => {
	// 	console.log('contentContainerOpenStatus', contentContainerOpenStatus)
	// }, [contentContainerOpenStatus])
	 
	// useEffect(() => {
	// 	console.log('resizeStatus', resizeStatus)
	// }, [resizeStatus])