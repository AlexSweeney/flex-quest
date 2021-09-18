import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './../OpenCloseToggle/OpenCloseToggle.jsx'; 
import './OpenCloseBox.css';

export default function OpenCloseBox({
	title = '',
	buttons = [], 
	boxStatus,
	setBoxStatus,
	resizeStatus = '',
	children
}) {  
	/* 
		show title   	
		show buttons  
		open and close on press toggle

		animate 
			close - x then y 
			open - x then y  

		use overflow: overlay when child is shrinking  
	*/
	
	// ======================= Id's ======================= //
	const boxId = 'box';
	const id = 'box';

	// ======================= State ======================= // 
	const [boxIsOpen, setBoxIsOpen] = useState(true);
	const [contentContainerIsOpen, setContentContainerIsOpen] = useState(true); 
	const [toggleIsOpen, setToggleIsOpen] = useState(!boxIsOpen); 

	const [widthTransitionFinished, setWidthTransitionFinished] = useState(false);
	const [heightTransitionFinished, setHeightTransitionFinished] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ======================= Class / Status ======================= //
	const [boxOpenStatus, setBoxOpenStatus] = useState('box-open');
	const [boxBodyClass, setBoxBodyClass] = useState('');
	const [contentContainerOpenStatus, setContentContainerOpenStatus] = useState('content-container-open');

	// ======================= Transition Functions ======================= //
	const widthTransitionEndFunction = makeListenerFunction('width', boxId, () => {
		onWidthTransitionEnd()
	})
	const heightTransitionEndFunction = makeListenerFunction('height', 'content-container', () => {
		onHeightTransitionEnd()
	})

	// ======================= Event Handlers ======================= //
	function clickOpenCloseToggle() {
		setBoxIsOpen(oldVal => !oldVal)
		setIsAnimating(true)
	}
  
	function onBoxOpen() { 
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
	}

	// ======================= Detect Transitions ======================= //
	// Helper functions
	function makeListenerFunction(propertyName, id, fn) { 
		return (e) => {
			if(e.propertyName === propertyName && e.srcElement.id === id) { 
				fn()
			}
		}; 
	}	
		
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
		if(boxIsOpen) addTransitionEndListener(boxId, widthTransitionEndFunction)
		if(!boxIsOpen) removeTransitionEndListener(boxId, widthTransitionEndFunction)
	}, [boxIsOpen])

	useEffect(() => {
		if(contentContainerIsOpen) addTransitionEndListener('content-container', heightTransitionEndFunction)
		if(!contentContainerIsOpen) removeTransitionEndListener('content-container', heightTransitionEndFunction)
	}, [contentContainerIsOpen]) 

	// ======================= Set Class ======================= //
	//  ================ box
	// opening / closing
	useEffect(() => {
		if(boxIsOpen 
			&& boxOpenStatus === 'box-closed') setBoxOpenStatus('box-opening')
		if(!boxIsOpen 
			&& boxOpenStatus === 'box-open') setBoxOpenStatus('box-closing')
	}, [boxIsOpen, boxOpenStatus])

	// open / close
	useEffect(() => {
		if(widthTransitionFinished) { 
			if(boxIsOpen) setBoxOpenStatus('box-open')
			if(!boxIsOpen) setBoxOpenStatus('box-closed')

			setWidthTransitionFinished(false)
		} 
	}, [widthTransitionFinished])

	// ================ content container 
	// opening closing
	useEffect(() => {
		if(contentContainerIsOpen
			&& contentContainerOpenStatus === 'content-container-closed') {
			setContentContainerOpenStatus('content-container-opening')
		}
		if(!contentContainerIsOpen
			&& contentContainerOpenStatus === 'content-container-open') {
			setContentContainerOpenStatus('content-container-closing')
		}
	}, [contentContainerIsOpen, contentContainerOpenStatus])

	// open close
	useEffect(() => {
		if(heightTransitionFinished) {
			if(boxIsOpen) setContentContainerOpenStatus('content-container-open')
			if(!boxIsOpen) setContentContainerOpenStatus('content-container-closed')

			setHeightTransitionFinished(false)
		} 
	}, [heightTransitionFinished, boxIsOpen]) 

	// ======================= Trigger Functions ======================= //
	useEffect(() => {
		if(boxOpenStatus === 'box-open') onBoxOpen()
		if(boxOpenStatus === 'box-closed') onBoxClosed()
	}, [boxOpenStatus])

	useEffect(() => {
		if(resizeStatus === 'display-box-resizing') onRefreshStart()
		if(resizeStatus === 'display-box-resize-finished') onRefreshEnd() 
	}, [resizeStatus])

	// ======================= Console logs ======================= // 
	// useEffect(() => {
	// 	console.log('boxIsOpen', boxIsOpen)
	// }, [boxIsOpen]) 

	// useEffect(() => {
	// 	console.log('boxOpenStatus', boxOpenStatus)
	// }, [boxOpenStatus])

	// useEffect(() => {
	// 	console.log('contentContainerOpenStatus', contentContainerOpenStatus)
	// }, [contentContainerOpenStatus])
	 
	// useEffect(() => {
	// 	console.log('resizeStatus', resizeStatus)
	// }, [resizeStatus])

	// ======================= Component ======================= //
	return (
		<div className={`box ${boxOpenStatus}`} id={boxId}>
			<div className="box-header">
				<div className="box-buttons-container">
					{buttons.map(button => button)}
				</div>

				<div className="title">{title}</div>

				<div className="open-close-toggle-container">
					<OpenCloseToggle 	
						handleClick={clickOpenCloseToggle}
						toggleIsOpen={toggleIsOpen}
						parentIsAnimating={isAnimating}
					/>
				</div>
			</div>

			<div className={`box-body ${boxBodyClass}`} id="box-body"> 
				<div className={`content-container ${contentContainerOpenStatus}`} id="content-container">
					{
						 
					}
				</div>
			</div>
		</div>
	)
}