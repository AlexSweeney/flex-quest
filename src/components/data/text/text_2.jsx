import {style_2a} from './../css/style_2a.jsx';
import {style_2b} from './../css/style_2b.jsx';
import {style_2c} from './../css/style_2c.jsx';
import {style_2d} from './../css/style_2d.jsx';

export const text_2 = <>
	<p>Flex direction allows you to set the direction the child elements of the flex container are displayed.</p>  
	<p className="bold" onDown={() => handleDown(style_2a)>flex-direction: row; (default)</p>  
	<p>display children from left to right.</p>  
	<p className="bold" onDown={() => handleDown(style_2b)>flex-direction: row-reverse;</p>  
	<p>display children from right to left.</p>  
	<p className="bold" onDown={() => handleDown(style_2c)>flex-direction: column;</p>  
	<p>display children from top to bottom.</p>   
	<p className="bold" onDown={() => handleDown(style_2d)>flex-direction: column-reverse;</p>  
	<p>display children from bottom to top.</p>
	<p>Try setting 'flex-direction' on '.container' to the different values.</p>
</>