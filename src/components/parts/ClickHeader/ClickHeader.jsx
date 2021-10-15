import React, {useState, useEffect} from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {
	getElementHeight,
	setElementHeight,
	removeInlineSize,
	triggerOnTransitionEnd,
} from './../../utils.js';
import './ClickHeaderStyle.css'; 

export default function ClickHeader({
	/*title, 
	i, 
	selectedHeader,
	setSelectedHeader, 
	setSelectedStyle, 
	thisStyle, */
	i,
	title,
	thisStyle,
	handleStyleOptionClick,
	children,
}) {  
	/* 
		* show header
		* show open close icon

		* on click header
			* call handleStyleOptionClick
		
		* on click icon 
			* animate icon 90deg down / up
			* change icon color when animating
			* open / close text
			* animate text open / close

		* on selected / deselected (set by handleStyleOptionClick)
			* add / remove highlight color to target  
	*/

	/* =================================== Constants ======================================= */
	/* ===================== Ids */
	const playIconId = `play-icon-${i}`;
	const textContainerId = `text-container-${i}`;

	/* ===================== Status */
	const [isSelected, setIsSelected] = useState(false);
	const [showText, setShowText] = useState(false); 
	const [textContainerHeight, setTextContainerHeight] = useState(null);

	/* ===================== Classes */ 
	const [titleSelectedClass, setTitleSelectedClass] = useState('title-not-selected');
	const [playIconAnimatingClass, setPlayIconAnimatingClass] = useState('play-icon-not-animating');
	const [playIconDownClass, setPlayIconDownClass] = useState('play-icon-up');
	const [showTextClass, setShowTextClass] = useState('text-container-init');

	/* =================================== Event Handlers =================================== */
	function onRender() {  
		if(!textContainerHeight) {
			saveTextContainerHeight() 
			hideTextContainer() 
		} 
	}
 
	function onHeaderClick() {
		handleStyleOptionClick(thisStyle, setIsSelected)
	}

	function onIconClick() {
		if(showText) {
			closeIcon()
			closeTextContainer()
		}
		if(!showText) {
			openIcon()
			openTextContainer() 
		}
	}
 
	function onIconClosed() { 
		setPlayIconAnimatingClass('play-icon-not-animating')
	}

	function onTitleSelected() {
		setTitleSelectedClass('title-selected')
	}

	function onTitleDeselected() {
		setTitleSelectedClass('title-not-selected')
	}

	/* =================================== Helper Fns ======================================= */
	function openIcon() { 
		setPlayIconDownClass('play-icon-down')
	}

	function closeIcon() {
		triggerOnTransitionEnd(playIconId, 'transform', onIconClosed)
		setPlayIconAnimatingClass('play-icon-animating')
		setPlayIconDownClass('play-icon-up')
	}

	function openTextContainer() {
		setShowText(true)
		setElementHeight(textContainerId, textContainerHeight)
		setShowTextClass('text-container-show-text')
	}

	function closeTextContainer() {
		setShowText(false)
		removeInlineSize(textContainerId)
		setShowTextClass('text-container-hide-text') 
	}

	function saveTextContainerHeight() {
		const height = getElementHeight(textContainerId); 
		setTextContainerHeight(height)
	}

	function hideTextContainer() { 
		setShowTextClass('text-container-hide-text')
	}

	/* =================================== Listen / Trigger =================================== */
	useEffect(() => {
		onRender()
	}, [])

	useEffect(() => {
		if(isSelected) onTitleSelected()
		if(!isSelected) onTitleDeselected()
	}, [isSelected])

	/* =================================== Output ============================================= */
	return (
		<div className='click-header'>
			<div className='header-container'> 
				<h2 className={`info-header ${titleSelectedClass}`} onClick={onHeaderClick}>{title}</h2>
				<PlayArrowIcon className={`play-icon ${playIconDownClass} ${playIconAnimatingClass}`} onClick={onIconClick} id={playIconId}/>
			</div> 

			<div className={`text-container ${showTextClass}`} id={textContainerId}>
				{children}
			</div>
		</div>  
	)
}

	// ================================= Ids ============================== // 
	// const playIconId = `play-icon-${i}`;
	// const childContainerId = `child-container-${i}`; 
	// const headerId = `info-header-${i}`;

	// ================================= State ============================== // 
	// const [showChildren, setShowChildren] = useState(false); 
	// const [playIconAnimating, setPlayIconAnimating] = useState(false);
	// const [containerHeight, setContainerHeight] = useState(null);

	// ================================= Class ============================== // 
	// const [playIconClass, setPlayIconClass] = useState('play-icon');
	// const [headerSelectedClass, setHeaderSelectedClass] = useState('info-header-unselected')
	// const [showChildrenClass, setShowChildrenClass] = useState('children-init')

	// ================================= Event Handlers ============================== // 
	// function onHeaderClick() {
	// 	toggleSelectedHeader()
	// }

	// function onIconClick() {
	// 	setShowChildren(oldVal => !oldVal);
	// 	setPlayIconAnimating(true);
	// }

	// function handleTransitionEnd(e) { 
	// 	if(e.propertyName === 'transform') setPlayIconAnimating(false)
	// }

	// function onShowChildren() {
	// 	setShowChildrenClass('children-visible') 
	// 	setContainerHeightToFull()
	// }

	// function onHideChildren() {
	// 	setShowChildrenClass('children-hidden')  
	// 	setContainerHeightToZero()
	// } 

	// function onSelectHeader() {
	// 	setHeaderSelectedClass('info-header-selected')
	// 	setSelectedStyle(thisStyle)
	// }

	// function onDeselectHeader() {
	// 	setHeaderSelectedClass('info-header-unselected')
	// 	setSelectedStyle(null)
	// }

	// ================================= Helper Fns ============================== // 
	// function getContainerHeight() {
	// 	const childContainerElement = document.getElementById(childContainerId);

	// 	const height = getComputedStyle(childContainerElement).height;
	// 	setContainerHeight(height)
	// }

	// function setContainerHeightToFull() {
	// 	const childContainerElement = document.getElementById(childContainerId);
	// 	childContainerElement.style.height = containerHeight;
	// }

	// function setContainerHeightToZero() {
	// 	const childContainerElement = document.getElementById(childContainerId);
	// 	childContainerElement.style.height = 0;
	// } 

	// function toggleSelectedHeader() {
	// 	setSelectedHeader(newVal => {
	// 		if(newVal === headerId) return '';
	// 		return headerId;
	// 	})
	// }

	// ================================= Detect Transition End ============================== // 
	// useEffect(() => {
	// 	const playIconElement = document.getElementById(playIconId);

	// 	if(playIconAnimating) playIconElement.addEventListener('transitionend', handleTransitionEnd)
		
	// 	return () => { playIconElement.removeEventListener('transitionend', handleTransitionEnd) }
	// }, [playIconAnimating])

	// ================================= Get Container Height ============================== //
	// useEffect(() => {
	// 	getContainerHeight()
	// }, [])

	// ================================= Trigger handlers ============================== //
	// select header
	// useEffect(() => { 
	// 	if(selectedHeader === headerId) onSelectHeader()
	// 	else onDeselectHeader()
	// }, [selectedHeader])

	// // show / hide children
	// useEffect(() => {
	// 	if(showChildren) onShowChildren()
	// 	if(!showChildren) onHideChildren()
	// }, [showChildren])
 
	// ================================= Set Classes ============================== //
	// play icon
	// useEffect(() => { 
	// 	let newClass = 'play-icon';

	// 	if(playIconAnimating) { 
	// 		newClass += ' play-icon-animating';
	// 	} 

	// 	if(showChildren) {
	// 		newClass += ' play-icon-selected';
	// 	}

	// 	setPlayIconClass(newClass);
	// }, [playIconAnimating, showChildren])
