import React, {useState} from 'react';
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';
/*import OpenCloseBox from './parts/OpenCloseBox.jsx';*/
import './LearnStyle.css';

// make boxes expand / decrease => move to component

export default function Learn() {
	const menuOptions = [
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
		<section className="learn-container">
			<OpenCloseBox menuOptions={menuOptions}/>
			{/*<OpenCloseBox title="index.html"/>
			<OpenCloseBox title="style.css"/>
			<OpenCloseBox/> */}
		</section>
	)
}