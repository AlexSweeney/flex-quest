import React, {useState} from 'react';
import {style_2} from './../css/style_2.jsx';
import {style_2a} from './../css/style_2a.jsx';
import {style_2b} from './../css/style_2b.jsx';
import {style_2c} from './../css/style_2c.jsx';
import {style_2d} from './../css/style_2d.jsx';
import './textStyle.css';

export default function Text_2({handleClick}) {
	function ClickHeader({newStyle, children}) { 
		return <h2 className={"info-header"}
							onClick={() => { handleClick(newStyle); }}>{children}</h2>
	}

	return (
		<div className="info-text">
			<p>Flex direction allows you to set the direction the child elements of the flex container are displayed.</p>  
			<ClickHeader newStyle={style_2a}>flex-direction: row; (default)</ClickHeader> 
			<p>display children from left to right.</p>  
			<ClickHeader newStyle={style_2b}>flex-direction: row-reverse;</ClickHeader> 
			<p>display children from right to left.</p>  
			<ClickHeader newStyle={style_2c}>flex-direction: column;</ClickHeader> 
			<p>display children from top to bottom.</p>   
			<ClickHeader newStyle={style_2d}>flex-direction: column-reverse;</ClickHeader>
			<p>display children from bottom to top.</p>
			<p>Try setting 'flex-direction' on '.container' to the different values.</p> 
		</div>
	)
}

// export const text_2 = <>
// 	<p>Flex direction allows you to set the direction the child elements of the flex container are displayed.</p>  
// 	<h2 className="bold" onDown={() => console.log('click head')}>flex-direction: row; (default)</h2>  
	
// </>

{/* 


*/}