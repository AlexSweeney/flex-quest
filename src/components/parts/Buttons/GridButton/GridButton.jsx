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

	// if(gridStatus === 'grid-over-on' || gridStatus === 'grid-over-off') newClass = 'grid-button-over';
	// 	if(gridStatus === 'grid-down-on' || gridStatus === 'grid-down-off') newClass = 'grid-button-down';
	// 	if(gridStatus === 'grid-on')   newClass = 'grid-button-on';
	// 	if(gridStatus === 'grid-off')  newClass = 'grid-button-off';

	// ======================================= Constants ============================================ //
	// ====================  Status
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [isSelected, setIsSelected] = useState(false); 

	// ====================  Class
	const gridStatusToColorClass = {
		'grid-over-on' : 'grid-button-over',
		'grid-over-off': 'grid-button-over',
		'grid-down-on' : 'grid-button-down',
		'grid-down-off': 'grid-button-down',
		'grid-on' 		 : 'grid-button-on',
		'grid-off'		 : 'grid-button-off',
	};

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
			if(isDown) {
				if(isSelected) newStatus = 'grid-down-on';
				if(!isSelected) newStatus = 'grid-down-off';
			}

			if(!isDown) {
				if(isSelected) newStatus = 'grid-over-on';
				if(!isSelected) newStatus = 'grid-over-off';
			}
		}

		if(!isOver) {
			if(isSelected) newStatus = 'grid-on';
			if(!isSelected) newStatus = 'grid-off';
		}

		setGridStatus(newStatus)
	}

	function updateButtonColorClass(gridStatus) {
		const newClass = gridStatusToColorClass[gridStatus]; 
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