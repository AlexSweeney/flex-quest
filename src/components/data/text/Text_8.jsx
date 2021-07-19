import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
// import {style_8a} from './../css/style_7a.jsx'; 

import './Text.css';

export default function Text_8({handleClick, styleString}) { 
	const props = {handleClick, styleString}; 
	// const inlineLink_1 = styleString === style_7a ? 'clickable clickable-selected' : 'clickable';
	// const inlineLink_2 = styleString === style_7j ? 'clickable clickable-selected' : 'clickable';

	return (
		<div>
			<p>You can use the 'order' property to rearrange flex items, making them appear in a different order.</p>
			<p>The flex items with the lowest 'order' values will be placed first, and the flex items with the highest 'order' values will be placed last.  If two items have the same value, the one that appears first in the html will be placed first.</p>
		</div>
	) 
}