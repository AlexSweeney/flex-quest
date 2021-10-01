import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default function Header() { 
	const [activeLink, setActiveLink] = useState(window.location.pathname); 
	
	function handleLinkClick(pathname) {
		setActiveLink(pathname);
	} 

	return (
		<header class="header">
			<Link to="/">
		  	<h1 className={activeLink === '/' ? 'link link-selected' : 'link'}  
		  			onMouseDown={() => handleLinkClick('/')}>Flex Quest</h1>
		  </Link>
		  <nav>
		  	<ul class="header-options">
		  		{/*<li>Intro</li>*/}
		  		<Link to="/learn">
		  			<li className={activeLink === '/learn' ? 'link link-selected' : 'link'} 
		  					onClick={() => handleLinkClick('/learn')}>Learn</li>
		  		</Link>
		  		{/*<Link to="/play">
		  			<li className={activeLink === '/play' ? 'link link-selected' : 'link'} 
		  					onClick={() => handleLinkClick('/play')}>Play</li>
		  		</Link>*/}
		  		{/*<li>Read</li>
		  		<li>Write</li>
		  		<li>Use</li>
		  		<li>Reference</li>
		  		<li>Support</li>*/}
		  	</ul>
		  </nav>
		</header>
	)
}

