import React, {useState, useEffect} from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './ClickHeaderStyle.css'; 

export default function ClickHeader({
	title, 
	i, 
	selectedHeader,
	setSelectedHeader, 
	handleClick, 
	thisStyle, 
	children}) {  
	/* 
		* title, i 

		* show header and icon
		
		* on click icon = toggle body text on / off

		* on click header = apply header style + add color to header
		* on reclick header = remove header style  + remove color from header
	*/

	// ================================= Ids ============================== // 
	const playIconId = `play-icon-${i}`;
	const childContainerId = `child-container-${i}`; 
	const headerId = `info-header-${i}`;

	// ================================= State ============================== // 
	const [showChildren, setShowChildren] = useState(false); 
	const [playIconAnimating, setPlayIconAnimating] = useState(false);
	const [containerHeight, setContainerHeight] = useState(null);

	// ================================= Class ============================== // 
	const [playIconClass, setPlayIconClass] = useState('play-icon');
	const [headerSelectedClass, setHeaderSelectedClass] = useState('info-header-unselected')
	const [showChildrenClass, setShowChildrenClass] = useState('children-init')

	// ================================= Event Handlers ============================== // 
	function onHeaderClick() {
		toggleSelectedHeader()
	}

	function onIconClick() {
		setShowChildren(oldVal => !oldVal);
		setPlayIconAnimating(true);
	}

	function handleTransitionEnd(e) { 
		if(e.propertyName === 'transform') setPlayIconAnimating(false)
	}

	function onShowChildren() {
		setShowChildrenClass('children-visible') 
		setContainerHeightToFull()
	}

	function onHideChildren() {
		setShowChildrenClass('children-hidden')  
		setContainerHeightToZero()
	} 

	function onSelectHeader() {
		setHeaderSelectedClass('info-header-selected')
		handleClick(thisStyle)
	}

	function onDeselectHeader() {
		setHeaderSelectedClass('info-header-unselected')
		handleClick(null)
	}

	// ================================= Helper Fns ============================== // 
	function getContainerHeight() {
		const childContainerElement = document.getElementById(childContainerId);

		const height = getComputedStyle(childContainerElement).height;
		setContainerHeight(height)
	}

	function setContainerHeightToFull() {
		const childContainerElement = document.getElementById(childContainerId);
		childContainerElement.style.height = containerHeight;
	}

	function setContainerHeightToZero() {
		const childContainerElement = document.getElementById(childContainerId);
		childContainerElement.style.height = 0;
	} 

	function toggleSelectedHeader() {
		setSelectedHeader(newVal => {
			if(newVal === headerId) return '';
			return headerId;
		})
	}

	// ================================= Detect Transition End ============================== // 
	useEffect(() => {
		const playIconElement = document.getElementById(playIconId);

		if(playIconAnimating) playIconElement.addEventListener('transitionend', handleTransitionEnd)
		
		return () => { playIconElement.removeEventListener('transitionend', handleTransitionEnd) }
	}, [playIconAnimating])

	// ================================= Get Container Height ============================== //
	useEffect(() => {
		getContainerHeight()
	}, [])

	// ================================= Trigger handlers ============================== //
	// select header
	useEffect(() => { 
		if(selectedHeader === headerId) onSelectHeader()
		else onDeselectHeader()
	}, [selectedHeader])

	// show / hide children
	useEffect(() => {
		if(showChildren) onShowChildren()
		if(!showChildren) onHideChildren()
	}, [showChildren])
 
	// ================================= Set Classes ============================== //
	// play icon
	useEffect(() => { 
		let newClass = 'play-icon';

		if(playIconAnimating) { 
			newClass += ' play-icon-animating';
		} 

		if(showChildren) {
			newClass += ' play-icon-selected';
		}

		setPlayIconClass(newClass);
	}, [playIconAnimating, showChildren])

	// ================================= Output ============================== //
	return (
		<div className='click-header'>
			<div className='header-container'> 
				<h2 className={`info-header ${headerSelectedClass}`} 
						onClick={onHeaderClick} 
						id={headerId}>{title}</h2>
				<PlayArrowIcon className={playIconClass} onClick={onIconClick} id={playIconId}/>
			</div> 
			<div className={`child-container ${showChildrenClass}`} id={childContainerId}>
				{children}
			</div>
		</div>
	)
}