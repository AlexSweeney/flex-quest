import React, {useState, useEffect} from 'react';
import './OpenCloseButton.scss';

interface OpenCloseButtonProps {
	parentIsAnimating?: boolean;
}

export function OpenCloseButton({
	parentIsAnimating = false,
}: OpenCloseButtonProps) { 
	/*
		* onClick
			* if parent isn't animting
				* animate between cross and minus sign

		* on parent animation change
			* animate between cross and minus sign
	*/ 

	// ==================================== Constants ==================================== //
	const [lineIsVertical, setLineIsVertical] = useState(false);
	const [verticalLineClass, setVerticalLineClass] = useState('');

	// =================================== Event Handlers //
	const onMouseDown = () => {
		if(!parentIsAnimating) {
			turnVerticalLine(lineIsVertical);
		}
	}

	const onParentAnimationEnd = () => {
		updateVerticalLineClass(lineIsVertical)
	}

	// ==================================== Utils //
	const turnVerticalLine = (lineIsVertical) => {
		setLineIsVertical(!lineIsVertical)
		updateVerticalLineClass(!lineIsVertical)
	}

	const updateVerticalLineClass = (isVertical) => {
		let newClass;

		if(isVertical) newClass = 'openCloseButton-line__vertical';
		else newClass = '';
		
		setVerticalLineClass(newClass)
	}

	// ==================================== Listen / Trigger ============================= //
	useEffect(() => {
		if(!parentIsAnimating) onParentAnimationEnd();
	}, [parentIsAnimating])

	// ================== Output ================== //
	return (
		<button className='openCloseButton'
			onMouseDown={onMouseDown}> 
			<div className='openCloseButton-line'/>
			<div className={`openCloseButton-line ${verticalLineClass}`}/>
		</button>
	)
}