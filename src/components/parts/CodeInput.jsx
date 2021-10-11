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
		
		scrollable overflow
		-  make container expand width with content width
		* make text area expand width with content width

		- overflow width = close overflow then box
		tidy code
	*/
	
	// ===================================== Ids ===================================== //
	const codeDisplayId = `code-display-${i}`;
	const codeDisplayContainerId = `code-display-container-${i}`;
	
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
	// const buttons = [<RefreshButton onClick={handleRefreshClick}/>];
	const buttons = [];

	// ===================================== Event Handlers ===================================== //
	function handleRefreshClick() {
		// if(code !== originalCode) {
		// 	setRefreshClicked(true)
		// 	setColorHasTransitioned(false)
		// 	setFadeClass('code-display-fade')
		// } 
	}

	function onTextFaded() {
		// setRefreshClicked(false)
		// setCode(originalCode)
		// setFadeClass('code-display-no-fade')
	}

	/*function onTextChange(e) {   
		const isOverflowing = e.target.scrollHeight > e.target.clientHeight; 
		setIsOverflowing(isOverflowing)

		setCode(e.target.value)
	}*/

	// function handleTransitionEnd(e) {
	// 	if(e.propertyName === 'color') setColorHasTransitioned(true)
	// } 

	// ===================================== Helper Fns ===================================== //
	function setInnerText(id, value) {
		const element = document.getElementById(id);
		element.innerText = value;
	}

	function setElementSizeToElementSize(id_1, id_2) {
		const element_1 = document.getElementById(id_1);
		const element_2 = document.getElementById(id_2);

		const newStyle = window.getComputedStyle(element_2);
		console.log('newStyle', newStyle)

		element_1.height = newStyle.height;
		element_1.width = newStyle.width;
	}
	// ===================================== Update Classes ===================================== //
	// update openClass
	// useEffect(() => {
	// 	let newClass = '';

	// 	if(boxStatus === 'box-open') {
	// 		if(contentContainerStatus !== 'content-container-open') {
	// 			newClass = isOverflowing ? 'code-display-opening-overflow' : 'code-display-opening';
	// 		} else if (contentContainerStatus === 'content-container-open') {
	// 			newClass = 'code-display-open';
	// 		}
	// 	} else {
	// 		newClass = 'code-display-closed';
	// 	}

	// 	setOpenClass(newClass)
	// }, [boxStatus, contentContainerStatus])

	// ===================================== Add Event Listeners ===================================== 
	// listen for transition end
	// useEffect(() => {
	// 	const codeDisplayElement = document.getElementById(codeDisplayId);

	// 	if(refreshClicked) codeDisplayElement.addEventListener('transitionend', handleTransitionEnd)
	// 	return () => { codeDisplayElement.removeEventListener ('transitionend', handleTransitionEnd)}
	// }, [refreshClicked])

	// ===================================== Listen for transition end ===================================== //
	// handle color transition end
	// useEffect(() => { 
	// 	if(refreshClicked && colorHasTransitioned) {
	// 		onTextFaded()
	// 	} 
	// }, [refreshClicked, colorHasTransitioned])

	function onTextChange(e) {
		console.log(e)
		setCode(e.target.value) 
	}
 
	// ===================================== Output ===================================== //
	return (
		<OpenCloseBox title={title} i={i} buttons={buttons}>
			<code className="code-display" id={codeDisplayId} contenteditable="true"> 
				<pre>{code}</pre>
			</code>
		</OpenCloseBox>
	)
}

{/*<textarea 
					className={`code-display ${openClass} ${fadeClass}`} 
					id={codeDisplayId} 
					value={code} 
					onChange={onTextChange}> 
				</textarea>*/}

{/* 
		<div contenteditable="true" className={`code-display ${openClass} ${fadeClass}`} onChange={onCodeChange} value={code}>{code}</div>

	<div className="code-display-container">
				<textarea className={`code-display ${openClass} ${fadeClass}`} id={codeDisplayId} value={code} onChange={onTextChange}> 
				</textarea>
			</div>
	
	<code className={`code-display ${openClass} ${fadeClass}`} id={codeDisplayId} contenteditable="true" onKeyDown={onCodeChange}>   
			</code>
*/}