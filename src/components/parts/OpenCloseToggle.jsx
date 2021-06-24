import React from 'react';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({isOpen, handleClick}) {
	return (
		<div className="toggle-background" onClick={handleClick}>
			<div className="line"></div>
			<div className={isOpen ? "line" : "line vert-line"}></div>
		</div>
	)
}