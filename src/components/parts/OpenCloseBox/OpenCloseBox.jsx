import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './../OpenCloseToggle/OpenCloseToggle.jsx'; 
import './OpenCloseBox.css';

export default function OpenCloseBox({
	title = '',
	buttons = [], 
	resizeStatus = '',
	children
}) {
	/*
		boxIsOpen = true,
	buttons = null,
	title = '',
	id = 'learn-box',
	handleOpenCloseToggleClick = null,
	learnBoxStatus,
	setLearnBoxStatus,
	resizeStatus = null,
	children = null,
	
	*/

	/* 
		show title   	x
		show buttons  x
		open and close on press toggle

		animate 
			close - x then y
			open - x then y

		add listeners and remove when not needed
	*/
	
	// ======================= Id's ======================= //
	const boxId = 'box';
	const id = 'box';

	// ======================= Status ======================= // 
	const [boxIsOpen, setBoxIsOpen] = useState(true);
	const [contentContainerIsOpen, setContentContainerIsOpen] = useState(true);

	const [boxStatus, setBoxStatus] = useState('box-open');

	const [toggleIsOpen, setToggleIsOpen] = useState(!boxIsOpen); 

	const [widthTransitionFinished, setWidthTransitionFinished] = useState(false);
	const [heightTransitionFinished, setHeightTransitionFinished] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ======================= Classes ======================= //
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [boxBodyClass, setBoxBodyClass] = useState('');
	const [contentContainerOpenClass, setContentContainerOpenClass] = useState('content-container-open');

	// ======================= Event Handlers ======================= //
	function clickOpenCloseToggle() {
		setBoxIsOpen(oldVal => !oldVal)
	}

	function onBoxClosing() {
		/*setBoxOpenClass('box-closed') 
		setIsAnimating(true)*/
	}

	function onBoxOpen() {
		/*setToggleIsOpen(false)
		setIsAnimating(false) 
		setContentContainerClass('content-container-opening')*/
		setContentContainerOpenClass('content-container-open')
	}

	function onBoxClosed() {
		setContentContainerOpenClass('content-container-closed')
		/*setToggleIsOpen(true)
		setIsAnimating(false)
		setBoxOpenClass('box-closed')
		setContentContainerClass('content-container-closing')*/
	}

	function onBoxOpening() { 
		/*setBoxOpenClass('box-open') 
		setIsAnimating(true)*/
	}

	

	function onContentContainerOpen() {
		// setContentContainerClass('content-container-open')
	}

	function onContentContainerClosed() {
		// setContentContainerClass('content-container-closed')
	}

	function onRefreshStart() {
		// setBoxBodyClass('box-body-refresh')
	}

	function onRefreshEnd() {
		// setBoxBodyClass('')
	}

	// ======================= Detect Transitions ======================= //
	useEffect(() => {
		const element = document.getElementById(boxId);

		element.addEventListener('transitionstart', (e) => {
			if(e.propertyName === 'width' && e.srcElement.id === boxId) { 
				setWidthTransitionFinished(false)
			}
		})

		element.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'width' && e.srcElement.id === boxId) { 
				setWidthTransitionFinished(true)
			}
		})
	}, [])

	useEffect(() => {
		const element = document.getElementById('content-container');

		element.addEventListener('transitionstart', (e) => {
			if(e.propertyName === 'height' && e.srcElement.id === 'content-container') { 
				setHeightTransitionFinished(false)
			}
		})

		element.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'height' && e.srcElement.id === 'content-container') { 
				setHeightTransitionFinished(true)
			}
		})
	}, [])

	// ======================= Set Class ======================= //
	// =========== box open / closed
	useEffect(() => {
		if(boxIsOpen) setBoxOpenClass('box-open')
		if(!boxIsOpen) setBoxOpenClass('box-closed')
	}, [boxIsOpen])

	// =========== content container open / closed
	useEffect(() => {
		if(contentContainerIsOpen) setContentContainerOpenClass('content-container-open')
		if(!contentContainerIsOpen) setContentContainerOpenClass('content-container-closed')
	}, [contentContainerIsOpen])	

	// ======================= Set Status ======================= //
	// box
	useEffect(() => {
		if(widthTransitionFinished) { 
			if(boxIsOpen) setBoxStatus('box-open')
			if(!boxIsOpen) setBoxStatus('box-closed')

			setWidthTransitionFinished(false)
		} 
	}, [widthTransitionFinished])

	// content container 

 
	// =========== listen for content container open and close
	// useEffect(() => {
	// 	if(heightTransitionFinished) {
	// 		if(boxIsOpen) setContentContainerClass('content-container-open')
	// 		if(!boxIsOpen) setContentContainerClass('content-container-closed')

	// 		setWidthTransitionFinished(false)
	// 	} 
	// }, [heightTransitionFinished, boxIsOpen]) 

	// ======================= Trigger Functions ======================= //
	useEffect(() => {
		if(boxStatus === 'box-open') onBoxOpen()
		if(boxStatus === 'box-closed') onBoxClosed()
	}, [boxStatus])

	useEffect(() => {
		if(resizeStatus === 'display-box-resizing') onRefreshStart()
		if(resizeStatus === 'display-box-resize-finished') onRefreshEnd() 
	}, [resizeStatus])

	// ======================= Console logs ======================= // 
	// useEffect(() => {
	// 	console.log('boxIsOpen', boxIsOpen)
	// }, [boxIsOpen])

	// useEffect(() => {
	// 	console.log('resizeStatus', resizeStatus)
	// }, [resizeStatus])

	// ======================= Component ======================= //
	return (
		<div>
		boxStatus: {boxStatus}
		<div className={`box box-open-close-transition ${boxOpenClass}`} id={boxId}>
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
				<div className={`content-container ${contentContainerOpenClass}`} id="content-container">
					{
						  
					}
				</div>
			</div>
		</div>

		</div>
	)
}

// =========== set box status 
	// useEffect(() => {
	// 	// closing
	// 	if(!boxIsOpen 
	// 		&& boxStatus === 'box-open'
	// 		&& !widthTransitionFinished) setBoxStatus('box-closing')

	// 	// closed
	// 	if(!boxIsOpen
	// 		&& boxStatus === 'box-closing'
	// 		&& widthTransitionFinished) setBoxStatus('box-closed')

	// 	if(widthTransitionFinished) {
	// 		console.log('width trans fin')
	// 		if(boxIsOpen) setBoxStatus('box-open')
	// 		if(!boxIsOpen) setBoxStatus('box-closed')

	// 		setWidthTransitionFinished(false)
	// 	} 

	// 	if(!widthTransitionFinished) {
	// 		console.log('width trans not fin')
	// 		if(boxIsOpen) setBoxStatus('box-opening')
	// 		if(!boxIsOpen) setBoxStatus('box-closing')
	// 	} 
	// }, [boxIsOpen, boxStatus])