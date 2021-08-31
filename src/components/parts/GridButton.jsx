import React, {useState} from 'react';
import GridOnIcon from '@material-ui/icons/GridOn';
import './GridButton.css';

export default function GridButton({handleClick, selected}) {
	return (
		<div onMouseDown={handleClick} className={selected ? "grid-button grid-button-selected" : 'grid-button'}>
			<GridOnIcon className="grid-icon" fontSize="inherit"/>
		</div>
	)
}