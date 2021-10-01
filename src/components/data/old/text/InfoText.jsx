import React, {useState} from 'react'; 
import Text_1 from './Text_1.jsx';
import './textStyle.css';

/*function Text({styleString, handleClick}) {
	return (
		<>
			<p>Flex direction allows you to set the direction the child elements of the flex container are displayed.</p>  
			<ClickHeader styleString={styleString} handleClick={handleClick} newStyle={style_2a}>flex-direction: row; (default)</ClickHeader> 
			<p>display children from left to right.</p>  
		</>
	)
}*/

/*function ClickHeader({newStyle, styleString, handleClick, children}) { 
	return <h2 className={newStyle === styleString ? "info-header selected" : "info-header"}
						onClick={() => { handleClick(newStyle); }}>{children}</h2>
}
*/

export default function InfoText({handleClick, text}) {
/*	const levels = [
		Text_1,
	];*/
	// const Text = levels[levelNum];

	return (
		<div className="info-text">
			<Text styleString={styleString} handleClick={handleClick}/>
		</div>
	)
}

 