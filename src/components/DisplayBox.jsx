import React, {useState} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';  

export default function DisplayBox({htmlString}) {   
	return (
		<OpenCloseBox>    
			<iframe srcdoc={htmlString}/>
		</OpenCloseBox>
	) 
}