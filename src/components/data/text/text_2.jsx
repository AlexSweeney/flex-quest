import React, {useState} from 'react';
import {style_2} from './../css/style_2.jsx';
import {style_2a} from './../css/style_2a.jsx';
import {style_2b} from './../css/style_2b.jsx';
import {style_2c} from './../css/style_2c.jsx';
import {style_2d} from './../css/style_2d.jsx';

export default function Text_2({handleClick}) {
	const [isClicked, setIsClicked] = useState(false);
	function onClick(newStyle) {
		// if(isClicked) handleClick(style_2);
		// else handleClick(newStyle);
		// setIsClicked(oldVal => !oldVal);
		handleClick(newStyle);
	}

	function clickHeader({children}) {

	}

	return (
		<>
			<p>Flex direction allows you to set the direction the child elements of the flex container are displayed.</p>  
			<h2 className="bold" onClick={() => onClick(style_2a)}>flex-direction: row; (default)</h2>
			<p>Flex direction allows you to set the direction the child elements of the flex container are displayed.</p>  
			<p className="bold" onClick={() => onClick(style_2b)}>flex-direction: row-reverse;</p>  
			<p>display children from right to left.</p>  
			<p className="bold" onClick={() => onClick(style_2c)}>flex-direction: column;</p>  
			<p>display children from top to bottom.</p>   
			<p className="bold" onClick={() => onClick(style_2d)}>flex-direction: column-reverse;</p>  
			<p>display children from bottom to top.</p>
			<p>Try setting 'flex-direction' on '.container' to the different values.</p> 
		</>
	)
}

// export const text_2 = <>
// 	<p>Flex direction allows you to set the direction the child elements of the flex container are displayed.</p>  
// 	<h2 className="bold" onDown={() => console.log('click head')}>flex-direction: row; (default)</h2>  
	
// </>

{/* 


*/}