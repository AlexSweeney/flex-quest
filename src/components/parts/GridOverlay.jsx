import React from 'react'; 
import './GridOverlayStyle.css';

export default function GridOverlay({showGrid}) {
	return (
		<div className="grid-overlay">
			<div className={"grid-container " +(showGrid ? "" : "grid-container-hide") }>
				<div className="grid-line-vert"></div>
				<div className="grid-line-vert"></div>
				<div className="grid-line-vert"></div>
				<div className="grid-line-vert"></div>
				<div className="grid-line-vert"></div>
				<div className="grid-line-vert"></div>
				<div className="grid-line-vert"></div>
				<div className="grid-line-vert"></div>
				<div className="grid-line-vert"></div>

				<div className="grid-line-horiz" style={{left: "0"}}></div>
				<div className="grid-line-horiz" style={{left: "10%"}}></div>
				<div className="grid-line-horiz" style={{left: "20%"}}></div>
				<div className="grid-line-horiz" style={{left: "30%"}}></div>
				<div className="grid-line-horiz" style={{left: "40%"}}></div>
				<div className="grid-line-horiz" style={{left: "50%"}}></div>
				<div className="grid-line-horiz" style={{left: "60%"}}></div>
				<div className="grid-line-horiz" style={{left: "70%"}}></div>
				<div className="grid-line-horiz" style={{left: "80%"}}></div>
			</div>
		</div>
	)
}