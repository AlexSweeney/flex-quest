import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import RefreshButton from './Buttons/RefreshButton/RefreshButton.jsx';
import './CodeInput.css';

export default function CodeInput({title, i, code, setCode, originalCode}) {
	/*
		* show title

		* show code

		* update code on user input
	
		reset to original code on refresh press

		open and close on toggle press 
	*/
	const codeDisplayId = `code-display-${i}`;
	const [fadeClass, setFadeClass] = useState('code-display-no-fade');
	const [refreshClicked, setRefreshClicked] = useState(false);
	const [colorHasTransitioned, setColorHasTransitioned] = useState(false);
	const buttons = [<RefreshButton onClick={handleRefreshClick}/>];

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
		setCode(e.target.value)
	}

	function handleTransitionEnd(e) {
		if(e.propertyName === 'color') setColorHasTransitioned(true)
	}

	// listen for transition end
	useEffect(() => {
		const codeDisplayElement = document.getElementById(codeDisplayId);

		if(refreshClicked) codeDisplayElement.addEventListener('transitionend', handleTransitionEnd)
		/*codeDisplayElement.addEventListener('transitionend', (e) => {
			console.log(e)
			if(e.propertyName === 'color') setColorHasTransitioned(true)
		})*/
		return () => { codeDisplayElement.removeEventListener ('transitionend', handleTransitionEnd)}
	}, [refreshClicked])

	// trigger onTextFaded
	useEffect(() => {
		// fade
		if(refreshClicked && colorHasTransitioned) {
			onTextFaded()
		}

		// change text
	}, [refreshClicked, colorHasTransitioned])

	return (
		<OpenCloseBox title={title} i={i} buttons={buttons}>
			<textarea className={`code-display ${fadeClass}`} id={codeDisplayId} value={code} onChange={handleChange}> 
			</textarea>
		</OpenCloseBox>
	)
}