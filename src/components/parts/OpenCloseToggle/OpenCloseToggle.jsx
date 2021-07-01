import React, {useState} from 'react';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({isOpen, handleClick}) {
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);

	const horizClass = (() => {
		let thisClass = 'line';
		if(isOver) thisClass += ' line-over';
		if(isDown) thisClass += ' line-down';
		return thisClass;
	})();

	const vertClass = (() => {
		let thisClass = 'line';
		if(isOpen) thisClass += ' vert-line';
		if(isOver) thisClass += ' line-over';
		if(isDown) thisClass += ' line-down';
		return thisClass;
	})();

	function handleOver() {
		setIsOver(true);
	}

	function handleOut() {
		setIsOver(false);
		setIsDown(false);
	}

	function handleDown() {
		setIsDown(true);
		handleClick();
	}

	function handleUp() {
		setIsDown(false);
	}

	// const [lineClass, setLineClass] = useState('');

	// function handleOver() {
	// 	setLineClass('line-over');
	// }

	// function handleOut() {
	// 	setLineClass('');
	// }

	// function handleDown() {
	// 	setLineClass('line-down');
	// 	// handleClick();
	// }

	// function handleUp() {
	// 	setLineClass('');
	// }

	return (
		<div className="open-close-toggle" 	
			onMouseOver={handleOver}
			onMouseOut={handleOut}
			onMouseDown={handleDown}
			onMouseUp={handleUp}>
			<div className={horizClass}></div>
			<div className={vertClass}></div>
			{/*<div className={lineClass + ' line'}></div>
			<div className={lineClass + ' vert-line'}></div>*/}
		</div> 
	)
}