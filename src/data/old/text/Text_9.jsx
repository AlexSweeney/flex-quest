import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
// import {style_8a} from './../css/style_7a.jsx'; 

import './Text.css';

export default function Text_9({handleClick, styleString}) { 
	const props = {handleClick, styleString}; 
	// const inlineLink_1 = styleString === style_7a ? 'clickable clickable-selected' : 'clickable';
	// const inlineLink_2 = styleString === style_7j ? 'clickable clickable-selected' : 'clickable';

	return (
		<div>
			<p>The 'flex-grow' property allows you to control what proportion of the extra space available with a flex-container will be added to a flex-item.</p>
			<p>In the example you can see that there are four items with 10% width leaving 60% extra space.  The total of the 'flex-grow' values is 6.  This means item_1, with a 'flex-grow' of 5 will get five sixths of the remaining space which is 50%, added to it's width of 10%.  item_2 has a 'flex-grow' of 1, so it will have one sixth of the remaining space, which is 10%, added to it's width of 10%.</p>
			<p>The blue boxes at the bottom have a width of 10% each and can be used as a visual reference.</p>
		</div>
	) 
}