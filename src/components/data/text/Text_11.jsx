import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
// import {style_10a} from './../css/style_10a.jsx';  

import './Text.css';

export default function Text_11({handleClick, styleString}) { 
	const props = {handleClick, styleString};  

	return (
		<div>
			<p>The flex-basis property is used to set the initial size of an item.</p>

			<p>It is different to the min-width property, because items with flex-basis shrink in the same way that other flex-items do, whereas items with a min-width set will not go below that width.</p>

			<p>In the example you can see that when you shrink the window ....</p> 
		</div>
	) 
}