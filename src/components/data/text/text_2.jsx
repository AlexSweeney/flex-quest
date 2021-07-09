import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
import {style_2} from './../css/style_2.jsx';
import {style_2a} from './../css/style_2a.jsx';
import {style_2b} from './../css/style_2b.jsx';
import {style_2c} from './../css/style_2c.jsx';
import {style_2d} from './../css/style_2d.jsx';

export default function Text_2({handleClick, styleString}) { 
	const props = {handleClick, styleString};

	return (
		<div>
			<p>Flex direction allows you to set the direction the child elements of the flex container are displayed.</p>  
			<ClickHeader newStyle={style_2a} {...props}>flex-direction: row; (default)</ClickHeader> 
			<p>display children from left to right.</p>  
			<ClickHeader newStyle={style_2b} {...props}>flex-direction: row-reverse;</ClickHeader> 
			<p>display children from right to left.</p>  
			<ClickHeader newStyle={style_2c} {...props}>flex-direction: column;</ClickHeader> 
			<p>display children from top to bottom.</p>   
			<ClickHeader newStyle={style_2d} {...props}>flex-direction: column-reverse;</ClickHeader>
			<p>display children from bottom to top.</p>
			<p>Try setting 'flex-direction' on '.container' to the different values.</p> 
		</div>
	)
}