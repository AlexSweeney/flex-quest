import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './OpenCloseToggle/OpenCloseToggle.jsx';
import {detectTransition, detectTransitions} from './../utils.js';
import './LearnBox.css';

export default function LearnBox({
	boxIsOpen = true,
	buttons = null,
	title = '',
	id = 'learn-box',
	handleOpenCloseToggleClick = null,
	learnBoxStatus,
	setLearnBoxStatus,
	children = null,
}) {
	
	// ======================= Id's ======================= //
	const learnBoxId = id;

	// ======================= Classes ======================= //
	const [learnBoxClass, setLearnBoxClass] = useState('learn-box-open');
	const [learnBoxBodyClass, setLearnBoxBodyClass] = useState('learn-box-body-open');

	// ======================= Status ======================= // 
	const [toggleIsOpen, setToggleIsOpen] = useState(!boxIsOpen); 
	const [toggleClicked, setToggleClicked] = useState(false);

	const [widthTransitionFinished, setWidthTransitionFinished] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ======================= Event Handlers ======================= //
	function clickOpenCloseToggle() {
		handleOpenCloseToggleClick()
		setToggleClicked(true)
	}

	function onBoxClosing() {
		setLearnBoxClass('learn-box-closed')
		setLearnBoxBodyClass('learn-box-body-closed')
		setIsAnimating(true)
	}

	function onBoxClosed() {
		setToggleIsOpen(true)
		setIsAnimating(false)
		setLearnBoxStatus('learn-box-closed')
	}

	function onBoxOpening() { 
		setLearnBoxClass('learn-box-open')
		setLearnBoxBodyClass('learn-box-body-open')
		setIsAnimating(true)
	}

	function onBoxOpen() {
		setToggleIsOpen(false)
		setIsAnimating(false)
		setLearnBoxStatus('learn-box-open')
	}

	// ======================= Set Status ======================= //
	// =========== start open / close
	useEffect(() => {
		if(toggleClicked) {
			if(boxIsOpen) setLearnBoxStatus('learn-box-opening')
			if(!boxIsOpen) setLearnBoxStatus('learn-box-closing') 

			setToggleClicked(false)
		}
	}, [boxIsOpen, toggleClicked])

	// =========== detect width changing
	useEffect(() => {
		const element = document.getElementById(learnBoxId);

		element.addEventListener('transitionstart', (e) => {
			if(e.propertyName === 'width' && e.srcElement.id === learnBoxId) { 
				setWidthTransitionFinished(false)
			}
		})

		element.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'width' && e.srcElement.id === learnBoxId) { 
				setWidthTransitionFinished(true)
			}
		})
	}, [])

	// =========== listen for open and close
	useEffect(() => {
		if(widthTransitionFinished) {
			if(boxIsOpen) setLearnBoxStatus('learn-box-open')
			if(!boxIsOpen) setLearnBoxStatus('learn-box-closed')

			setWidthTransitionFinished(false)
		} 
	}, [widthTransitionFinished, boxIsOpen]) 

	// ======================= Trigger Functions ======================= //
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') onBoxOpen()
		if(learnBoxStatus === 'learn-box-opening') onBoxOpening()
		if(learnBoxStatus === 'learn-box-closed') onBoxClosed()
		if(learnBoxStatus === 'learn-box-closing') onBoxClosing()
	}, [learnBoxStatus])

	// ======================= Console logs ======================= // 
	useEffect(() => {
		console.log('learnBoxStatus', learnBoxStatus)
	}, [learnBoxStatus])

	// ======================= Component ======================= //
	return (
		<div className={`learn-box learn-box-open-close-transition ${learnBoxClass}`} id={id}>
			<div className="learn-box-header">
				<div className="learn-box-buttons-container">
					{buttons && buttons.map(button => {
						return (<div className="learn-box-button">
							 {button}
						</div>)
					})}
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

			<div className={`learn-box-body scroll-bar-transition`} id="learn-box-body"> 
				{
					children && children	
				}
			</div>
		</div>
	)
}