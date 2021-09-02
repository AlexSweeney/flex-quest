import React, {useState} from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './ClickHeaderStyle.css';
import './iconStyle.css';

export default function ClickHeader({title, newStyle, styleString, setStyleString, handleClick, passedClass = '', children}) { 
	const [showChildren, setShowChildren] = useState(false);

	function handleIconClick() {
		setShowChildren(oldVal => !oldVal);
	}

	return (
		<div>
			<h2 className={(newStyle === styleString ? `info-header selected ${passedClass}`: `info-header ${passedClass}`)}
						onClick={() => { handleClick(newStyle, styleString, setStyleString); }}>{title}</h2>
			{/*<div className='icon' onClick={handleIconClick}>*/}
			<PlayArrowIcon className='play-icon'/>
			{showChildren && children}
		</div>
	)
					
}