import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
import {style_13a} from './../css/style_13a.jsx';  
import {style_13b} from './../css/style_13b.jsx';  
import {style_13c} from './../css/style_13c.jsx';  
import {style_13d} from './../css/style_13d.jsx';  
import {style_13e} from './../css/style_13e.jsx';  

import './Text.css';

export default function Text_13({handleClick, styleString}) { 
	const props = {handleClick, styleString};  

	return (
		<div>
			<p>The align-self property allows you to set the align value for individual child items.</p>

			<ClickHeader newStyle={style_13a} {...props}>align-self: auto; (default)</ClickHeader>
			<p>Default align property from container will be used.</p> 

			<ClickHeader newStyle={style_13b} {...props}>align-self: flex-start;</ClickHeader>
			<p>Element will be placed at the start of the y-axis of the flex container.</p>
			
			<ClickHeader newStyle={style_13c} {...props}>align-self: center;</ClickHeader>
			<p>Element will be placed at the center of the y-axis of the flex container.</p>
			  
			<ClickHeader newStyle={style_13d} {...props}>align-self: flex-end;</ClickHeader> 
			<p>Element will be placed at the end of the y-axis of the flex container.</p>

			<ClickHeader newStyle={style_13e} {...props}>align-self: baseline;</ClickHeader> 
			<p>Element is arranged so that the baseline of it's contained text is at the same level as the baseline of the contained text for other elements with an align-self property of baseline, or that are within a container with a align-items property of baseline.</p>
		</div>
	) 
}