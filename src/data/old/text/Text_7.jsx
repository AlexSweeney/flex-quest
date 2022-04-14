import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
import {style_7a} from './../css/style_7a.jsx';
import {style_7b} from './../css/style_7b.jsx'; 
import {style_7c} from './../css/style_7c.jsx'; 
import {style_7d} from './../css/style_7d.jsx'; 
import {style_7e} from './../css/style_7e.jsx'; 
import {style_7f} from './../css/style_7f.jsx'; 
import {style_7g} from './../css/style_7g.jsx'; 
import {style_7h} from './../css/style_7h.jsx'; 
import {style_7i} from './../css/style_7i.jsx'; 
import {style_7j} from './../css/style_7j.jsx'; 
import {style_7k} from './../css/style_7k.jsx'; 

import './Text.css';

export default function Text_7({handleClick, styleString}) { 
	const props = {handleClick, styleString}; 
	const inlineLink_1 = styleString === style_7a ? 'clickable clickable-selected' : 'clickable';
	const inlineLink_2 = styleString === style_7j ? 'clickable clickable-selected' : 'clickable';

	return (
		<div>
			<p>The 'align-content' property can be used on flex-containers with multiple lines of children.</p>
			<p>'align-content' allows you to control how the lines of children will be placed along the y-axis.</p>
			<p>To use 'align-content', the flex container must have 'flex-wrap' or 'flex-flow' (a shorthand version of flex-wrap and flex-direction) set to 'wrap' or 'wrap-reverse', so that the children spread across multiple lines.</p>
			<p>If you <span onClick={() => handleClick(style_7a)} className={inlineLink_1}>change the 'flex-direction' to column</span> or column-reverse, the y-axis will also change direction.</p>

			<ClickHeader newStyle={style_7b} {...props}>align-content: normal; (default)</ClickHeader>
			<p>The lines of child items are spread evenly across the y-axis of the flex container.</p>

 			<ClickHeader newStyle={style_7c} {...props}>align-content: flex-start;</ClickHeader>
 			<p>The lines of child items are placed at the start of the y-axis of the flex container.</p>

 			<ClickHeader newStyle={style_7d} {...props}>align-content: center;</ClickHeader>
 			<p>The lines of child items are placed at the center of the y-axis of the flex container.</p>
 			
 			<ClickHeader newStyle={style_7e} {...props}>align-content: flex-end;</ClickHeader>
 			<p>The lines of child items are placed at the end of the y-axis of the flex container.</p>
 			
 			<ClickHeader newStyle={style_7f} {...props}>align-content: space-between;</ClickHeader>
 			<p>The lines of child items will be spread out across the y-axis, with space added between the lines.  The first and last lines will be placed at the start and end of the y-axis.</p>

 			<ClickHeader newStyle={style_7g} {...props}>align-content: space-around;</ClickHeader>
 			<p>The lines of child items will be spread out across the y-axis. Each line will have the same amount of space around the top and bottom.  This means the spaces between the first and last lines and the top and bottom of the flex container will be half the size as the spaces between the lines.</p>

 			<ClickHeader newStyle={style_7h} {...props}>align-content: space-evenly;</ClickHeader>
 			<p>The lines of child items will be spread out across the y-axis. The space will be distributed to give an evenly spaced appearence.  The space between the edges of the flex container and the first and last lines will be the same size as the space between the lines.</p>

 			<ClickHeader newStyle={style_7i} {...props}>align-content: stretch;</ClickHeader>
 			<p>The lines of child items will stretch to take up all of the available space on the y-axis of the flex-container.</p>
 			<p>If you <span onClick={() => handleClick(style_7j)} className={inlineLink_2}>specify a height for the child items</span> (or width if the flex-direction is column or column-reverse), the items will use this height instead of stretching to take up the available space on the y-axis.</p>
 			
 			{/*<ClickHeader newStyle={style_7k} {...props}>align-content: ... safe / unsafe;</ClickHeader>
 			<p>The safe and unsafe modifiers can be added to the end of any align-content property.  They control how text will be displayed if there is not enough room in the viewport for all of the text to be seen.</p>
 			<p>If you use the safe modifier, the start of the text will be shown, and the remainder will be in the overflow.  If you use the unsafe modifier, the middle of the text will be shown, and part of the text may be inacessible unless viewed with a larger viewport.</p>*/}
		</div>
	) 
}