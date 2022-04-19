import React, {useState, useEffect} from 'react';
import './OpenCloseButton.scss';

type OpenCloseButtonProps = {
	isCrossSymbol?: boolean;
	handleClick: Function; 
	animateOnClick?: boolean;
};

export default function OpenCloseButton({
	isCrossSymbol = false,
	handleClick = () => {},
	animateOnClick = false,
}: OpenCloseButtonProps) { 
	/*
		* onClick
			* call handleClick
			* if animateOnClick
				* animate between cross and minus sign
		
		* on isCrossSymbol change
			* animate between cross and minus sign
	*/ 

	// ==================================== Constants 
	const [verticalLineClass, setVerticalLineClass] = useState<string>('');

	// ==================================== Event Handlers
	const onMouseDown = () => {
		handleClick()

		if(animateOnClick) toggleVerticalLineClass();
	}

	const onToggleCross = (isCross: boolean) => {
		if(isCross) showCross()
		else showMinus()
	}

	// ==================================== Utils
	const showCross = () => {
		let newClass = 'openCloseButton-line__vertical';
		setVerticalLineClass(newClass)
	}

	const showMinus = () => {
		let newClass = '';
		setVerticalLineClass(newClass)
	}

	const toggleVerticalLineClass = () => {
		let newClass;

		if(verticalLineClass === '') newClass = 'openCloseButton-line__vertical';
		else newClass = ''; 

		setVerticalLineClass(newClass)
	}
	
	// ==================================== Listen / Trigger
	useEffect(() => {
		onToggleCross(isCrossSymbol)
	}, [isCrossSymbol])
	
	// ==================================== Output
	return (
		<button className='openCloseButton' onMouseDown={onMouseDown}> 
			<div className='openCloseButton-line'/>
			<div className={`openCloseButton-line ${verticalLineClass}`}/>
		</button>
	)
}