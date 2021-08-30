import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
// import {style_10a} from './../css/style_10a.jsx';  

import './Text.css';

export default function Text_12({handleClick, styleString}) { 
	const props = {handleClick, styleString};  

	return (
		<div>
			<p>The flex property is shorthand property for flex-grow, flex-shrink and flex-basis.  Only the flex-grow is manditory, the other settings are optional.</p>
		</div>
	) 
}