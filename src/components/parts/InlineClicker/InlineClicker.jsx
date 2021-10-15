import React, {useState, useEffect} from 'react';
import './InlineClicker.css';

export default function InlineClicker({ 
	thisStyle,
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
	const [isSelected, setIsSelected] = useState(false);
	const [selectedClass, setSelectedClass] = useState(null);

	// =========================== Event Handlers ====================== //
	function onClick() {
		handleClick(thisStyle, setIsSelected)
	}

	function onSelected() {
		setSelectedClass('inline-clicker-selected')
	}

	function onDeselected() {
		setSelectedClass('inline-clicker-not-selected')
	}

	// =========================== Listen / Trigger ==================== //
	useEffect(() => {
		if(isSelected) onSelected()
		if(!isSelected) onDeselected()
	}, [isSelected])

	// =========================== Outputs =========================== //
	return (
		<div className={`inline-clicker ${selectedClass}`} onClick={onClick}>
			{children}
		</div>
	)
}