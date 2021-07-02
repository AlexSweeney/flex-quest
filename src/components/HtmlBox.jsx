import React, {useState} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
// make boxes expand / decrease => move to component

export default function HtmlBox() {
	const title = 'index.html';
	// const text = <pre><div id=”item_1”>Item 1 text</div><div id=”item_2”>Item 2 text</div></pre>;
	const html = '<p>hello</p>';

	function escapeHtml(string) {
		let a = string.replace('<', '&lt;').replace('>', '&gt;');
		console.log('a', a);
		return a;
	}

	escapeHtml(html);

	return ( 
		<div>
			<OpenCloseBox title="hello world">
				<pre>
					<code>
&lt;p>Hello world&lt;/p>
					</code>
				</pre> 
			</OpenCloseBox>
		</div>
		
	)
}

{/* <OpenCloseBox title={title} text={text}/> */}