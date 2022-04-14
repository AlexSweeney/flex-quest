import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
import {style_6a} from './../css/style_6a.jsx';
import {style_6b} from './../css/style_6b.jsx'; 
import {style_6c} from './../css/style_6c.jsx'; 
import {style_6d} from './../css/style_6d.jsx'; 
import {style_6e} from './../css/style_6e.jsx'; 
import {style_6f} from './../css/style_6f.jsx'; 
import {style_6g} from './../css/style_6g.jsx'; 
import {style_6h} from './../css/style_6h.jsx'; 
import {style_6i} from './../css/style_6i.jsx';
import {style_6j} from './../css/style_6j.jsx'; 
import './Text.css';

export default function Text_6({handleClick, styleString}) { 
	const props = {handleClick, styleString}; 
	const inlineLink_1 = styleString === style_6a ? 'clickable clickable-selected' : 'clickable';
	const inlineLink_2 = styleString === style_6c ? 'clickable clickable-selected' : 'clickable';

	return (
		<div>
			<p>The property 'align-items' allows you to control how child elements are spaced along the y axis of the flex container.</p> 
			<p>If you change the <span onClick={() => handleClick(style_6a)} className={inlineLink_1}>'flex-direction' of the flex container</span>, the y-axis of the flex-container will also change direction.</p> 

 			<ClickHeader newStyle={style_6b} {...props}>align-items: stretch; (default)</ClickHeader>
 			<p>Child elements will stretch across the y-axis of the flex container.  If you <span onClick={() => handleClick(style_6c)}  className={inlineLink_2}>set a height value for the child elements</span>, this will override the stretch behaviour.</p>

 			<ClickHeader newStyle={style_6d} {...props}>align-items: flex-start;</ClickHeader>
 			<p>Child elements will be placed at the start of the y-axis of the flex container.</p>

 			<ClickHeader newStyle={style_6e} {...props}>align-items: center;</ClickHeader>
 			<p>Child elements will be placed at the center of the y-axis of the flex container.</p>

 			<ClickHeader newStyle={style_6f} {...props}>align-items: flex-end;</ClickHeader>
 			<p>Child elements will be placed at the end of the y-axis of the flex container.</p> 
 			
 			<ClickHeader newStyle={style_6j} {...props}>align-items: baseline;</ClickHeader>
 			<p>Child elements are arranged so that the baseline of their contained text is the same for all the child elements.</p>
		</div>
	) 
}