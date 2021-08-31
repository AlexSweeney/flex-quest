import React, {useState} from 'react';
import GridOnIcon from '@material-ui/icons/GridOn';
import './GridButton.css';

export default function GridButton({handleClick}) {
	return (
		<div onclick={handleClick} className="grid-button">
			<GridOnIcon className="grid-icon" fontSize="inherit"/>
		</div>
	)
}