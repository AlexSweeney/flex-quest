import React, {useState} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';  

export default function DisplayBox({htmlString, cssString}) {   
	window.onload = function() {
		let myiFrame = document.getElementById("iframe");
  	let doc = myiFrame.contentDocument;
  	doc.body.innerHTML = doc.body.innerHTML + `<style>${cssString}</style>`;
  }

	return (
		<OpenCloseBox>    
			<iframe srcdoc={htmlString} id='iframe'/>
		</OpenCloseBox>
	) 
}