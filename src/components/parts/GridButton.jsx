import React, {useState, useEffect} from 'react';
import GridOnIcon from '@material-ui/icons/GridOn';
import './GridButton.css';

export default function GridButton({handleClick, gridStatus, setGridStatus, setShowGrid}) {
	// ====================  Status ========================= //
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isSelected, setIsSelected] = useState(false); 
	const [gridStatusClass, setGridStatusClass] = useState('');

	// ====================  Event Handlers ========================= //
	function handleMouseOver() {
		setIsOver(true)
	}

	function handleMouseOut() {
		setIsOver(false)
		setIsDown(false)
	}

	function handleMouseDown() {
		setIsDown(true)
		setIsSelected(oldVal => !oldVal)
	}

	function handleMouseUp() {
		setIsDown(false)
	}

	// ====================  Update Status ========================= //
	useEffect(() => {
		if(isOver) {
			if(isDown) setGridStatus('grid-down')
			else setGridStatus('grid-over')
		}

		if(!isOver) {
			if(isSelected) setGridStatus('grid-selected')
			else setGridStatus('grid-out')
		}

	}, [isOver, isDown, isSelected])


	useEffect(() => {
		setShowGrid(isSelected)
	}, [isSelected])

	// ====================  Update Class ========================= //
	useEffect(() => {
		let newClass;

		if(gridStatus === 'grid-over') newClass = 'grid-button-over';
		if(gridStatus === 'grid-out') newClass = 'grid-button-out';
		if(gridStatus === 'grid-down') newClass = 'grid-button-down';
		if(gridStatus === 'grid-selected') newClass = 'grid-button-selected';

		setGridStatusClass(newClass)
	}, [gridStatus])

	// ====================  Console.logs ========================= //
	// useEffect(() => {
	// 	console.log('gridStatus', gridStatus)
	// }, [gridStatus])

	// ====================  Output ========================= //
	return (
		<div onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onMouseDown={handleMouseDown} 
			onMouseUp={handleMouseUp}
			className={`grid-button ${gridStatusClass}`}>
			<GridOnIcon className="grid-icon" fontSize="inherit"/>
		</div>
	)
}