import React from 'react';
import './InlineClicker.css';

export default function InlineClicker({newStyle, styleString, setStyleString, handleClick, children}) {   
	return (
		<div className={`inline-clicker ${newStyle === styleString ? 'selected' : ''}`}
			onClick={() => { handleClick(newStyle, styleString, setStyleString); }}>
			{children}
		</div>		
	)
} 