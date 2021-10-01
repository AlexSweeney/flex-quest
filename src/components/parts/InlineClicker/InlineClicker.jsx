import React, {useState, useEffect} from 'react';
import './InlineClicker.css';

export default function InlineClicker({
	newStyle, 
	i, 
	selectedHeader, 
	setSelectedHeader, 
	setSelectedStyle, 
	thisStyle, 
	children}) {   
	/*
		on click 
			* add highlight color
			* select this style
	
		on reclick
			* remove highlight color
			* revert style
	*/
	const headerName = children;
	console.log('headerName', headerName)

	const [clickerSelected, setClickerSelected] = useState(false);
	const [clickerSelectedClass, setClickerSelectedClass] = useState(null);

	// =========================== Event Handlers =========================== //
	function onClick() {
		toggleSelectedHeader()
	}

	function onHeaderSelected() {
		setClickerSelectedClass('inline-clicker-selected')

		// setSelectedStyle

		// handleClick(thisStyle)
	}

	function onHeaderDeselected() {
		setClickerSelectedClass('.inline-clicker-not-selected')
		// handleClick('')
	}

	// =========================== Helper fns =========================== //
	function toggleSelectedHeader() {
		let newHeader;

		if(selectedHeader === headerName) newHeader = '';
		if(selectedHeader !== headerName) newHeader = headerName; 

		setSelectedHeader(newHeader)
	} 

	// =========================== Trigger Selected =========================== //
	useEffect(() => {
		if(selectedHeader === headerName) onHeaderSelected() 
		if(selectedHeader !== headerName) onHeaderDeselected()
	}, [selectedHeader])

	// =========================== Outputs =========================== //
	return (
		<div className={`inline-clicker ${clickerSelectedClass}`} onClick={onClick}>
			{headerName}
		</div>
	)
}  