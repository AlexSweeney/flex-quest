import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import './CodeInput.css';

export default function CodeInput({title, i, code, setCode, originalCode}) {
	/*
		* show title

		* show code

		* update code on user input
	
		* reset to original code on refresh press

		* open and close on toggle press 

		tidy code
	*/
	
	// ===================================== Ids ===================================== //
	const codeDisplayId = `code-display-${i}`;
	
	// ===================================== Status ===================================== //
	const [boxStatus, setBoxStatus] = useState('');
	const [contentContainerStatus, setContentContainerStatus] = useState('');
	const [isOverflowing, setIsOverflowing] = useState(false);
	const [refreshClicked, setRefreshClicked] = useState(false);
	const [colorHasTransitioned, setColorHasTransitioned] = useState(false);

	// ===================================== Classes ===================================== //
	const [fadeClass, setFadeClass] = useState('code-display-no-fade');
	const [openClass, setOpenClass] = useState('code-display-open');
	
	// ===================================== Buttons ===================================== //
	const buttons = [<RefreshButton onClick={handleRefreshClick}/>];

	// ===================================== Event Handlers ===================================== //
	function handleRefreshClick() {
		if(code !== originalCode) {
			setRefreshClicked(true)
			setColorHasTransitioned(false)
			setFadeClass('code-display-fade')
		} 
	}

	function onTextFaded() {
		setRefreshClicked(false)
		setCode(originalCode)
		setFadeClass('code-display-no-fade')
	}

	function handleChange(e) {   
		const isOverflowing = e.target.scrollHeight > e.target.clientHeight; 
		setIsOverflowing(isOverflowing)

		setCode(e.target.value)
	}

	function handleTransitionEnd(e) {
		if(e.propertyName === 'color') setColorHasTransitioned(true)
	} 
	
	// ===================================== Update Classes ===================================== //
	// update openClass
	useEffect(() => {
		let newClass = '';

		if(boxStatus === 'box-open') {
			if(contentContainerStatus !== 'content-container-open') {
				newClass = isOverflowing ? 'code-display-opening-overflow' : 'code-display-opening';
			} else if (contentContainerStatus === 'content-container-open') {
				newClass = 'code-display-open';
			}
		} else {
			newClass = 'code-display-closed';
		}

		setOpenClass(newClass)
	}, [boxStatus, contentContainerStatus])

	// ===================================== Add Event Listeners ===================================== //
	// listen for transition end
	useEffect(() => {
		const codeDisplayElement = document.getElementById(codeDisplayId);

		if(refreshClicked) codeDisplayElement.addEventListener('transitionend', handleTransitionEnd)
		return () => { codeDisplayElement.removeEventListener ('transitionend', handleTransitionEnd)}
	}, [refreshClicked])

	// ===================================== Listen for transition end ===================================== //
	// handle color transition end
	useEffect(() => { 
		if(refreshClicked && colorHasTransitioned) {
			onTextFaded()
		} 
	}, [refreshClicked, colorHasTransitioned])

	// ===================================== Output ===================================== //
	return (
		<OpenCloseBox title={title} i={i} buttons={buttons} setBoxStatus={setBoxStatus} setContentContainerStatus={setContentContainerStatus}>
			<div className="code-display-container">
				<textarea className={`code-display ${openClass} ${fadeClass}`} id={codeDisplayId} value={code} onChange={handleChange}> 
				</textarea>
			</div>
		</OpenCloseBox>
	)
}