import React from 'react';

export default function Text({levelNum, allText, setSelectedStyle}) {  
	const ThisText = allText[levelNum];  
	function handleClick(newStyle) {
		console.log('handle click ======= ')
		// console.log(newStyle)
		// setSelectedStyle(newStyle)
	}

	return <ThisText handleClick={handleClick}/>
}