import React, {useState, useEffect} from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './ClickHeaderStyle.css';
import './iconStyle.css';

export default function ClickHeader({title, newStyle, styleString, setStyleString, handleClick, passedClass = '', children}) { 
	const [showChildren, setShowChildren] = useState(false);
	const [playIconClass, setPlayIconClass] = useState('play-icon');
	const [playIconAnimating, setPlayIconAnimating] = useState(false);

	function handleIconClick() {
		setShowChildren(oldVal => !oldVal);
		setPlayIconAnimating(true);

		setTimeout(() => {
			setPlayIconAnimating(false);
		}, 500)
	}

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

	return (
		<div>
			<h2 className={(newStyle === styleString ? `info-header selected ${passedClass}`: `info-header ${passedClass}`)}
						onClick={() => { handleClick(newStyle, styleString, setStyleString); }}>{title}</h2>
			{/*<div className='icon' onClick={handleIconClick}>*/}
			<PlayArrowIcon className={playIconClass} onClick={handleIconClick}/>
			<div className={`child-container ${showChildren ? 'child-container-visible' : 'child-container-hidden'}`}>{children}</div>
		</div>
	)
					
}