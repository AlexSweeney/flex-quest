import React, {useState} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import './HtmlBox.css';

export default function CodeBox({title, value, setValue}) {    
	function handleChange(e) {
		setValue(e.target.value);
	}

	return ( 
		<OpenCloseBox title={title}>    
			<textarea className="text-area" onChange={handleChange}>  
				{value}
			</textarea>
		</OpenCloseBox>
	)
}