import React, {useState, useEffect} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import './CodeBox.css';

export default function CodeBox({title, value, handleChange, handleRefresh}) {     
	return ( 
		<OpenCloseBox title={title} handleRefresh={handleRefresh} background="dark-background">    
			<textarea className="text-area" value={value} onChange={handleChange}>   
			</textarea>
		</OpenCloseBox>
	)
}