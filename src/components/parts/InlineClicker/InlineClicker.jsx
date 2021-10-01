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
			* change style
	
		on reclick
			* remove highlight color
			* revert style
	*/

	const [clickerSelected, setClickerSelected] = useState(false);
	const [clickerSelectedClass, setClickerSelectedClass] = useState(null);

	// =========================== Event Handlers =========================== //
	function onClick() {
		toggleSelectedHeader()
	}

	function onSelected() {
		setClickerSelectedClass('inline-clicker-selected')
		handleClick(thisStyle)
	}

	function onDeselected() {
		setClickerSelectedClass('')
		handleClick(null)
	}

	// =========================== Helper fns =========================== //
	function toggleSelectedHeader() {
		setSelectedHeader(newVal => {
			if(newVal === children) return '';
			return children;
		})
	} 

	// =========================== Trigger Selected =========================== //
	useEffect(() => {
		if(selectedHeader === children) onSelected()
		else onDeselected()
	}, [selectedHeader])

	// =========================== Outputs =========================== //
	return (
		<div className={`inline-clicker ${clickerSelectedClass}`} onClick={onClick}>
			{children}
		</div>
	)
}  