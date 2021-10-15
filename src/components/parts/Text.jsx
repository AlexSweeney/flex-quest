import React, {useEffect} from 'react';

import {Text as Text_1} from './../data/learn/Level_1/text.jsx';
import {Text as Text_2} from './../data/learn/Level_2/text.jsx';
/*import Text_3 from './../data/text/Text_3.jsx';
import Text_4 from './../data/text/Text_4.jsx';
import Text_5 from './../data/text/Text_5.jsx';
import Text_6 from './../data/text/Text_6.jsx';
import Text_7 from './../data/text/Text_7.jsx';
import Text_8 from './../data/text/Text_8.jsx';
import Text_9 from './../data/text/Text_9.jsx';
import Text_10 from './../data/text/Text_10.jsx';
import Text_11 from './../data/text/Text_11.jsx';
import Text_12 from './../data/text/Text_12.jsx';
import Text_13 from './../data/text/Text_13.jsx';*/


export default function Text({levelNum, handleStyleOptionClick}) {  
	/*
		* Display Text that matches levelNum

	*/

	const allText = [
		Text_1,
		Text_2,
		/*Text_3,
		Text_4,
		Text_5,
		Text_6,
		Text_7,
		Text_8,
		Text_9,
		Text_10,
		Text_11,
		Text_12,
		Text_13,*/
	];

	const ThisText = allText[levelNum]; 
	
	return <ThisText handleStyleOptionClick={handleStyleOptionClick}/>
}