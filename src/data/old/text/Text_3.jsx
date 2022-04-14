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
import './Text.css';

export default function Text_3({handleClick, styleString}) { 
	const props = {handleClick, styleString};
	const inlineLink_1 = styleString === style_3b ? 'clickable clickable-selected' : 'clickable';
	const inlineLink_2 = styleString === style_3d ? 'clickable clickable-selected' : 'clickable';

	return (
		<div>
			<p>Use 'justify-content' in a flex container to control where the children are placed along the x-axis.</p>
			
			<ClickHeader newStyle={style_3a} {...props}>justify-content: flex-start; (default)</ClickHeader>
			<p>Children will be placed at the start of the x-axis</p>
			<p>If you change the flex-direction, the x-axis will also change direction.  For example if you add the rules: <span onClick={() => handleClick(style_3b)} className={inlineLink_1}>“flex-direction: column; justify-content: flex-end”</span> to a flex container, the children will be placed at the bottom of the container, instead of to the right.</p> 

			<ClickHeader newStyle={style_3c} {...props}>justify-content: start;</ClickHeader>
			<p>Children will be placed at the start of writing-mode direction.  If <span onClick={() => handleClick(style_3d)} className={inlineLink_2}>writing mode is from right to left,</span> the children will be placed on the left side of the container.</p> 

			<ClickHeader newStyle={style_3e} {...props}>justify-content: space-between;</ClickHeader>
			<p>Children will be spread out across the x-axis, with space added between the child elements.  The first and last elements will be placed at the start and end of the x-axis.</p>

			<ClickHeader newStyle={style_3f} {...props}>justify-content: space-around;</ClickHeader>
			<p>Children will be spread out across the x-axis. Each child element will have the same amount of space added to the left and right of the child.  This means the spaces between the first and last children and the edges of the flex container will be half the size as the spaces between the child elements.</p>

			<ClickHeader newStyle={style_3g} {...props}>justify-content: space-evenly;</ClickHeader>
			<p>Children will be spread out across the x-axis. The space will be distributed to give an evenly spaced appearence.  The space between the edges of the flex container and the first and last children will be the same size as the space between the children.</p>
		</div>
	) 
}