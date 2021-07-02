import React, {useState} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import {text_1} from './data/html/text_1.jsx'; 

export default function HtmlBox() {
	const title = 'index.html';  

	return ( 
		<OpenCloseBox title="index.html">   
			<code>
				{text_1} 
			</code>
		</OpenCloseBox>
	)
}