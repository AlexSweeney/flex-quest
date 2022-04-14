import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx.js'; 
import './CodeBox.css';

export default function CodeBox({title, value, handleChange, handleRefresh, i = 0}) {
	const thisId = `open-close-box_${i}`;

	return ( 
		<OpenCloseBox id={thisId} title={title} handleRefresh={handleRefresh}>
			<textarea className="text-area" id="open-close-box" value={value} onChange={handleChange}>   
			</textarea>
		</OpenCloseBox>
	)
}