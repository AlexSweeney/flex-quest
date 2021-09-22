import React, {useState, useEffect} from 'react';
import './InlineClicker.css';

export default function InlineClicker({newStyle, i, selectedHeader, setSelectedHeader, setSelectedStyle, children}) {   
	/*
		on click 
			* add highlight color
			- change style
	
		on reclick
			* remove highlight color
			- revert style
	*/

	const [clickerSelected, setClickerSelected] = useState(false);
	const [clickerSelectedClass, setClickerSelectedClass] = useState(null);

	function onClick() {
		setClickerSelected(oldVal => !oldVal)
	}

	function onSelected() {
		setClickerSelectedClass('inline-clicker-selected')
	}

	function onDeselected() {
		setClickerSelectedClass('')
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

{/*
	<div className={`inline-clicker ${newStyle === styleString ? 'selected' : ''}`}
			onClick={() => { handleClick(newStyle, styleString, setStyleString); }}>
			{children}
		</div>		

*/}