import React, {useState, useEffect} from 'react';
import './InlineClicker.css';

export default function InlineClicker({
	/*newStyle, 
	i, 
	selectedHeader, 
	setSelectedHeader, 
	setSelectedStyle, */
	thisStyle,
	handleClick,
	children,
}) {   
	/*
		on click 
			* add highlight color
			* select this style
	
		on reclick
			* remove highlight color
			* revert style
	*/
	// const headerName = children; 

	// const [clickerSelected, setClickerSelected] = useState(false);
	// const [clickerSelectedClass, setClickerSelectedClass] = useState(null);

	// =========================== Event Handlers =========================== //
	// function onClick() {
	// 	toggleSelectedHeader()
	// }

	// function onHeaderSelected() {
	// 	setClickerSelectedClass('inline-clicker-selected')
	// 	setSelectedStyle(newStyle)
	// }

	// function onHeaderDeselected() {
	// 	setClickerSelectedClass('inline-clicker-not-selected')
	// 	setSelectedStyle(null)
	// }

	// =========================== Helper fns =========================== //
	// function toggleSelectedHeader() {
	// 	let newHeader;

	// 	if(selectedHeader === headerName) newHeader = '';
	// 	if(selectedHeader !== headerName) newHeader = headerName; 

	// 	setSelectedHeader(newHeader)
	// } 

	// =========================== Trigger Selected =========================== //
	// useEffect(() => {
	// 	if(selectedHeader === headerName) onHeaderSelected() 
	// 	if(selectedHeader !== headerName) onHeaderDeselected()
	// }, [selectedHeader])

	const [isSelected, setIsSelected] = useState(false);
	const [selectedClass, setSelectedClass] = useState(null);

	function onClick() {
		handleClick(thisStyle, setIsSelected)
	}

	function onSelected() {
		setSelectedClass('inline-clicker-selected')
	}

	function onDeselected() {
		setSelectedClass('inline-clicker-not-selected')
	}

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

{/*<div className={`inline-clicker ${clickerSelectedClass}`} onClick={onClick}>
			{headerName}
		</div>*/}