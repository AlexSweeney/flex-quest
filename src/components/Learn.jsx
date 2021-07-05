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
	const inital = `
<div class="item_1">Item 1 text</div>
<div class="item_2">Item 2 text</div>`;
	const [value, setValue] = useState(inital);

	return (
		<section className="learn-container">
			<InfoBox/>
			<CodeBox title={title} value={value} setValue={setValue}/>
			<DisplayBox htmlString={value}/>
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