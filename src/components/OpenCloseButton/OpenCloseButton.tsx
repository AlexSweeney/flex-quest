import React, {useState, useEffect} from 'react';
import './OpenCloseButton.scss';

interface OpenCloseButtonProps {
	parentIsAnimating?: boolean;
	handleClick: Function;
	isOpen?: boolean;
	isOrphan?: boolean;
}

export default function OpenCloseButton({
	parentIsAnimating = false,
	isOpen = true,
	handleClick = () => {},
	isOrphan = false,
}: OpenCloseButtonProps) { 
	/*
		* if open
			* show minus
		* if closed 
			* show plus

		* onClick
			* if parent isn't animting
				* animate between cross and minus sign

		* on parent animation change
			* animate between cross and minus sign
	*/ 

	// ==================================== Constants ==================================== // 
	const [verticalLineClass, setVerticalLineClass] = useState('');

	// =================================== Event Handlers //
	const onMouseDown = () => {
		handleClick()

		if(isOrphan) toggleVerticalLineClass();
	}

	const onParentEndOpen = (isOpen: boolean) => { 
		updateVerticalLineClass(isOpen)
	}

	const onParentEndClose = (isOpen: boolean) => { 
		updateVerticalLineClass(isOpen)
	}

	// ==================================== Utils //
	const updateVerticalLineClass = (isOpen: boolean) => {
		let newClass;

		if(isOpen) newClass = '';
		else newClass = 'openCloseButton-line__vertical';
		
		setVerticalLineClass(newClass)
	}

	const toggleVerticalLineClass = () => {
		let newClass;

		if(verticalLineClass === '') newClass = 'openCloseButton-line__vertical';
		else newClass = ''; 

		setVerticalLineClass(newClass)
	}

	// ==================================== Listen / Trigger ============================= //
	useEffect(() => {
		if(!parentIsAnimating) {
			if(isOpen) onParentEndOpen(isOpen)
			else onParentEndClose(isOpen)
		}
	}, [parentIsAnimating])

	// ================== Output ================== //
	return (
		<button className='openCloseButton' onMouseDown={onMouseDown}> 
			<div className='openCloseButton-line'/>
			<div className={`openCloseButton-line ${verticalLineClass}`}/>
		</button>
	)
}