import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './OpenCloseBox/OpenCloseBox.jsx';

export default function CodeInput({title, code, setCode}) {
	/*
		* show title

		show code

		update code on user input
	
		reset to original code on refresh press

		open and close on toggle press 
	*/

	return (
		<OpenCloseBox title={title}>

		</OpenCloseBox>
	)
}