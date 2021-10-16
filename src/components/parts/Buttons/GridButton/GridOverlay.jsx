import React, {useState, useEffect} from 'react'; 
import './GridOverlayStyle.css';

export default function GridOverlay({gridStatus}) {   
	/*
		* show numLines - grid lines
			
		* on gridStatus change
			* update color 
	*/

	// ====================================== Constants ====================================== //
	// ================ Settings
	const numLines = 10;
	const showOnHover = true; 
	const gridStatusToColorClass = {
		'grid-over-on':  'grid-line-over',
		'grid-over-off': 'grid-line-off',
		'grid-down-on':  'grid-line-down',  
		'grid-down-off': 'grid-line-off',
		'grid-on': 			 'grid-line-on',
		'grid-off':		 	 'grid-line-off',
	};

	// ================ Class
	const [gridColorClass, setGridColorClass] = useState(''); 

	// ====================================== Helper Fns ====================================== //
	function updateGridColorClass(gridStatus) {
		let newClass = gridStatusToColorClass[gridStatus]; 
		setGridColorClass(newClass)
	}

	function getLeftOffset(i) {
		return i * (100 / numLines) + '%';
	}

	// ====================================== Constants ====================================== //
	useEffect(() => {  
		updateGridColorClass(gridStatus)
	}, [gridStatus])   

	// ====================================== Output ========================================= //
	return (
		<div className="grid-overlay">
			{
				[...Array(numLines - 1).keys()].map(() => {
					return <div className={`grid-line grid-line-horiz ${gridColorClass}`}></div>
				})
			}
			{
				[...Array(numLines - 1).keys()].map((i) => {
					const leftValue = getLeftOffset(i);
					return <div className={`grid-line grid-line-vert ${gridColorClass}`} style={{left: leftValue}}></div>	
				})
			}
		</div>
	)
}