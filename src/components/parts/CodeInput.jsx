import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import {
	onTransition,
	removeInlineSize, 
} from './../utils.js';
import './CodeInput.css';

export default function CodeInput({
	title, 
	i,  
	isFade,
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

		fix - click second refresh = color sticks
	*/
	
	// ===================================== Ids ================================================ //
	const codeDisplayId = `code-display-${i}`;

	// ===================================== State ============================================== //
	const [displayCode, setDisplayCode] = useState('');

	// ===================================== Classes ============================================ //
	const [fadeClass, setFadeClass] = useState('code-display-no-fade');
	const [openClass, setOpenClass] = useState('code-display-open');
	
	// ===================================== Buttons ============================================ //
	const buttons = [<RefreshButton onClick={onRefreshClick} i={i}/>];
	
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
		removeInlineSize(codeDisplayId)
		resetCode()
		unfadeCode()
	} 

	function onIsFadeTrue() {
		fadeCode()
	}

	function onIsFadeFalse() {
		updateDisplayCode()
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

	function updateDisplayCode() {
		setDisplayCode(code)
		// move cursor highlight
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
		if(isFade) onIsFadeTrue()
		if(!isFade) onIsFadeFalse() 
	}, [isFade])

	useEffect(() => {
		if(!isFade) updateDisplayCode()
	}, [code, isFade])
	
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