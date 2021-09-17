import React, {useState, useEffect} from 'react'; 
import './GridOverlayStyle.css';

export default function GridOverlay({gridStatus, showGrid}) {   
	const numLines = 10;
	const showOnHover = true;
	const showOnOffHover = false;
	const [gridColorClass, setGridColorClass] = useState(''); 

	useEffect(() => { 
		if(showOnOffHover || !showOnOffHover && showGrid) {
			if(gridStatus === 'grid-over') setGridColorClass('grid-line-over')
			if(gridStatus === 'grid-down') setGridColorClass('grid-line-down') 
			if(gridStatus === 'grid-selected') setGridColorClass('grid-line-selected') 
			if(gridStatus === 'grid-out') setGridColorClass('grid-line-out') 
		}

		if(!showOnOffHover && !showGrid) {
			setGridColorClass('grid-line-out') 
		}
	}, [gridStatus, showGrid])  

	return (
		<div className="grid-overlay">
			{
				[...Array(numLines - 1).keys()].map(() => {
					return <div className={`grid-line grid-line-horiz ${gridColorClass}`}></div>
				})
			}
			{
				[...Array(numLines - 1).keys()].map((i) => {
					const leftValue = i * (100 / numLines) + '%';
					return <div className={`grid-line grid-line-vert ${gridColorClass}`} style={{left: leftValue}}></div>	
				})
			}
		</div>
	)
}