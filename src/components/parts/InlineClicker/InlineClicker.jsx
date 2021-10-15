import React, {useState, useEffect} from 'react';
import './InlineClicker.css';

export default function InlineClicker({ 
	thisStyle,
	selectedStyle,
	handleClick,
	children,
}) {   
	/*
		on click 
			* call handle click
	
		on selected
			* add highlight color
		
		on deselected
			* remove highlight color 
	*/
	// =========================== Constants =========================== //
	const [selectedClass, setSelectedClass] = useState(null);

	// =========================== Event Handlers ====================== //
	function onClick() {
		handleClick(thisStyle)
	}

	function onSelectedStyleChange(selectedStyle) {
		if(selectedStyle === thisStyle) onSelected()
		if(selectedStyle !== thisStyle) onDeselected()
	}

	function onSelected() {
		setSelectedClass('inline-clicker-selected')
	}

	function onDeselected() {
		setSelectedClass('inline-clicker-not-selected')
	}

	// =========================== Listen / Trigger ==================== // 
	useEffect(() => { 
		onSelectedStyleChange(selectedStyle)
	}, [selectedStyle])

	// =========================== Outputs =========================== //
	return (
		<div className={`inline-clicker ${selectedClass}`} onClick={onClick}>
			{children}
		</div>
	)
}