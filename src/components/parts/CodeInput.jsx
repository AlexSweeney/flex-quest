import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import './CodeInput.css';

export default function CodeInput({title, i, code, setCode, originalCode}) {
	/*
		* show title

		* show code

		* update code on user input
	
		- reset to original code on refresh press

		* open and close on toggle press 
		
		* scroll on overflow

		* animate on open and close
 
		- trim spaces on open
		- refocus to previous area on open
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

	function sizeElementToContent(element) { 
		element.style.width = '';
		element.style.height = '';
 		
		if(element.scrollWidth > element.clientWidth) {
			element.style.width = element.scrollWidth + 'px';
		}

		if(element.scrollHeight > element.clientHeight) {
			element.style.height = element.scrollHeight + 'px';
		}  
	}

	function onTextChange(e) { 
		sizeElementToContent(e.target)
		setCode(e.target.value)  
	}
 
	// ===================================== Output ===================================== //
	return (
		<OpenCloseBox title={title} i={i} buttons={buttons}>
			<textarea 
				className={`code-display ${openClass} ${fadeClass}`} 
				id={codeDisplayId} 
				value={code} 
				onChange={onTextChange}> 
			</textarea>
		</OpenCloseBox>
	)
}

{/*
<code className="code-display" id={codeDisplayId} onKeyUp={onTextChange} contenteditable="true"> 
				<pre>{code}</pre>
			</code>
	
*/}

{/* 
		<div contenteditable="true" className={`code-display ${openClass} ${fadeClass}`} onChange={onCodeChange} value={code}>{code}</div>

	<div className="code-display-container">
				<textarea className={`code-display ${openClass} ${fadeClass}`} id={codeDisplayId} value={code} onChange={onTextChange}> 
				</textarea>
			</div>
	
	<code className={`code-display ${openClass} ${fadeClass}`} id={codeDisplayId} contenteditable="true" onKeyDown={onCodeChange}>   
			</code>
*/}