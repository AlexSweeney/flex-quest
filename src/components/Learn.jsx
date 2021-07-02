import React, {useState} from 'react';
import InfoBox from './InfoBox.jsx';
import HtmlBox from './HtmlBox.jsx';
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';
import './LearnStyle.css';

// make boxes expand / decrease => move to component

export default function Learn() {
	
	return (
		<section className="learn-container">
			<InfoBox/>
			<HtmlBox/>
			{/*
			<OpenCloseBox title="index.html" text="example-text"/>*/}
			{/*<OpenCloseBox title="index.html"/>
			<OpenCloseBox title="style.css"/>
			<OpenCloseBox/> */}
		</section>
	)
}