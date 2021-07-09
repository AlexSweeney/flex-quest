import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
import {style_3} from './../css/style_3.jsx';
import {style_3a} from './../css/style_3a.jsx';
import {style_3b} from './../css/style_3b.jsx';
import {style_3c} from './../css/style_3c.jsx';
import {style_3d} from './../css/style_3d.jsx';
import {style_3e} from './../css/style_3e.jsx';
import {style_3f} from './../css/style_3f.jsx';
import {style_3g} from './../css/style_3g.jsx';
import {style_3h} from './../css/style_3h.jsx';
import {style_3i} from './../css/style_3i.jsx';
import {style_3j} from './../css/style_3j.jsx';
import './Text.css';

export default function Text_3({handleClick, styleString}) { 
	const props = {handleClick, styleString};
	const inlineLink = styleString === style_3a ? 'clickable clickable-selected' : 'clickable';
	return (
		<div>
			<p>Use 'justify-content' in a flex container to control where the children are placed along the x-axis.</p>
			
			<ClickHeader newStyle={style_3b} {...props}>justify-content: flex-start; (default)</ClickHeader>
			<p>Children will be placed at the start of the x-axis</p>
			<p>If you change the flex-direction, the x-axis will also change direction.  For example if you add the rules: <span onClick={() => handleClick(style_3a)} className={inlineLink}>“flex-direction: column; justify-content: flex-end”</span> to a flex container, the children will be placed at the bottom of the container, instead of to the right.</p> 
			<ClickHeader newStyle={style_3e} {...props}>justify-content: start;</ClickHeader>
			<p>Children will be placed at the start of writing-mode direction.  If writing mode is from left to write, the children will be placed on the left side of the container.</p> 
			<ClickHeader newStyle={style_3h} {...props}>justify-content: space-between;</ClickHeader>
			<p>Children will be spread out across the x-axis, with space added between the child elements.  The first and last elements will be placed at the start and end of the x-axis.</p>
			<ClickHeader newStyle={style_3i} {...props}>justify-content: space-around;</ClickHeader>
			<p>Children will be spread out across the x-axis, with an equal amount of space added to to the left and right of each child element.</p>
			<ClickHeader newStyle={style_3j} {...props}>justify-content: space-evenly;</ClickHeader>
			<p>Children will be spread out across the x-axis, with the space being distributed so that there is the same amount of space between each of the children and the edges of the containers.</p>
		</div>
	)
}
  
    
// justify-content: space-evenly;
// space is divided so that the children are spaced evenly.