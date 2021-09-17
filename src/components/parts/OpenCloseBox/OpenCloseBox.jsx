import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './../OpenCloseToggle/OpenCloseToggle.jsx'; 
import './OpenCloseBox.css';

export default function OpenCloseBox({
	title = '',
	buttons = [],
	boxIsOpen = true,
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
		show title  
		show buttons 
		open and close on press toggle

		animate 
			close - x then y
			open - x then y
	*/
	
	// ======================= Id's ======================= //
	const boxId = 'box';
	const id = 'box';

	// ======================= Classes ======================= //
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [boxBodyClass, setBoxBodyClass] = useState('');

	// ======================= Status ======================= // 
	const [boxOpenStatus, setBoxOpenStatus] = useState(true);

	const [toggleIsOpen, setToggleIsOpen] = useState(!boxIsOpen); 
	const [toggleClicked, setToggleClicked] = useState(false);

	const [widthTransitionFinished, setWidthTransitionFinished] = useState(false);
	const [heightTransitionFinished, setHeightTransitionFinished] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ======================= Event Handlers ======================= //
	function clickOpenCloseToggle() {
		setToggleClicked(true)
	}

	function onBoxClosing() {
		setBoxOpenClass('box-closed')
		setBoxBodyClass('box-body-closed')
		setIsAnimating(true)
	}

	function onBoxClosed() {
		setToggleIsOpen(true)
		setIsAnimating(false)
		setBoxOpenClass('box-closed')
	}

	function onBoxOpening() { 
		setBoxOpenClass('box-open')
		setBoxBodyClass('box-body-open')
		setIsAnimating(true)
	}

	function onBoxOpen() {
		setToggleIsOpen(false)
		setIsAnimating(false)
		setBoxOpenStatus('box-open')
	}

	function onRefreshStart() {
		setBoxBodyClass('box-body-refresh')
	}

	function onRefreshEnd() {
		setBoxBodyClass('')
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

	// ======================= Set Status ======================= //
	// =========== start open / close
	useEffect(() => {
		if(toggleClicked) {
			if(boxIsOpen) setBoxOpenStatus('box-opening')
			if(!boxIsOpen) setBoxOpenStatus('box-closing') 

			setToggleClicked(false)
		}
	}, [boxIsOpen, toggleClicked])

	// =========== listen for open and close
	useEffect(() => {
		if(widthTransitionFinished) {
			if(boxIsOpen) setBoxOpenStatus('box-open')
			if(!boxIsOpen) setBoxOpenStatus('box-closed')

			setWidthTransitionFinished(false)
		} 
	}, [widthTransitionFinished, boxIsOpen]) 

	// ======================= Trigger Functions ======================= //
	useEffect(() => {
		if(boxOpenStatus === 'box-open') onBoxOpen()
		if(boxOpenStatus === 'box-opening') onBoxOpening()
		if(boxOpenStatus === 'box-closed') onBoxClosed()
		if(boxOpenStatus === 'box-closing') onBoxClosing()
	}, [boxOpenStatus])

	useEffect(() => {
		if(resizeStatus === 'display-box-resizing') onRefreshStart()
		if(resizeStatus === 'display-box-resize-finished') onRefreshEnd() 
	}, [resizeStatus])

	// ======================= Console logs ======================= // 
	// useEffect(() => {
	// 	console.log('boxOpenStatus', boxOpenStatus)
	// }, [boxOpenStatus])

	// useEffect(() => {
	// 	console.log('resizeStatus', resizeStatus)
	// }, [resizeStatus])

	// ======================= Component ======================= //
	return (
		<div className={`box box-open-close-transition ${boxOpenClass}`} id={id}>
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
				{
					children && children	
				}
			</div>
		</div>
	)
}