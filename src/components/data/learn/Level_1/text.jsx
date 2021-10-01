import React, {useState} from 'react';
import ClickHeader from '../../../parts/ClickHeader/ClickHeader.jsx';
import {style_1} from './style_1.jsx';

function Text({handleClick, styleString} ) {
	const props = {handleClick, styleString}; 

	return (
		<>
			<p>Setting the display property on an element turns it into a flex container.</p> 
			<p>You can then use flex properties such as 'justify-content' on the flex container.</p>
			{/* <ClickHeader newStyle={style_1} i="1.1" {...props}>Try setting 'display: flex;' on item_2 to turn it into a flex container.</ClickHeader>
			<p>Once you do this, 'justify-content: center' will be applied, and the text will be centered along the y-axis.</p> */}
		</>
	)
}

export {Text}