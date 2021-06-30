import React, {useState} from 'react';
import InfoBox from './parts/InfoBox.jsx';
import Box from './parts/Box.jsx';
import './LearnStyle.css';

// make boxes expand / decrease => move to component

export default function Learn() {
	return (
		<section className="learn-container">
			<InfoBox/>
			{/*<Box/>
			<Box/>
			<Box/> 
*/}		</section>
	)
}