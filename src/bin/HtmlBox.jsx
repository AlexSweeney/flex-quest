import React, {useState} from 'react'; 
import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx'; 
import {text_1} from './data/html/text_1.jsx'; 
import './HtmlBox.css';

export default function HtmlBox() {
	// const title = 'index.html';
	// const [value, setValue] = useState(text_1);

	return ( 
		<OpenCloseBox title="index.html">   
			{/*<pre>
				<code id="html">
					{text_1} 
				</code>
			</pre>*/} 
				{/*<textarea className="text-area" readonly> 
					{value}
				</textarea>*/}
		</OpenCloseBox>
	)
}