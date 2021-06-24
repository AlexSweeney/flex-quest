import React, {useState} from 'react';
import Burger from './Burger.jsx';

export default function Box({showBurger, title}) {
	const openStyle = {	
		'min-width': '250px',
		height: '400px',
		background: '#E8E4E4',
		'flex-grow': '1',
		'margin-right': '40px',
	};

	const closedStyle = {
		background: 'white',
		border: '2px solid black',
		height: '400px',
		'margin-right': '20px',
	};	

	const toggleStyle = {
		width: '40px',
		height: '40px',
		background: 'blue',
	};

	const boxHeaderStyle = {
		height: '44px',
		background: '#272727',
		display: 'flex',
		'justify-content': 'space-between',
		'align-items': 'center',
	};

	const titleStyle = {
		color: '#E8E4E4',
		'font-size': '1.2em',
		'font-family': 'BaiJamjuree-Medium, Verdana, sans-serif',
	};

	const burgerContainerStyle = { 
		width: '2.25em',
    height: '70%',
    padding: '1',
    'margin-left': '0.5em',
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
			<div style={boxHeaderStyle}>
				<div style={burgerContainerStyle}>{showBurger && <Burger/>}</div>
				<div style={titleStyle}>{title}</div>
				<div style={toggleStyle}>3</div> 
			</div>
		</div>
	)
}