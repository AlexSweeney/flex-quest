import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';

export default function Header() { 
	const [activeLink, setActiveLink] = useState(window.location.pathname); 
	const [logoClass, setLogoClass] = useState('header-logo');
	const [learnClass, setLearnClass] = useState('header-link');

	// ================== Util Fns
	const updateLogoClass = (activeLink) => {
		let newClass;
		
		if(['/', '/home', '/flex-quest'].indexOf(activeLink) !== -1) {
			newClass = 'header-logo header-logo__selected';
		} else {
			newClass = 'header-logo';
		}

		setLogoClass(newClass)
	}

	const updateLinkClass = (activeLink, targetLink, setClass) => { 
		let newClass; 

		if(activeLink === targetLink) {
			newClass = 'header-link header-link__selected';
		} else {
			newClass = 'header-link';
		} 

		setClass(newClass);
	}

	// ================== Event Handlers
	const onChangeActiveLink = (activeLink) => {
		updateLogoClass(activeLink);
		updateLinkClass(activeLink, '/learn', setLearnClass); 
	}
 
	const onLinkClick = (pathname) => {
		setActiveLink(pathname);
	};

	// ================== Listeners
	useEffect(() => {
		onChangeActiveLink(activeLink)
	}, [activeLink])

	// ================== Output
	return (
		<header className="header">
			<Link to="/">
				<h1 className={logoClass}  
		  			onMouseDown={() => onLinkClick('/')}>Flex Quest</h1>
		  	{/* <h1 className={activeLink === '/' ? 'link link-selected' : 'link'}  
		  			onMouseDown={() => handleLinkClick('/')}>Flex Quest</h1> */}
		  </Link>
		  <nav>
		  	<ul className="header-options">
		  		{/*<li>Intro</li>*/}
		  		<Link to="/learn">
		  			<li className={learnClass} 
		  					onClick={() => onLinkClick('/learn')}>Learn</li>
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