import React, {useState} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import './HtmlBox.css';

export default function CodeBox({title, value, onChange}) {    
	return ( 
		<OpenCloseBox title={title}>    
			<textarea className="text-area" onChange={onChange}>  
				{value}
			</textarea>
		</OpenCloseBox>
	)
}