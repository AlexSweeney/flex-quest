import React, {useState, useEffect} from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './ClickHeaderStyle.css'; 

export default function ClickHeader({title, i, selectedHeader, setSelectedHeader, setSelectedStyle, thisStyle, children}) { 
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
	// const [headerSelected, setHeaderSelected] = useState(false);
	const [containerHeight, setContainerHeight] = useState(null);

	// ================================= Class ============================== // 
	const [playIconClass, setPlayIconClass] = useState('play-icon');
	const [headerSelectedClass, setHeaderSelectedClass] = useState('info-header-unselected')
	const [showChildrenClass, setShowChildrenClass] = useState('children-init')

	// ================================= Event Handler ============================== // 
	function onHeaderClick() {
		setSelectedHeader(newVal => {
			if(newVal === headerId) return '';
			return headerId;
		})
	}

	function onIconClick() {
		setShowChildren(oldVal => !oldVal);
		setPlayIconAnimating(true);
	}

	function handleTransitionEnd(e) { 
		if(e.propertyName === 'transform') setPlayIconAnimating(false)
	}

	function onChildrenVisible() {
		setContainerHeightToFull()
	}

	function onChildrenHidden() {
		setContainerHeightToZero()
	}

	function onSelectHeader() {
		setHeaderSelectedClass('info-header-selected')
		setSelectedStyle(thisStyle)
	}

	function onDeselectHeader() {
		setHeaderSelectedClass('info-header-unselected')
		setSelectedStyle(null)
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
	// header
	useEffect(() => { 
		if(selectedHeader === headerId) onSelectHeader()
		else onDeselectHeader()
	}, [selectedHeader])
 
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

	// child container
	useEffect(() => {
		if(showChildren) {
			setShowChildrenClass('children-visible') 
			onChildrenVisible()
		}

		if(!showChildren) {
			setShowChildrenClass('children-hidden')  
			onChildrenHidden()
		}
	}, [showChildren])

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