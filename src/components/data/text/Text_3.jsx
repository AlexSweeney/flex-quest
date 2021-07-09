import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
import {style_3} from './../css/style_3.jsx';
import {style_3a} from './../css/style_3a.jsx';
import './Text.css';

export default function Text_3({handleClick, styleString}) { 
	const props = {handleClick, styleString};
	const inlineLink = styleString === style_3a ? 'clickable clickable-selected' : 'clickable';
	return (
		<div>
			<p>Use 'justify-content' in a flex container to control where the children are placed along the x-axis.</p>
			<p>If you change the flex-direction, the x-axis will also change direction.  For example if you add the rules: <span onClick={() => handleClick(style_3a)} className={inlineLink}>“flex-direction: column; justify-content: flex-end”</span> to a flex container, the children will be placed at the bottom of the container, instead of to the right.</p>
		</div>
	)
}





// justify-content: flex-start; (default)
// Children placed at the start of the flex-direction.

// justify-content: flex-end;
// Children are placed at the end of the flex-direction.

// justify-content: center;

// justify-content: start;
// Children placed at the start of writing-mode direction.

// justify-content: left;

// justify-content: right;

// justify-content: space-between;
// space is added inside the children.

// justify-content: space-around;
// space is added around all the children, equal amounts are added to the left and right (or top and bottom of the children).

// justify-content: space-evenly;
// space is divided so that the children are spaced evenly.