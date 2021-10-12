import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import {onTransition} from './../utils.js';
import './CodeInput.css';

export default function CodeInput({
	title, 
	i, 
	code, 
	setCode, 
	originalCode
}) {
	/*
		* show title

		* show code

		* update code on user input
	
		* reset to original code on refresh press

		* open and close on toggle press 
		
		* scroll on overflow

		* animate on open and close
	*/
	
	// ===================================== Ids ===================================== //
	const codeDisplayId = `code-display-${i}`;

	// ===================================== Classes ===================================== //
	const [fadeClass, setFadeClass] = useState('code-display-no-fade');
	const [openClass, setOpenClass] = useState('code-display-open');
	
	// ===================================== Buttons ===================================== //
	const buttons = [<RefreshButton onClick={onRefreshClick}/>];
	
	// ===================================== Event Handlers ===================================== //
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

	function onTextFadeEnd() { 
		resetCode()
		unfadeCode()
	} 

	// ===================================== Helper Fns ===================================== //  
	function fadeCode() {
		setFadeClass('code-display-fade')
	}

	function unfadeCode() {
		setFadeClass('code-display-no-fade')
	}

	function listenForEndOfFade() {
		onTransition(codeDisplayId, 'color', () => {}, onTextFadeEnd)
	}

	function resetCode() {
		setCode(originalCode)
	}

	function updateCode(code) {
		setCode(code)
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