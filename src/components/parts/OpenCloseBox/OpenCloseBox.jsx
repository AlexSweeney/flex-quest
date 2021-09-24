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
		* open and close on press toggle

		* animate 
			*	close - x then y 
			*	open - x then y   

		overflow

			* expand x
			* expand y 
			on close shrink
	*/ 
	
	// ======================= Id's ======================= //
	const boxId = `box-${i}`;
	const boxBodyId = `box-body-${i}`;
	const contentContainerId = `content-container-${i}`;
	const displayContainerId = `display-container-${i}`;

	// ======================= State ======================= // 
	const [boxIsOpen, setBoxIsOpen] = useState(null);
	const [widthTransitionFinished, setWidthTransitionFinished] = useState(false); 

	// ======================= Classes ======================= //
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [contentContainerOpenClass, setContentContainerOpenClass] = useState('content-container-open');
	const [displayContainerOpenClass, setDisplayContainerOpenClass] = useState('display-container-open');
	
	// ======================= Event Handlers ======================= //
	function onClickOpenCloseToggle() {
		setBoxIsOpen(oldVal => {
			if(oldVal === null) return false;
			if(oldVal === false) return true;
			if(oldVal === true) return false;
		})
		// setIsAnimating(true)
	} 

	function onBoxOpening() {
		console.log('box-opening')
		setBoxOpenClass('box-open')
		setContentContainerOpenClass('content-container-x-opening')
	}

	function onBoxClosing() {
		console.log('box-closing')
		// keepHeight(contentContainerId)

		
		setContentContainerOpenClass('content-container-x-closing')
		 
		// close container if overflow width


		keepWidth(displayContainerId)
		setWidthToFull(displayContainerId, boxBodyId)

		// setDisplayContainerOpenClass('display-container-closing-x')
		// setOverflowToHidden(displayContainerId)
			

		// setHeightToFull(contentContainerId, boxBodyId)
	}

	function onBoxClosed() {
		setContentContainerOpenClass('content-container-closed')
		// saveWidth(contentContainerId, setSavedWidth)
	}

	function onBoxOpen() {
		setContentContainerOpenClass('content-container-open')
	}

	function onWidthTransitionEnd() { 
		console.log('width trans end')
		setDisplayContainerOpenClass('display-container-closing-x')
		setBoxOpenClass('box-closed')
		// setWidthTransitionFinished(true)
	}

	// ======================= Helper Fns ======================= //
	// onHeightTransitionENd removeHeight(contentContainerId)
	function keepWidth(id) {
		const element = document.getElementById(id);
		const width = element.clientWidth + 'px';
		element.style.width = width; 
	}

	function keepHeight(id) {
		const element = document.getElementById(id);
		const height = window.getComputedStyle(element).height;
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

	function saveWidth(id, saveFn) {
		const element = document.getElementById(id);
		const width = element.width;
		saveFn(width) 
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
	useEffect(() => {
		const displayElement = document.getElementById(displayContainerId);

		displayElement.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'width') onWidthTransitionEnd()
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

			<div className={`box-body`} id={boxBodyId}> 
				<div className={`display-container ${displayContainerOpenClass}`} id={displayContainerId}>
					<div className={`content-container ${contentContainerOpenClass}`} id={contentContainerId}>
						<p>asdfjaksdfllllllllllllllllllllllllllllllllsadlkfjdslkdsjasfdksfdajfldaksjdsfakljdsfadkfjdsfasdfjaksdfllllllllllllllllllllllllllllllllsadlkfjdslkdsjasfdksfdajfldaksjdsfakljdsfadkfjdsfasdfjaksdfllllllllllllllllllllllllllllllllsadlkfjdslkdsjasfdksfdajfldaksjdsfakljdsfadkfjdsfasdfjaksdfllllllllllllllllllllllllllllllllsadlkfjdslkdsjasfdksfdajfldaksjdsfakljdsfadkfjdsfasdfjaksdfllllllllllllllllllllllllllllllllsadlkfjdslkdsjasfdksfdajfldaksjdsfakljdsfadkfjdsfasdfjaksdfllllllllllllllllllllllllllllllllsadlkfjdslkdsjasfdksfdajfldaksjdsfakljdsfadkfjdsf</p>
			
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
						<p>asdfjaksdfllllllllllllll</p>
						<p>end</p>*/}
					</div>
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