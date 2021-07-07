import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import './CodeBox.css';

export default function CodeBox({title, value, handleChange, handleRefresh, fade}) {  
	const fadeStyle = fade ? { opacity: 0 } : {};

	return ( 
		<OpenCloseBox title={title} handleRefresh={handleRefresh} background="dark-background">    
			<div style={fadeStyle} className="iframe-container">
				<textarea className="text-area" value={value} onChange={handleChange}>   
				</textarea>
			</div>
		</OpenCloseBox>
	)
}