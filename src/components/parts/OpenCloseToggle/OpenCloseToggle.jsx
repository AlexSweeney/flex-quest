import React, {useState} from 'react';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({isOpen, handleClick}) { 
	const [lineClass, setLineClass] = useState('');

	function handleOver() {
		setLineClass('line-over');
	}

	function handleOut() {
		setLineClass('');
	}

	function handleDown() {
		setLineClass('line-down');
		handleClick();
	}

	function handleUp() {
		setLineClass('');
	}

	return (
		<div className="open-close-toggle" 	
			onMouseOver={handleOver}
			onMouseOut={handleOut}
			onMouseDown={handleDown}
			onMouseUp={handleUp}> 
			<div className={lineClass + ' line'}></div>
			<div className={lineClass + ' line' + (isOpen ? ' vert-line' : '')}></div>
		</div> 
	)
}