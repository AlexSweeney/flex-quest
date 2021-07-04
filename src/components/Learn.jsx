import React, {useState} from 'react';
import InfoBox from './InfoBox.jsx';
import CodeBox from './CodeBox.jsx'; 
// import HtmlBox from './HtmlBox.jsx';
// import CssBox from './CssBox.jsx';
import DisplayBox from './DisplayBox.jsx';
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';
import './LearnStyle.css';

// make boxes expand / decrease => move to component

export default function Learn() {
	const title = 'index.html';
	const [value, setValue] = useState('<p>hello</p>');

	return (
		<section className="learn-container">
			<InfoBox/>
			<CodeBox title={title} value={value} setValue={setValue}/>
			<DisplayBox html={value}/>
			{/*<HtmlBox/>
			<CssBox/>
			<DisplayBox/>*/}
			{/*
			<OpenCloseBox title="index.html" text="example-text"/>*/}
			{/*<OpenCloseBox title="index.html"/>
			<OpenCloseBox title="style.css"/>
			<OpenCloseBox/> */}
		</section>
	)
}