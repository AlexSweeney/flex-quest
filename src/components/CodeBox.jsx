import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import './CodeBox.css';

export default function CodeBox({title, value, handleChange, handleRefresh, fade}) {  
	return ( 
		<OpenCloseBox title={title} handleRefresh={handleRefresh} bodyClass="dark-background">
			<textarea className="text-area" value={value} onChange={handleChange}>   
			</textarea>
		</OpenCloseBox>
	)
}