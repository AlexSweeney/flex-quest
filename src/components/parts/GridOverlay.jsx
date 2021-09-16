import React, {useState, useEffect} from 'react'; 
import './GridOverlayStyle.css';

export default function GridOverlay({showGrid, gridStatus}) {
	const numLines = 10;
	const [showGridClass, setShowGridClass] = useState('');
	const [gridColorClass, setGridColorClass] = useState('grid-line-over');

	useEffect(() => { 
		if(showGrid) setShowGridClass('grid-container-show')
		if(!showGrid) setShowGridClass('grid-container-hide') 
	}, [showGrid])

	useEffect(() => { 
		// if(gridStatus === 'grid-over') setGridColorClass('grid-line-over')
		// if(gridStatus === 'grid-down') setGridColorClass('grid-line-down') 
		// if(gridStatus === 'grid-selected') setGridColorClass('grid-line-selected') 
		// if(gridStatus === 'grid-out') setGridColorClass('grid-line-out') 
	}, [gridColorClass])

	useEffect(() => {
		console.log('gridStatus', gridStatus)
	}, [gridStatus])

	useEffect(() => {
		console.log('gridColorClass', gridColorClass)
	}, [gridColorClass])

	function VertLine() {
		return <div className={`grid-line grid-line-vert ${gridColorClass}`}></div>
	}

	return (
		<div className="grid-overlay">
			<div className={`grid-container ${showGridClass}`}>
				{Array(numLines).map(() => {
					return <VertLine/>
				})}
				<div className={`grid-line grid-line-vert ${gridColorClass}`}></div>
				<VertLine/>
				<VertLine/>
				<VertLine/>
				<VertLine/>
				<VertLine/>
				<VertLine/>
				<VertLine/>
				<VertLine/>
				<VertLine/>

				{/*<div className="grid-line-horiz" style={{left: "0"}}></div>
				<div className="grid-line-horiz" style={{left: "10%"}}></div>
				<div className="grid-line-horiz" style={{left: "20%"}}></div>
				<div className="grid-line-horiz" style={{left: "30%"}}></div>
				<div className="grid-line-horiz" style={{left: "40%"}}></div>
				<div className="grid-line-horiz" style={{left: "50%"}}></div>
				<div className="grid-line-horiz" style={{left: "60%"}}></div>
				<div className="grid-line-horiz" style={{left: "70%"}}></div>
				<div className="grid-line-horiz" style={{left: "80%"}}></div>*/}
			</div>
		</div>
	)
}