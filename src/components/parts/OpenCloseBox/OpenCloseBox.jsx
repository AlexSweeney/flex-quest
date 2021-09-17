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
	//const [contentContainerStatus, setContentContainerStatus] = useState('content-container-open');

	const [toggleIsOpen, setToggleIsOpen] = useState(!boxIsOpen); 

	const [widthTransitionFinished, setWidthTransitionFinished] = useState(false);
	const [heightTransitionFinished, setHeightTransitionFinished] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ======================= Status ======================= //
	const [boxOpenStatus, setBoxOpenStatus] = useState('box-open');
	const [boxBodyClass, setBoxBodyClass] = useState('');
	const [contentContainerOpenStatus, setContentContainerOpenStatus] = useState('content-container-open');

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

	useEffect(() => {
		console.log('contentContainerOpenStatus', contentContainerOpenStatus)
	}, [contentContainerOpenStatus])
	 
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
						 children
					}
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