import React, {useState} from 'react';

export default function Box() {
	const openStyle = {	
		'min-width': '250px',
		height: '400px',
		background: 'white',
		border: '2px solid black',
		'flex-grow': '1',
		'margin-right': '40px',
	};

	const closedStyle = {
		background: 'white',
		border: '2px solid black',
		height: '400px',
	};	

	const toggleStyle = {
		width: '50px',
		height: '50px',
		background: 'blue',
	};

	const [isExpanded, setIsExpanded] = useState(false);
	const [boxStyle, setBoxStyle] = useState(openStyle);

	function handleToggleOpenClick() { 
		if(isExpanded) {
			setBoxStyle(closedStyle);
		} else {
			setBoxStyle(openStyle);
		}
		setIsExpanded(oldVal => !oldVal);
	}

	return (
		<div style={boxStyle} onClick={handleToggleOpenClick}>
			<div style={toggleStyle}></div> 
		</div>
	)
}