import React, {useState} from 'react';
import './ClickHeaderStyle.css';

export default function ClickHeader({title, newStyle, styleString, setStyleString, handleClick, passedClass = '', children}) { 
	const iconStyle = {
		width: '1em',
		height: '1em',
		background: 'green',
	}

	const [showChildren, setShowChildren] = useState(false);

	function handleIconClick() {
		setShowChildren(oldVal => !oldVal);
	}

	return (
		<div>
			<h2 className={(newStyle === styleString ? `info-header selected ${passedClass}`: `info-header ${passedClass}`)}
						onClick={() => { handleClick(newStyle, styleString, setStyleString); }}>{title}</h2>
			<div style={iconStyle} onClick={handleIconClick}></div>
			{showChildren && children}
		</div>
	)
					
}