import React, {useState} from 'react';
import InlineClicker from '../../../parts/InlineClicker/InlineClicker.jsx';
import ClickHeader from '../../../parts/ClickHeader/ClickHeader.jsx';
import {style_1} from './style_1.jsx';
import {style_2} from './style_2.jsx';
import {style_3} from './style_3.jsx';
import {style_4} from './style_4.jsx';
import {style_5} from './style_5.jsx'; 
import {style_6} from './style_6.jsx';

function Text({handleClick, styleString}) { 
	const props = {handleClick, styleString};

	return (
		<div>
			<p>Use 'justify-content' to control where child elements are placed along the x-axis of the flex container and where text is placed along the x-axis of the content area of the flex container.</p>

			<p>Any<InlineClicker newStyle={style_1} {...props}> padding you add to an element</InlineClicker> will be outside of the content area, and so will add space between any text and the edge of the element.</p>   

			<ClickHeader newStyle={style_2} {...props} title="justify-content: flex-start; (default)"> 
				<p>Child elements and text will be placed at the start of the x-axis.</p>
				<p>Text will be placed at the start of the x-axis of the content area.</p> 
			</ClickHeader> 
			
			<ClickHeader newStyle={style_3} {...props} title="justify-content: start;"> 
				<p>Child elements will be placed at the start of writing-mode direction.</p>
				<p>Text will be placed at the start of the writing-mode direction of the content area.</p>
				<p>If writing mode is from right to left, the start of the writing-mode direction will be the left side.</p> 
			</ClickHeader> 
 
			<ClickHeader newStyle={style_4} title="justify-content: space-between;" {...props}>
				<p>Child elements will be spread out across the x-axis.</p>
				<p>The first and last child elements will touch the edges of the x-axis.</p>
				<p>Space will be added between the other child elements along the x-axis.</p>
	 			<p>Text is not affected.</p>
 			</ClickHeader> 

 			<ClickHeader newStyle={style_5} title="justify-content: space-around;" {...props}>
	 			<p>Child elements will be spread out across the x-axis.</p>
				<p>Each child element will have the same amount of space added to the left and right of the child.</p>
				<p>This means the spaces between the first and last children and the edges of the flex container will be half the size as the spaces between the child elements.</p>
	 			<p>Text is not affected.</p>
 			</ClickHeader> 

 			<ClickHeader newStyle={style_6} title="justify-content: space-evenly;" {...props}>
				<p>Child elements will be spread out across the x-axis.</p>
				<p>The space will be distributed to give an evenly spaced appearence.</p>
				<p>The spacse between the edges of the flex container and the first and last child elements will be the same size as the spaces between the child elements.</p>
				<p>Text is not affected.</p>
			</ClickHeader>
		</div>
	)
}

export {Text}