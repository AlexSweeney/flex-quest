import React, {useState, useEffect} from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './ClickHeaderStyle.css'; 

export default function ClickHeader({title, i, newStyle, styleString, setStyleString, handleClick, passedClass = '', children}) { 
	/* 
		* show header and icon
		
		on click icon = toggle body text on / off

		on click header = apply header style + add color to header
		on reclick header = remove header style  + remove color from header

		

	*/

	// ================================= Ids ============================== // 
	const playIconId = `play-icon-${i}`;

	// ================================= State ============================== // 
	const [showChildren, setShowChildren] = useState(false); 
	const [playIconClass, setPlayIconClass] = useState('play-icon');
	const [playIconAnimating, setPlayIconAnimating] = useState(false);

	// ================================= Event Handler ============================== // 
	function handleIconClick() {
		setShowChildren(oldVal => !oldVal);
		setPlayIconAnimating(true);

		/*setTimeout(() => {
			setPlayIconAnimating(false);
		}, 500) */
	}

	function handleTransitionEnd(e) { 
		if(e.propertyName === 'transform') setPlayIconAnimating(false)
	}

	// ================================= Detect Transition End ============================== // 
	useEffect(() => {
		const playIconElement = document.getElementById(playIconId);

		if(playIconAnimating) playIconElement.addEventListener('transitionend', handleTransitionEnd)
		
		return () => { playIconElement.removeEventListener('transitionend', handleTransitionEnd) }
	}, [playIconAnimating])

	// ================================= Set Classes ============================== //
	useEffect(() => { 
		let newClass = 'play-icon';

		if(playIconAnimating) { 
			newClass += ' play-icon-animating';
		} 

		if(showChildren) {
			newClass += ' play-icon-selected';
		}

		setPlayIconClass(newClass);
	}, [playIconAnimating, showChildren])

	// ================================= Output ============================== //
	return (
		<div className='click-header'>
			<div className='header-container'>
				<h2 className={`info-header ${passedClass} ${newStyle === styleString ? 'selected' : ''}`} 
						onClick={() => { handleClick(newStyle, styleString, setStyleString); }}>{title}</h2> 
				<PlayArrowIcon className={playIconClass} onClick={handleIconClick} id={playIconId}/>
			</div> 
			<div className={`child-container ${showChildren ? 'child-container-visible' : 'child-container-hidden'}`}>{children}</div>
		</div>
	)
					
}