import React from 'react';

export default function Burger() {
	const burgerContainerStyle = { 
		height: '100%',
		display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between', 
    'box-sizing': 'border-box', 
	};

	const burgerBarStyle = {
		height: '25%',
		width: '100%',
		background: '#E8E4E4',
	};

	return (
		<div style={burgerContainerStyle}>
			<div style={burgerBarStyle}></div>
			<div style={burgerBarStyle}></div>
			<div style={burgerBarStyle}></div>
		</div>	
	)
}