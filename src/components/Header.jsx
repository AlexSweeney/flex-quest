import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default function Header() {
	return (
		<header class="header">
			<Link to="/">
		  	<h1>Flex Quest</h1>
		  </Link>
		  <nav>
		  	<ul class="header-options">
		  		<Link to="/learn">
		  			<li>Learn</li>
		  		</Link>
		  		<Link to="/play">
		  			<li>Play</li>
		  		</Link>
		  	</ul>
		  </nav>
		</header>
	)
}

