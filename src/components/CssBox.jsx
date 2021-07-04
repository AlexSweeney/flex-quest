import React, {useState} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';  
import {style1} from './data/css/style1.jsx';

export default function CssBox() {
	const title = 'style.css';  
	// const text = '#item_1 { display: flex; justify-content: center; border: 2px solid black; background: black; color: white; } #item_2{ display: justify-content: center; border: 2px solid black; background: white; }';
	return ( 
		<OpenCloseBox title={title}>    
 			{style1}
		</OpenCloseBox>
	)
}