import React from 'react';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({isOpen, handleClick}) {
	return (
		isOpen ? 
			<div className="toggle" onClick={handleClick}>
				<div className="line"></div>
			</div> 
		: <div className="toggle" onClick={handleClick}>
				<div className="line"></div>
				<div className="line vert-line"></div>
			</div>
	)
}