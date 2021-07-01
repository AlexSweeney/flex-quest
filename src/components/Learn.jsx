import React, {useState} from 'react';
import InfoBox_2 from './parts/InfoBox_2.jsx';
import OpenCloseBox from './parts/OpenCloseBox.jsx';
import './LearnStyle.css';

// make boxes expand / decrease => move to component

export default function Learn() {
	return (
		<section className="learn-container">
			<InfoBox_2 />
			<OpenCloseBox title="index.html"/>
			<OpenCloseBox title="style.css"/>
			<OpenCloseBox/> 
		</section>
	)
}