import React, {useState} from 'react';
import InfoBox from './InfoBox.jsx';
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';
/*import OpenCloseBox from './parts/OpenCloseBox.jsx';*/
import './LearnStyle.css';

// make boxes expand / decrease => move to component

export default function Learn() {
	
	return (
		<section className="learn-container">
			<InfoBox/>
			{/*<OpenCloseBox title="index.html"/>
			<OpenCloseBox title="style.css"/>
			<OpenCloseBox/> */}
		</section>
	)
}