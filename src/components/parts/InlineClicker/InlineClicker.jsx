import React, {useState, useEffect} from 'react';
import './InlineClicker.css';

export default function InlineClicker({newStyle, i, selectedHeader, setSelectedHeader, setSelectedStyle, thisStyle, children}) {   
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

	function onClick() {
		setClickerSelected(oldVal => !oldVal)
	}

	function onSelected() {
		setClickerSelectedClass('inline-clicker-selected')
		setSelectedStyle(thisStyle)
	}

	function onDeselected() {
		setClickerSelectedClass('')
		setSelectedStyle(null)
	}

	useEffect(() => {
		if(clickerSelected) onSelected()
		if(!clickerSelected) onDeselected()
	}, [clickerSelected])

	return (
		<div className={`inline-clicker ${clickerSelectedClass}`} onClick={onClick}>
			{children}
		</div>
	)
}  