import React, {useState} from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import './RefreshButton.css';

export default function RefreshButton({onClick}) {
	const [rotateNum, setRotateNum] = useState(0);
	
	function refreshDown() {
		onClick();
		setRotateNum(oldVal => oldVal + 360);
	}

	const iconStyle = {
		'transform': `rotate(${rotateNum}deg)`,
		'transition': 'transform 1000ms',
	}

	return ( 
		<div className="refresh-button" onMouseDown={refreshDown}>
			<RefreshIcon className="refresh-icon" style={iconStyle} fontSize="inherit"/>
		</div>
	)
}