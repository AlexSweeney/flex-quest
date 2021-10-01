import React, {useState} from 'react';
import ClickHeader from './ClickHeader.jsx';
import {style_5a} from './../css/style_5a.jsx'; 
import {style_5b} from './../css/style_5b.jsx';
import {style_5c} from './../css/style_5c.jsx';
import {style_5d} from './../css/style_5d.jsx';
import {style_5e} from './../css/style_5e.jsx';
import {style_5f} from './../css/style_5f.jsx';
import {style_5g} from './../css/style_5g.jsx';
import {style_5h} from './../css/style_5h.jsx';
import {style_5i} from './../css/style_5i.jsx';
import {style_5j} from './../css/style_5j.jsx';
import {style_5k} from './../css/style_5k.jsx';
import {style_5l} from './../css/style_5l.jsx';
import {style_5m} from './../css/style_5m.jsx';
import {style_5n} from './../css/style_5n.jsx';
import {style_5o} from './../css/style_5o.jsx';
import {style_5p} from './../css/style_5p.jsx';
import './Text.css';

export default function Text_5({handleClick, styleString}) { 
	const props = {handleClick, styleString}; 
	return (
		<div>
 			<p>The 'flex-flow' property is a short hand form for setting 'flex-direction' and 'flex-wrap'.</p>
 			<p>You can enter a property for 'flex-direction', a property for 'flex-wrap' or a property for each.</p> 
 			<p>If you want to know how 'flex-direction' and 'flex-wrap' work, look at previous lessons.</p>
			 
			<ClickHeader newStyle={style_5a} {...props}>flex-flow: row;</ClickHeader>
			<p>Set the 'flex-direction' to 'row'.</p>

			<ClickHeader newStyle={style_5b} {...props}>flex-flow: row-reverse;</ClickHeader>
			<p>Set the 'flex-direction' to 'row-reverse'.</p>
			 
 			<ClickHeader newStyle={style_5c} {...props}>flex-flow: column;</ClickHeader>
			<p>Set the 'flex-direction' to 'column'.</p>
 			
 			<ClickHeader newStyle={style_5d} {...props}>flex-flow: column-reverse;</ClickHeader>
			<p>Set the 'flex-direction' to 'column-reverse'.</p>

			<ClickHeader newStyle={style_5e} {...props}>flex-flow: nowrap;</ClickHeader>
			<p>Set the 'flex-wrap' to 'nowrap'.</p> 

			<ClickHeader newStyle={style_5f} {...props}>flex-flow: wrap;</ClickHeader>
			<p>Set the 'flex-wrap' to 'wrap'.</p>  

			<ClickHeader newStyle={style_5g} {...props}>flex-flow: wrap-reverse;</ClickHeader>
			<p>Set the 'flex-wrap' to 'wrap-reverse'.</p>  

			<ClickHeader newStyle={style_5h} {...props}>flex-flow: row nowrap;</ClickHeader>
			<p>Set the 'flex-direction' to 'row', set 'flex-wrap' to 'nowrap'.</p>  

			<ClickHeader newStyle={style_5i} {...props}>flex-flow: row wrap;</ClickHeader>
			<p>Set the 'flex-direction' to 'row', set 'flex-wrap' to 'wrap'.</p>

			<ClickHeader newStyle={style_5j} {...props}>flex-flow: row wrap-reverse;</ClickHeader>
			<p>Set the 'flex-direction' to 'row', set 'flex-wrap' to 'wrap-reverse'.</p>
			
			<ClickHeader newStyle={style_5k} {...props}>flex-flow: column nowrap;</ClickHeader>
			<p>Set the 'flex-direction' to 'row', set 'column' to 'nowrap'.</p>  

			<ClickHeader newStyle={style_5l} {...props}>flex-flow: column wrap;</ClickHeader>
			<p>Set the 'flex-direction' to 'row', set 'column' to 'wrap'.</p>

			<ClickHeader newStyle={style_5m} {...props}>flex-flow: column wrap-reverse;</ClickHeader>
			<p>Set the 'flex-direction' to 'row', set 'column' to 'wrap-reverse'.</p>

			<ClickHeader newStyle={style_5n} {...props}>flex-flow: column-reverse nowrap;</ClickHeader>
			<p>Set the 'flex-direction' to 'row', set 'column-reverse' to 'nowrap'.</p>  

			<ClickHeader newStyle={style_5o} {...props}>flex-flow: column-reverse wrap;</ClickHeader>
			<p>Set the 'flex-direction' to 'row', set 'column-reverse' to 'wrap'.</p>

			<ClickHeader newStyle={style_5p} {...props}>flex-flow: column-reverse wrap-reverse;</ClickHeader>
			<p>Set the 'flex-direction' to 'row', set 'column-reverse' to 'wrap-reverse'.</p> 
		</div>
	) 
}