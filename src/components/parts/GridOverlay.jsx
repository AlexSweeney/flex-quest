import React, {useState, useEffect} from 'react'; 
import './GridOverlayStyle.css';

export default function GridOverlay({showGrid, gridStatus}) {
	const numLines = 10;
	const [showGridClass, setShowGridClass] = useState('');
	const [gridColorClass, setGridColorClass] = useState('grid-line-over');

	useEffect(() => { 
		if(showGrid || gridStatus === 'grid-over') setShowGridClass('grid-container-show')
		if(!showGrid && gridStatus !== 'grid-over') setShowGridClass('grid-container-hide') 
	}, [showGrid, gridStatus])

	useEffect(() => { 
		if(gridStatus === 'grid-over') setGridColorClass('grid-line-over')
		if(gridStatus === 'grid-down') setGridColorClass('grid-line-down') 
		if(gridStatus === 'grid-selected') setGridColorClass('grid-line-selected') 
		if(gridStatus === 'grid-out') setGridColorClass('grid-line-out') 
	}, [gridStatus])

	useEffect(() => {
		console.log('gridStatus', gridStatus)
	}, [gridStatus])

	useEffect(() => {
		console.log('gridColorClass', gridColorClass)
	}, [gridColorClass])

	function VertLine() {
		return <div className={`grid-line grid-line-vert ${gridColorClass}`}></div>
	}

	function HorizLine({num}) {
		const leftValue = num * (100 / numLines) + '%';
		return <div className={`grid-line-horiz ${gridColorClass}`} style={{left: leftValue}}></div>
	}

	return (
		<div className="grid-overlay">
			<div className={`grid-container ${showGridClass}`}>
				{[...Array(numLines).keys()].map(() => {
					return <VertLine/>
				})} 

				{[...Array(numLines).keys()].map((i) => {
					return <HorizLine num={i}/>
				})} 

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