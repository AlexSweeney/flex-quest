import React, {useState, useEffect} from 'react';
import Button from './../Button.jsx';
import GridOnIcon from '@material-ui/icons/GridOn';
import './GridButton.css';

export default function GridButton({gridStatus, setGridStatus}) {
	/*
		* on hover
			* change color
			* update Grid status

		* on down
			* change color 
			* update Grid status
	*/

	// ======================================= Constants ============================================ //
	// ====================  Status
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isSelected, setIsSelected] = useState(false); 

	// ====================  Class
	const [buttonColorClass, setButtonColorClass] = useState('');

	// ======================================= Event Handlers ======================================= //
	function onMouseOver() {
		setIsOver(true)
	}

	function onMouseOut() {
		setIsOver(false)
		setIsDown(false)
	}

	function onMouseDown() {
		setIsDown(true)
		setIsSelected(oldVal => !oldVal)
	}

	function onMouseUp() {
		setIsDown(false)
	}
  
	// ======================================= Helper Fns ============================================= //
	function updateGridStatus(isOver, isDown, gridStatus) {
		let newStatus;

		if(isOver) {
			if(isDown) newStatus = 'grid-down';
			if(!isDown) newStatus = 'grid-over';
		}

		if(!isOver) {
			if(isSelected) newStatus = 'grid-on';
			if(!isSelected) newStatus = 'grid-off';
		}

		setGridStatus(newStatus)
	}

	function updateButtonColorClass(gridStatus) {
		let newClass;

		if(gridStatus === 'grid-over') newClass = 'grid-button-over';
		if(gridStatus === 'grid-down') newClass = 'grid-button-down';
		if(gridStatus === 'grid-on')   newClass = 'grid-button-on';
		if(gridStatus === 'grid-off')  newClass = 'grid-button-off';

		setButtonColorClass(newClass)
	}

	// ======================================= Listen / Trigger ======================================= //
	// ========  Update Status
	useEffect(() => {
		updateGridStatus(isOver, isDown, gridStatus)
	}, [isOver, isDown, isSelected])
 	

	// ========  Update Color Class 
	useEffect(() => {
		updateButtonColorClass(gridStatus) 
	}, [gridStatus])

 
	// ======================================= Output ======================================= //
	return ( 
		<Button>
			<div onMouseOver={onMouseOver}
					onMouseOut={onMouseOut}
					onMouseDown={onMouseDown} 
					onMouseUp={onMouseUp}
					className={`grid-button ${buttonColorClass}`}>
				<GridOnIcon className="grid-icon" fontSize="inherit"/>
			</div>
		</Button>
	)
}