import React from 'react';
import {learnData} from './learnData.jsx';
 
export default function LearnText({levelNum}) { 
	return (
		learnData[levelNum]
	)
}