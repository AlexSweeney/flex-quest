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
	const initialBoxStatus = boxIsOpen ? 'learn-box-open' : 'learn-box-closed';
	const [learnBoxClass, setLearnBoxClass] = useState(initialBoxStatus);
	const [learnBoxBodyClass, setLearnBoxBodyClass] = useState(initialBoxStatus);

	// ======================= Status ======================= // 
	const [toggleIsOpen, setToggleIsOpen] = useState(!boxIsOpen); 
	const [toggleClicked, setToggleClicked] = useState(false);

	const [isTransitionEnd, setIsTranstionEnd] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// ======================= Event Handlers ======================= //
	function clickOpenCloseToggle() {
		handleOpenCloseToggleClick()
		setToggleClicked(true)
	}

	function onClickBoxOpen() {
		console.log('click box open')
		setLearnBoxClass('learn-box-open')
		setLearnBoxBodyClass('learn-box-body-open')
		setIsAnimating(true)
		setLearnBoxStatus('learn-box-opening')
	}

	function onClickBoxClosed() {
		setLearnBoxClass('learn-box-closed')
		setLearnBoxBodyClass('learn-box-body-closed')
		setIsAnimating(true)
		setLearnBoxStatus('learn-box-closing')
	}

	function onBoxOpen() {
		setToggleIsOpen(false)
		setIsAnimating(false)
		setLearnBoxStatus('learn-box-open')
	}

	function onBoxClosed() {
		setToggleIsOpen(true)
		setIsAnimating(false)
		setLearnBoxStatus('learn-box-closed')
	}

	// ======================= Detect Events ======================= //
	// =========== start open / close
	useEffect(() => {
		if(toggleClicked) {
			if(boxIsOpen) onClickBoxOpen()
			if(!boxIsOpen) onClickBoxClosed()

			setToggleClicked(false)
		}
	}, [boxIsOpen, toggleClicked])

	// =========== detect transition end
	useEffect(() => {
		const element = document.getElementById(learnBoxId);

		element.addEventListener('transitionstart', (e) => {
			if(e.propertyName === 'width' && e.srcElement.id === learnBoxId) { 
				setIsTranstionEnd(false)
			}
		})

		element.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'width' && e.srcElement.id === learnBoxId) { 
				setIsTranstionEnd(true)
			}
		})
	}, [])

	// =========== trigger transtion end function
	useEffect(() => {
		if(isTransitionEnd) {
			if(boxIsOpen) onBoxOpen()
			if(!boxIsOpen) onBoxClosed()
			setIsTranstionEnd(false)
		}
	}, [boxIsOpen, isTransitionEnd]) 

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