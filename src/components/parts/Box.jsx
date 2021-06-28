import React, {useState} from 'react';
import Burger from './Burger.jsx';
import OpenCloseToggle from './OpenCloseToggle.jsx';
import './BoxStyle.css';

export default function Box({showBurger}) {
	const titles = [
		'Level 1',
		'Level 2',
		'Level 3',
		'Level 4',
		'Level 5',
		'Level 6',
		'Level 7',
		'Level 8',
		'Level 9',
		'Level 10',
		'Level 11',
		'Level 12',
		'Level 13',  
	];

	const text = [
		'text 1',
		'text 2',
		'text 3',
		'text 4',
		'text 5',
		'text 6',
		'text 7',
		'text 8',
		'text 9',
		'text 10',
		'text 11',
		'text 12',
		'text 13', 
	];

	const [selectedTitle, setSelectedTitle] = useState(titles[0]);
	const [isExpanded, setIsExpanded] = useState(true); 
	const [burgerIsOpen, setBurgerIsOpen] = useState(false);
	const [burgerWasOpen, setBurgerWasOpen] = useState(false);

	function handleOpenCloseToggleClick() {  
		if(isExpanded) {
			closeBox();
		} else if(!isExpanded) {
			openBox();
		}
	}

	function closeBox() {
		setBurgerIsOpen(false);
		setIsExpanded(false);
	}

	function openBox() {
		if(burgerWasOpen) setBurgerIsOpen(true);
		setIsExpanded(true);
	}

	function handleBurgerClick() {
		setBurgerIsOpen(oldVal => !oldVal);
		setBurgerWasOpen(oldVal => !oldVal);
	}

	function handleBurgerTitleClick(title) {
		setSelectedTitle(title);
	}

	return ( 
	 	<div className={(isExpanded ? "box expanded-box" : "box closed-box")}>
	 		<div className="box-header"> 
	 			<div className="burger-container">
	 				<Burger isOpen={burgerIsOpen} handleClick={handleBurgerClick}/>
	 			</div>

	 			<h2 className="title">{selectedTitle}</h2>
	 				
	 			<div className="toggle-container">
	 				<OpenCloseToggle isOpen={isExpanded} handleClick={handleOpenCloseToggleClick}/>
	 			</div>
	 		</div>
	 		<div className="box-body"> 
	 			<div className={isExpanded ? "text-body show" : "text-body no-show"}>
	 			{/*text[titles.indexOf(selectedTitle)] */}
	 				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum diam ex, ac gravida ex tristique vel. Morbi commodo turpis ut sem bibendum tempus. Aenean fermentum consequat tellus, ac pharetra est iaculis sed. Donec sed malesuada libero. Sed volutpat nulla non nibh tincidunt, sit amet hendrerit purus vehicula. Fusce pellentesque ante in lobortis vehicula. Pellentesque risus justo, gravida quis augue a, maximus tempus leo. Sed non accumsan metus. Integer interdum vehicula magna, id scelerisque dolor.</p>
	 			</div> 
	 			<div className={burgerIsOpen ? "burger-body full-height" : "burger-body no-height"}>
	 				{titles.map(title => <h3 className="burger-title" onClick={() => handleBurgerTitleClick(title)}>{title}</h3>)}
	 			</div>

	 		</div>
	 	</div> 
	)
}