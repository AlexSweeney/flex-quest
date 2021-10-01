import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
import {style_10a} from './../css/style_10a.jsx'; 
import {style_10b} from './../css/style_10b.jsx'; 

import './Text.css';

export default function Text_10({handleClick, styleString}) { 
	const props = {handleClick, styleString};  

	return (
		<div>
			<p>The ‘flex-shrink’ property allows you to control how much an item will shrink when it doesn’t have enough space.</p>

			<p>In the example you can see that item 2 has a flex-shrink value of 0, so it doesn’t shrink taking up all of the available space.</p> 

			<p>If you <ClickHeader newStyle={style_10a} {...props}>set the flex-shrink value of item 2 to 1</ClickHeader>, there will be a 1:1 ratio between item 1 and 2.  This means item 1 and item 2 will shrink the same amount, taking up half of the avaialbe space each.</p> 

			<p>If you  <ClickHeader newStyle={style_10b} {...props}>set the flex-shrink value of item 1 to 4, and item 2 to 1,</ClickHeader> there will be a 4:1 ratio. This means item 1 will shrink 4 times as much as item 2, so that item 2 will take up 4 times the amount of space as item 1.</p>
		</div>
	) 
}