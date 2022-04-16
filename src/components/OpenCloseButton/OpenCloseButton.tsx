import React, {useState, useEffect} from 'react';
import './OpenCloseButton.scss';

interface OpenCloseButtonProps {
	isCrossSymbol?: boolean;
	handleClick: Function; 
	isOrphan?: boolean;
}

export default function OpenCloseButton({
	isCrossSymbol = false,
	handleClick = () => {},
	isOrphan = false,
}: OpenCloseButtonProps) { 
	/*
		* onClick
			* call handleClick
			* if isOrphan
				* animate between cross and minus sign
		
		* on isCrossSymbol change
			* animate between cross and minus sign
	*/ 

	// ==================================== Constants 
	const [verticalLineClass, setVerticalLineClass] = useState('');

	// ==================================== Event Handlers
	const onMouseDown = () => {
		handleClick()

		if(isOrphan) toggleVerticalLineClass();
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
		if(isCrossSymbol) showCross()
		else showMinus()
	}, [isCrossSymbol])
	
	// ==================================== Output
	return (
		<button className='openCloseButton' onMouseDown={onMouseDown}> 
			<div className='openCloseButton-line'/>
			<div className={`openCloseButton-line ${verticalLineClass}`}/>
		</button>
	)
}