import React, {useState} from 'react';
import InlineClicker from '../../../parts/InlineClicker/InlineClicker.jsx';
import {style_1} from './style_1.jsx';

function Text({handleClick, selectedStyle}) {  
	// const [selectedHeader, setSelectedHeader] = useState(null);
	// const props = {selectedHeader, setSelectedHeader, setSelectedStyle};

	return (
		<>
			<p>Setting the display property on an element turns it into a flex container.</p> 
			<p>You can then use flex properties such as 'justify-content' on the flex container.</p>
			<p>Try setting <InlineClicker thisStyle={style_1} selectedStyle={selectedStyle} i="1.1" handleClick={handleClick}>'display: flex;'</InlineClicker> on item_2 to turn it into a flex container.</p>
			<p>Once you do this, 'justify-content: center' will be applied, and the text will be centered along the y-axis.</p>
		</>
	)
}

export {Text}