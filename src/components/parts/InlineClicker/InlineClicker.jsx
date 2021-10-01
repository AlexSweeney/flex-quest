import React, {useState, useEffect} from 'react';
import './InlineClicker.css';

export default function InlineClicker({
	newStyle, 
	i, 
	selectedHeader, 
	setSelectedHeader, 
	handleClick, 
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

	const [clickerSelected, setClickerSelected] = useState(false);
	const [clickerSelectedClass, setClickerSelectedClass] = useState(null);

	// =========================== Event Handlers =========================== //
	function onClick() {
		console.log('click inline-clicker ============================')
		toggleSelectedHeader()
	}

	function onSelected() {
		console.log('onSelected =-=-=-=-=-=-=')
		setClickerSelectedClass('inline-clicker-selected')
		// setSelectedHeader(headerName)
		// handleClick(thisStyle)
	}

	function onDeselected() {
		console.log('onDeselected -=-=-=-=-=-=')
		setClickerSelectedClass('')
		// setSelectedHeader(null)
		// handleClick('')
	}

	// =========================== Helper fns =========================== //
	function toggleSelectedHeader() {
		setSelectedHeader(newVal => {
			if(newVal === headerName) return '';
			return headerName;
		})
	} 

	// =========================== Trigger Selected =========================== //
	useEffect(() => {
		// if other header is clicked turn off
		if(selectedHeader !== headerName) onDeselected()
		// if this header is clicked turn on
		if(selectedHeader === headerName) onSelected() 
	}, [selectedHeader])

	// =========================== Outputs =========================== //
	return (
		<div className={`inline-clicker ${clickerSelectedClass}`} onClick={onClick}>
			{headerName}
		</div>
	)
}  