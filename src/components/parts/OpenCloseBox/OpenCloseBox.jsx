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
	*/
	
	// ======================= Id's ======================= //
	const boxId = 'box';
	const id = 'box';

	// ======================= Classes ======================= //
	const [boxOpenClass, setBoxOpenClass] = useState('box-open');
	const [boxBodyClass, setBoxBodyClass] = useState('');

	// ======================= Status ======================= // 
	const [boxIsOpen, setBoxIsOpen] = useState(true);
	const [boxWidthStatus, setBoxWidthStatus] = useState('box-open');

	const [toggleIsOpen, setToggleIsOpen] = useState(!boxIsOpen); 
	const [toggleClicked, setToggleClicked] = useState(false);

	const [widthTransitionFinished, setWidthTransitionFinished] = useState(false);
	const [heightTransitionFinished, setHeightTransitionFinished] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ======================= Event Handlers ======================= //
	function clickOpenCloseToggle() {
		setToggleClicked(true)
		setBoxIsOpen(oldVal => !oldVal)
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
		setBoxIsOpen('box-open')
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
			if(boxIsOpen) setBoxWidthStatus('box-opening')
			if(!boxIsOpen) setBoxWidthStatus('box-closing') 

			setToggleClicked(false)
		}
	}, [boxIsOpen, toggleClicked])

	// =========== listen for open and close
	useEffect(() => {
		if(widthTransitionFinished) {
			if(boxIsOpen) setBoxWidthStatus('box-open')
			if(!boxIsOpen) setBoxWidthStatus('box-closed')

			setWidthTransitionFinished(false)
		} 
	}, [widthTransitionFinished, boxIsOpen]) 

	// ======================= Trigger Functions ======================= //
	useEffect(() => {
		if(boxWidthStatus === 'box-open') onBoxOpen()
		if(boxWidthStatus === 'box-opening') onBoxOpening()
		if(boxWidthStatus === 'box-closed') onBoxClosed()
		if(boxWidthStatus === 'box-closing') onBoxClosing()
	}, [boxWidthStatus])

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