import React, {useState, useEffect} from 'react'; 
import OpenCloseToggle from './OpenCloseToggle/OpenCloseToggle.jsx'
import {detectTransition, detectTransitions} from './../utils.js';
import './LearnBox.css';

export default function LearnBox({buttons, title, i, isAnimating, setIsAnimating, learnBoxStatus, setLearnBoxStatus, contentContainerClass, setContentContainerClass, children}) {
	// ======================== Variables ======================== //
	// =============== Ids
	const learnBoxId = `learn-box-${i}`;
	const contentContainerId = `content-container`;

	// =============== States
	const [learnBoxIsOpen, setLearnBoxIsOpen] = useState(true);
	const [learnBoxIsAnimating, setLearnBoxIsAnimating] = useState(false);

	const [contentContainerIsAnimating, setContentContainerIsAnimating] = useState(false);

	const [openCloseToggleIsOpen, setOpenCloseToggleIsOpen] = useState(false);

	// =============== Status
	const [contentContainerStatus, setContentContainerStatus] = useState('content-container-open');

	// =============== Class
	const learnBoxOpenClass = learnBoxIsOpen ? 'learn-box-open' : 'learn-box-closed';
	const [learnBoxBodyClass, setLearnBoxBodyClass] = useState('');
	
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

	// ======================== Trigger Animations ==================== //
	useEffect(() => {
		// trigger content container animations when learnBox has finished
		if(learnBoxStatus === 'learn-box-closed') {
			setContentContainerStatus('content-container-closing')
		} 

		if(learnBoxStatus === 'learn-box-open' && contentContainerStatus !== 'content-container-open') {
			setContentContainerStatus('content-container-opening')
		} 
	}, [learnBoxStatus])

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

	// =========== detect status content container 
	useEffect(() => {
		// detect start and end of animations
		if(!contentContainerIsAnimating && contentContainerStatus === 'content-container-closing') {
			setContentContainerStatus('content-container-closed')
		} else if(!contentContainerIsAnimating && contentContainerStatus === 'content-container-opening') {
			setContentContainerStatus('content-container-open')
		}
	}, [contentContainerIsAnimating])

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
	
	// ======================== Set Classes ======================== //
	// =========== body class
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-closing') {
			setLearnBoxBodyClass('learn-box-body-closing')
		} else if(learnBoxStatus === 'learn-box-closed') {
			setLearnBoxBodyClass('learn-box-body-closed')
		} else if(learnBoxStatus === 'learn-box-opening') {
			setLearnBoxBodyClass('learn-box-body-opening')
		} else if(learnBoxStatus === 'learn-box-open') {
			setLearnBoxBodyClass('learn-box-body-open')
		}
	}, [learnBoxStatus])

	// =========== content container open / closed
	useEffect(() => {
		let newClass;

		if(contentContainerStatus === 'content-container-open') {
			newClass = 'content-container-open';
		} else if(contentContainerStatus === 'content-container-opening') {
			newClass = 'content-container-opening'; 
		} else if(contentContainerStatus === 'content-container-closed') {
			newClass = 'content-container-closed';
		} else if(contentContainerStatus === 'content-container-closing') {
			newClass = 'content-container-closing';
		}

		setContentContainerClass(newClass)
	}, [contentContainerStatus])

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

			<div className={`learn-box-body ${learnBoxBodyClass}`}>
				<div className={`content-container ${contentContainerClass}`} id={contentContainerId}>
					{
						children && children	
					}
				</div>
			</div>
		</div>
	)
}