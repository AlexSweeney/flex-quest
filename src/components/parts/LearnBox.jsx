import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './OpenCloseToggle/OpenCloseToggle.jsx'
import {detectTransition, detectTransitions} from './../utils.js';
import './LearnBox.css';

export default function LearnBox({buttons, title, i, isAnimating, setIsAnimating, learnBoxStatus, setLearnBoxStatus, children}) {
	// ======================== Variables ======================== //
	// =============== Ids
	const learnBoxId = `learn-box-${i}`;
	const contentContainerId = `content-container-${i}`;

	// =============== States
	const [learnBoxIsOpen, setLearnBoxIsOpen] = useState(true);
	const [learnBoxIsAnimating, setLearnBoxIsAnimating] = useState(false);

	const [contentContainerIsAnimating, setContentContainerIsAnimating] = useState(false);

	const [openCloseToggleIsOpen, setOpenCloseToggleIsOpen] = useState(false);

	// =============== Status
	const [contentContainerStatus, setContentContainerStatus] = useState('content-container-open');

	// =============== Class
	const learnBoxOpenClass = learnBoxIsOpen ? 'learn-box-open' : 'learn-box-closed';

	const [contentContainerClass, setContentContainerClass] = useState('content-container-open');

 	// ======================== Handle Clicks ======================== //
 	function handleOpenCloseToggleClick() {
		setLearnBoxIsOpen(oldVal => !oldVal)
	}  

	// ======================== Animation detection fns() ======================== //
	function isOpen(learnBoxStatus, contentContainerStatus) {
		return learnBoxStatus === 'learn-box-open' 
		&& contentContainerStatus === 'content-container-open';
	}

	function isClosed(learnBoxStatus, contentContainerStatus) {
		return learnBoxStatus === 'learn-box-closed' 
		&& contentContainerStatus === 'content-container-closed';
	}

	function isOpening(learnBoxStatus, contentContainerStatus) {
		return learnBoxStatus === 'learn-box-opening' 
		&& contentContainerStatus === 'content-container-closed';
	}

	function isClosing(learnBoxStatus, contentContainerStatus) {
		return learnBoxStatus === 'learn-box-closing' 
		&& contentContainerStatus === 'content-container-open';
	}

	// ======================== Detect transitions ======================== //
	useEffect(() => {
		detectTransition(learnBoxId, 'width', setLearnBoxIsAnimating)
		detectTransition(contentContainerId, 'height', setContentContainerIsAnimating)
	}, [])

	// ======================== Set Status ======================== //
	// =========== set status learn box 
	useEffect(() => { 
		let newStatus;

		if(learnBoxIsAnimating) {
			newStatus = learnBoxIsOpen ? 'learn-box-opening' : 'learn-box-closing'; 
		} else {
			newStatus = learnBoxIsOpen ? 'learn-box-open' : 'learn-box-closed'; 
		}

		newStatus && setLearnBoxStatus(newStatus)
	}, [learnBoxIsAnimating])

	// =========== set status content container
	useEffect(() => {
		let newStatus;

		if(contentContainerIsAnimating) {
			if(learnBoxStatus === 'learn-box-open') {
				newStatus = 'content-container-opening';
			} 

			if(learnBoxStatus === 'learn-box-closed') {
				newStatus = 'content-container-closing';
			}
		} else {
			if(learnBoxStatus === 'learn-box-open' 
				&& contentContainerStatus === 'content-container-opening') {
				newStatus = 'content-container-open';
			} 

			if(learnBoxStatus === 'learn-box-closed' 
				&& contentContainerStatus === 'content-container-closing') {
				newStatus = 'content-container-closed';
			}
		}

		newStatus && setContentContainerStatus(newStatus)
	}, [contentContainerIsAnimating, learnBoxStatus, contentContainerStatus])

	// =========== set open-close-toggle open / closed
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') {
			setOpenCloseToggleIsOpen(false)
		} else if(learnBoxStatus === 'learn-box-closed') {
			setOpenCloseToggleIsOpen(true)
		}
	}, [learnBoxStatus])

	// =========== set isAnimating
	useEffect(() => {
		const args = [learnBoxStatus, contentContainerStatus];
		const finished = isOpen(...args) || isClosed(...args);  
		const starting = isOpening(...args) || isClosing(...args); 

		// start animation 
		if(starting) {
			setIsAnimating(true)
		} 
		// end animation
		if(finished) {
			setIsAnimating(false)
		}
	}, [learnBoxStatus, contentContainerStatus])
	
	// ======================== Set Class ======================== //
	// =========== content container open / closed
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') {
			setContentContainerClass('content-container-open')
		} else if(learnBoxStatus === 'learn-box-closed') {
			setContentContainerClass('content-container-closed')
		}
	}, [learnBoxStatus])

	// ======================== console logs ======================== //
	// =========== isAnimating
	// useEffect(() => {
	// 	console.log('isAnimating', isAnimating)
	// }, [isAnimating])

	// =========== learnBoxIsAnimating
	// useEffect(() => {
	// 	console.log('learnBoxIsAnimating', learnBoxIsAnimating)
	// }, [learnBoxIsAnimating])

	// =========== learnBoxStatus
	// useEffect(() => {
	// 	console.log('learnBoxStatus', learnBoxStatus)
	// }, [learnBoxStatus])

	// =========== contentContainerIsAnimating
	// useEffect(() => {
	// 	console.log('contentContainerIsAnimating', contentContainerIsAnimating)
	// }, [contentContainerIsAnimating])

	// =========== contentContainerStatus
	// useEffect(() => {
	// 	console.log('contentContainerStatus', contentContainerStatus)
	// }, [contentContainerStatus])
	
	return (
		<div className={`learn-box ${learnBoxOpenClass}`} id={learnBoxId}>
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
						toggleIsOpen={openCloseToggleIsOpen}
						handleClick={handleOpenCloseToggleClick}
						parentIsAnimating={isAnimating}
					/>
				</div>
			</div>

			<div className="learn-box-body">
				<div className={`content-container ${contentContainerClass}`} id={contentContainerId}>
					{
						children && children
					}
				</div>
			</div>
		</div>
	)
} 