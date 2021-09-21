import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';
import './CodeInput.css';

export default function CodeInput({title, code, setCode, originalCode}) {
	/*
		* show title

		* show code

		* update code on user input
	
		reset to original code on refresh press

		open and close on toggle press 
	*/

	function handleChange(e) { 
		setCode(e.target.value)
	}

	return (
		<OpenCloseBox title={title}>
			<textarea className="code-display" value={code} onChange={handleChange}> 
			</textarea>
		</OpenCloseBox>
	)
}