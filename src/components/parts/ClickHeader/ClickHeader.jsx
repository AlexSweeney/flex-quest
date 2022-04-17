import React, {useState, useEffect} from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {
	getElementHeight,
	setElementHeight,
	removeInlineSize,
	triggerOnTransitionEnd,
} from '../../../utils/utils.js';
import './ClickHeaderStyle.css'; 

export default function ClickHeader({ 
	i,
	title,
	thisStyle,
	selectedStyle,
	handleClick,
	children,
}) {  
	/* 
		* show header
		* show open close icon

		* on click header
			* call handleClick
		
		* on click icon 
			* animate icon 90deg down / up
			* change icon color when animating
			* open / close text
			* animate text open / close

		* on selected / deselected (set by handleClick)
			* add / remove highlight color to target  
	*/

	/* =================================== Constants ======================================= */
	/* ===================== Ids */
	const playIconId = `click-header-play-icon-${i}`;
	const textContainerId = `click-header-text-container-${i}`;

	/* ===================== Status */
	const [titleIsSelected, setTitleIsSelected] = useState(false);
	const [showText, setShowText] = useState(false); 
	const [textContainerHeight, setTextContainerHeight] = useState(null);

	/* ===================== Classes */ 
	const [titleSelectedClass, setTitleSelectedClass] = useState('click-header-title-not-selected');
	const [playIconAnimatingClass, setPlayIconAnimatingClass] = useState('click-header-play-icon-not-animating');
	const [playIconDownClass, setPlayIconDownClass] = useState('click-header-play-icon-up');
	const [showTextClass, setShowTextClass] = useState('click-header-text-container-init');
	const [textBackgroundColorClass, setTextBackgroundColorClass] = useState('click-header-title-container-not-selected');

	/* =================================== Event Handlers =================================== */
	function onRender() {  
		if(!textContainerHeight) {
			saveTextContainerHeight() 
			hideTextContainer() 
		} 
	}
 
	function onTitleClick() {
		handleClick(thisStyle)
	}

	function onPlayIconClick() {
		if(showText) {
			closePlayIcon()
			closeTextContainer()
		}
		if(!showText) {
			openPlayIcon()
			openTextContainer() 
		}
	}
 
	function onPlayIconClosed() { 
		setPlayIconAnimatingClass('click-header-play-icon-not-animating')
	}

	function onSelectedStyleChange(selectedStyle) {
		if(selectedStyle === thisStyle) onTitleSelected()
		if(selectedStyle !== thisStyle) onTitleDeselected()
	}

	function onTitleSelected() {
		setTitleSelectedClass('click-header-title-selected')
		setTextBackgroundColorClass('click-header-title-container-selected')
	}

	function onTitleDeselected() {
		setTitleSelectedClass('click-header-title-not-selected')
		setTextBackgroundColorClass('click-header-title-container-not-selected')
	}

	/* =================================== Helper Fns ======================================= */
	function openPlayIcon() { 
		setPlayIconDownClass('click-header-play-icon-down')
	}

	function closePlayIcon() {
		triggerOnTransitionEnd(playIconId, 'transform', onPlayIconClosed)
		setPlayIconAnimatingClass('click-header-play-icon-animating')
		setPlayIconDownClass('click-header-play-icon-up')
	}

	function openTextContainer() {
		setShowText(true)
		setElementHeight(textContainerId, textContainerHeight)
		setShowTextClass('click-header-text-container-show-text')
	}

	function closeTextContainer() {
		setShowText(false)
		removeInlineSize(textContainerId)
		setShowTextClass('click-header-text-container-hide-text') 
	}

	function saveTextContainerHeight() {
		const height = getElementHeight(textContainerId); 
		setTextContainerHeight(height)
	}

	function hideTextContainer() { 
		setShowTextClass('click-header-text-container-hide-text')
	}

	/* =================================== Listen / Trigger =================================== */
	useEffect(() => {
		onRender()
	}, [])
 
	useEffect(() => { 
		onSelectedStyleChange(selectedStyle)
	}, [selectedStyle])

	/* =================================== Output ============================================= */
	return (
		<div className='click-header'>
			<div className={`click-header-title-container ${textBackgroundColorClass}`}> 
				<h2 className={`click-header-title ${titleSelectedClass}`} onClick={onTitleClick}>{title}</h2>
				<PlayArrowIcon className={`click-header-play-icon ${playIconDownClass} ${playIconAnimatingClass}`} onClick={onPlayIconClick} id={playIconId}/>
			</div> 

			<div className={`click-header-text-container ${showTextClass}`} id={textContainerId}>
				{children}
			</div>
		</div>  
	)
}