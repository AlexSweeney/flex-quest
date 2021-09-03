import React, {useState, useEffect} from 'react';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({isOpen, handleClick}) { 
	const [lineClass, setLineClass] = useState('');

	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const animationTime = 2000;

	function handleOver() { 
		setIsOver(true);
	}

	function handleOut() { 
		setIsOver(false);
	}

	function handleDown() {
		setIsAnimating(true);
		setIsDown(true);
		handleClick();

		setTimeout(() => { 
			setIsAnimating(false);
		}, animationTime);
	}

	function handleUp() {
		setIsDown(false);
	}

	useEffect(() => {
		let newLineClass;

		if(isOver && !isDown) {
			newLineClass = 'line-over';
		} else if(isAnimating || !isAnimating && isDown && isOver) {
			newLineClass = 'line-down';
		} else {
			newLineClass = '';
		}
 
		setLineClass(newLineClass);
	}, [isOver, isDown, isAnimating]);

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