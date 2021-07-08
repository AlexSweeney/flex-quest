import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
import {style_1a} from './../css/style_1a.jsx';

export default function Text_1({handleClick, styleString}) {
	const props = {handleClick, styleString};

	return (
		<>
			<p>Set the display property to flex to turn an element into a flex container.</p>
			<ClickHeader newStyle={style_1a} {...props}>display: flex;</ClickHeader> 
			<br/>
			<p>You can then use flex properties such as 'justify-content' on the flex container and it's children.</p>
			<p>Try setting 'display: flex;' on item_2 to turn it into a flex container.</p>
			<p>Once you do this, 'justify-content: center' will be applied.</p>
		</>
	)
}