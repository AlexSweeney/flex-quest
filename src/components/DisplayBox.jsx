import React, {useState} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';  

export default function DisplayBox({htmlString}) {  
	// let htmlString = '<p>hello world</p>';
	// htmlString = '<div class="getCode">' + htmlString + '</div>';
	// // const html = stringToHTML(htmlString);
	// const html = <p>Hello worlde</p>;

	// function stringToHTML(str) {
	// 	var parser = new DOMParser();
	// 	var doc = parser.parseFromString(str, 'text/html'); 
	// 	return doc;
	// }; 

	// // console.log('DisplayBox html', html);
	// // const b = html.querySelector('.getCode');
	// // console.log('b', b);
	// function onLoadFn() {
	// 	console.log('click')
	// }

	return (
		<OpenCloseBox>  
			<iframe srcdoc={htmlString}/>
			{/*<div className="output" onClick={onLoadFn}>

			</div>*/}
		</OpenCloseBox>
	)
	// return ( 
	// 	<OpenCloseBox>    
 // 			[html]
	// 	</OpenCloseBox>
	// )
}