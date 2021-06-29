import React from 'react';

import Level_1 from './LearnData/Level_1.jsx';

export default function LearnText({levelNum}) { 
 	const allData = [
		Level_1,
		/*level_2,*/
	];

	return (
		allData[levelNum]()
	)
}