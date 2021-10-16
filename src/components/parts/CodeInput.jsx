import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import {
	onTransition,
	removeInlineSize, 
	triggerOnTransitionEnd,
} from './../utils.js';
import './CodeInput.css';

export default function CodeInput({
	title, 
	i,   
	code,
	isFade,
	setCode, 
	originalCode
}) {
	/*
		* show title

		* show code

		* on user input
			* update code
			* expand if content overflows
			* shrink if content reduces overflow

		* on refresh press
			* fade out
			* change to orignal code
			* fade in 

		* on close box
			* close scroll bars
			* animate close

		* on open box
			* animate open
			* animate to original size
			- set focus to previous position
 
		* on original code change
			* fade out
			* change code to original code
			* fade in
		

	 - text box 
	 	- sync fade with menu close
 		- fix - change style 
	
	 	- click style header
	 		- change to new code
	 		- when unclicked = revert? 
		
		- save code between level changes  

	  -	refactor Refresh ?
	*/
	
	// ===================================== Ids ================================================ //
	const codeDisplayId = `code-display-${i}`;

	// ===================================== State ============================================== //
	const [displayCode, setDisplayCode] = useState(code);

	// ===================================== Classes ============================================ //
	const [fadeClass, setFadeClass] = useState('code-display-no-fade');
	const [openClass, setOpenClass] = useState('code-display-open');
	
	// ===================================== Buttons ============================================ //
	const buttons = [<RefreshButton onClick={onRefreshClick} i={i}/>];
	
	// ===================================== Event Handlers ===================================== //
	function onCodeChangedOutside(newCode, isFade) {
		if(isFade) fadeThenUpdateCode(newCode)
		if(!isFade) updateCode(newCode)
	}

	function onTextChange(e) {  
		sizeElementToContent(e.target)
		updateCode(e.target.value)  
	}

	function onRefreshClick() {
		if(code !== originalCode) {
			listenForEndOfFade()
			fadeCode() 
		} 
	}

	function onRefreshFadeOut() { 
		removeInlineSize(codeDisplayId)
		resetCode()
		unfadeCode()
	} 

	// ===================================== Helper Fns ===================================== //  
	function fadeCode() {
		return new Promise(resolve => {
			triggerOnTransitionEnd(codeDisplayId, 'color', resolve)
			setFadeClass('code-display-fade')
		}) 
	}

	function unfadeCode() {
		setFadeClass('code-display-no-fade')
	}

	function listenForEndOfFade() {
		triggerOnTransitionEnd(codeDisplayId, 'color', onRefreshFadeOut)
	}

	function resetCode() {
		updateCode(originalCode)
	}

	function updateCode(code) {
		setCode(code)
		setDisplayCode(code)
	}

	function fadeThenUpdateCode(code) { 
		fadeCode()
			.then(() => {
				updateCode(code)
				unfadeCode()
			})
	}

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
	// ===================================== Listen / Trigger =========================== //
	useEffect(() => {
		onCodeChangedOutside(code, isFade)
	}, [code])
	
	// ===================================== Output ===================================== //
	return (
		<OpenCloseBox title={title} i={i} buttons={buttons}>
			<textarea 
				className={`code-display ${openClass} ${fadeClass}`} 
				id={codeDisplayId}  
				value={displayCode}
				onChange={onTextChange}> 
			</textarea>
		</OpenCloseBox>
	)
}