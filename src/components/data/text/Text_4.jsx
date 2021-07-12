import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
import {style_4a} from './../css/style_4a.jsx'; 
import {style_4b} from './../css/style_4b.jsx'; 
import {style_4c} from './../css/style_4c.jsx'; 
import './Text.css';

export default function Text_4({handleClick, styleString}) { 
	const props = {handleClick, styleString}; 
	return (
		<div>
			<p>The 'flex-wrap' property allows you to control what happens when the flex container's children don't fit inside.</p>

			<ClickHeader newStyle={style_4a} {...props}>flex-wrap: nowrap; (default)</ClickHeader>
			<p>All children will stay on one line.</p>

			<ClickHeader newStyle={style_4b} {...props}>flex-wrap: wrap;</ClickHeader>
			<p>Children that don't fit will be spread out below the other content.</p>

			<ClickHeader newStyle={style_4c} {...props}>flex-wrap: wrap-reverse;</ClickHeader>
			<p>Children that don't fit will be placed above the other content.</p> 
		</div>
	) 
}