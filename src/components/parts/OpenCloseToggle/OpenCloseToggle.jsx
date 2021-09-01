import React, {useState, useEffect} from 'react';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({isOpen, handleClick}) { 
	const [lineClass, setLineClass] = useState('');

	const [isHovering, setIsHovering] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const animationTime = 2000;

	function handleOver() {
		setIsHovering(true);
	}

	function handleOut() {
		setIsHovering(false);
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

		if(isHovering && !isDown) {
			newLineClass = 'line-over';
		} else if(isAnimating || isDown && !isHovering) {
			newLineClass = 'line-down';
		} else {
			newLineClass = '';
		}

		setLineClass(newLineClass);
	}, [isHovering, isDown, isAnimating]);

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