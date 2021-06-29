import React, {useState} from 'react';
import Box from './Box.jsx';
import {learnData} from '../data/learnData.jsx';

export default function InfoBox({showBurger}) {
	const titles = [
		'Level 1: display: flex',
		'Level 2: flex-direction',
		'Level 3: justify-content',
		'Level 4: flex-wrap',
		'Level 5: flex-flow',
		'Level 6: align-items',
		'Level 7: align-content',
		'Level 8: order',
		'Level 9: flex-grow',
		'Level 10: flex-shrink',
		'Level 11: flex-basis',
		'Level 12: flex',
		'Level 13: align-self',  
	]; 

	return (
		<Box menuOptions={titles} textOptions={learnData}/>
	)
}