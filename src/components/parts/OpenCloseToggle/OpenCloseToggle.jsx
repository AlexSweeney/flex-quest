import React, {useState, useEffect} from 'react';
import './OpenCloseToggleStyle.css';

export default function OpenCloseToggle({isOpen, parentIsAnimating, handleClick, i = Math.random()}) { 
	const vertLineId = 'vert-line-' + i;

	const [lineDirectionClass, setLineDirectionClass] = useState(isOpen ? 'line-open' : 'line-closed');
	const [lineColorClass, setLineColorClass] = useState('line-out');
	const [lineIsAnimating, setLineIsAnimating] = useState(false);

	/*const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);*/
	const [cursorLocation, setCursorLocation] = useState('');
	const [cursorStatus, setCursorStatus] = useState('');
	const [animationStatus, setAnimationStatus] = useState('');

	function handleDown() {
		handleClick();
		setCursorStatus('down'); 
	}

	function handleUp() {
		setCursorStatus('up'); 
	}

	function handleOver() {
		setCursorLocation('over');
	}

	function handleOut(e) {  
		if (e.target.id === 'open-close-toggle' &&  e.relatedTarget.id !== vertLineId && e.relatedTarget.id !== 'horiz-line'){
			setCursorLocation('out'); 
			setCursorStatus('up'); 
		}
	}

	// change line color
	useEffect(() => {	
		if(cursorLocation === 'over' && cursorStatus !== 'down') {
			setLineColorClass('line-over');
		} else if(animationStatus === 'parentIsAnimating') {
			setLineColorClass('line-parent-animating');
		} else if(animationStatus === 'lineIsAnimating') {
			setLineColorClass('line-animating');
		} else if(animationStatus === 'lineHasAnimated') {
			setLineColorClass('line-animated');
		} else if(cursorStatus === 'down' && cursorLocation === 'over') {
			setLineColorClass('line-down');
		} else if(cursorLocation === 'out') {
			setLineColorClass('line-out');
		}
	}, [cursorStatus, cursorLocation])

	// animation status
	useEffect(() => {
		if(parentIsAnimating) {
			setAnimationStatus('parentIsAnimating');
		} else if (animationStatus === 'parentIsAnimating' && !parentIsAnimating) {
			setAnimationStatus('lineIsAnimating');
		}
	}, [parentIsAnimating, lineIsAnimating]) 

	useEffect(() => {
		const lineElement = document.getElementById(vertLineId);

		lineElement.addEventListener('transitionend', (e) => { 
			if(e.propertyName === 'transform') {
				setAnimationStatus('lineHasAnimated');
			} 
		})
	}, [])

	// line animation
	useEffect(() => {
		if(!parentIsAnimating) {
			if(isOpen) {
				setLineDirectionClass('line-open');
			} else {
				setLineDirectionClass('line-closed');
			}	
		} 
	}, [parentIsAnimating, isOpen]);


	/*useEffect(() => {	
		console.log('lineIsAnimating', lineIsAnimating);
		if(lineIsAnimating) {
			
		} 
	}, [isOpen, lineIsAnimating])*/

	/*useEffect(() => {
		const lineElement = document.getElementById(thisLineId);

		lineElement.addEventListener('transitionend', () => {
			setIsAnimating(false);
			setHasAnimated(true);
		})
	})*/

	// change line direction
	/*useEffect(() => {	
		if(animate) {
			if(isOpen) {
				setLineDirectionClass('line-open');
			} else {
				setLineDirectionClass('line-closed');
			}	
		} 
	}, [isOpen])*/

	// detect animation status
	/*useEffect(() => {
		if(animate || waiting) {
			setIsAnimating(true);
		} else {
			setIsAnimating(false)
		}
	}, [animate, waiting])*/

	// useEffect(() => {
	// 	console.log('cursorLocation', cursorLocation);
	// }, [cursorLocation]);

	// useEffect(() => {
	// 	console.log('cursorStatus', cursorStatus);
	// }, [cursorStatus]);

	// useEffect(() => {
	// 	console.log('animationStatus', animationStatus); 
	// }, [animationStatus]); 

	return (
		<div className="open-close-toggle" 	
			id="open-close-toggle"
			onMouseOver={handleOver}
			onMouseOut={handleOut}
			onMouseDown={handleDown}
			onMouseUp={handleUp}>
			<div className={`line ${lineColorClass}`} id="horiz-line"></div>
			<div className={`line ${lineColorClass} ${lineDirectionClass}`} id={vertLineId}></div>
		</div> 
	)
}

/* ==================== Bin
	/*const [lineColorClass, setLineColorClass] = useState('');
	const [lineAnimationClass, setLineAnimationClass] = useState('');

	const [animationStatus, setAnimationStatus] = useState('');

	const [cursorLocation, setCursorLocation] = useState('out')
	const [cursorStatus, setCursorStatus] = useState('up');

	const openingDelay = 1000;
	const closingDelay = 0;
	const animationTime = 1000;

	function handleOver() {
		setCursorLocation('over');
	}

	function handleOut() {
		setCursorLocation('out');
		setCursorStatus('up');
	}

	function handleDown() {
		handleClick();
		setCursorStatus('down');	 
		animate();
	}

	function handleUp() {
		setCursorStatus('up');
	}

	function animate() {
		const newStatus = isOpen ? 'closing' : 'opening';
		setAnimationStatus(newStatus);

		setTimeout(() => {
			setAnimationStatus('');
		}, animationDelay + animationTime)
	}

	useEffect(() => { 
		let newLineColorClass = '';  

		// over
		if(cursorLocation === 'over') {
			if(cursorStatus === 'up') {
				newLineColorClass = 'line-over';
			// down
			} else if(cursorStatus === 'down') {
				newLineColorClass = 'line-down';
			}
		// out
		}/* else {
			if(animationStatus === 'opening' || animationStatus === 'closing') {
				newLineColorClass = 'line-animating ';
			} 
		} 

		setLineColorClass(newLineColorClass);
	}, [cursorStatus, cursorLocation, animationStatus])

	useEffect(() => {
		if(animationStatus === 'closing') {
			setLineAnimationClass('line-closing');
		} else if (animationStatus === 'opening') {
			setLineAnimationClass('line-opening');
		} 
	}, [animationStatus])*/

	{/* 
		onMouseOver={handleOver}
			onMouseOut={handleOut}
			
			onMouseUp={handleUp}

			${lineColorClass}
	*/}