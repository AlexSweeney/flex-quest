import React from 'react';

export default function Button({children}) {
	console.log(children)
	return (
		<div className="learn-box-button">
			{children}
		</div>
	)
}
