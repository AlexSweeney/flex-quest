import React from 'react';

export default function Text({levelNum, allText, setSelectedStyle}) {  
	const ThisText = allText[levelNum];  
	function handleClick(newStyle) {
		setSelectedStyle(newStyle)
	}

	return <ThisText handleClick={handleClick}/>
}