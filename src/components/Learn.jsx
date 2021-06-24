import React, {useState} from 'react';
import Box from './parts/Box.jsx';
import './LearnStyle.css';

// make boxes expand / decrease => move to component

export default function Learn() {
	return (
		<section className="learn-container">
			<Box
				showBurger="true" 
			/>
			<Box/>
			<Box/>
			<Box/> 
		</section>
	)
}