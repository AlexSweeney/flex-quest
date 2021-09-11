export function detectTransition(id, propertyName, onChange) {
	let numTransitions = 0; 

	let element = document.getElementById(id);
	if(!element) return;

	element.addEventListener('transitionstart', (e) => { 
		if(e.propertyName === propertyName && e.srcElement.id === id) { 
			numTransitions += 1; 
			if(numTransitions === 1) onChange(true)
		}
	})

 	element.addEventListener('transitionend', (e) => {
		if(e.propertyName === propertyName && e.srcElement.id === id) {
			numTransitions -= 1;
			if(numTransitions === 0) onChange(false)
		}
	}) 
}

export function detectTransitions(id, propertyNames, onChange) {
	let numTransitions = 0; 
	
	propertyNames.forEach(propertyName => {
		addListeners(id, propertyName, numTransitions, onChange)
	})
}

function addListeners(id, propertyName, numTransitions, onChange) {
	let element = document.getElementById(id);

	if(!element) {
		console.log('error no element')
	} else {
		element.addEventListener('transitionstart', (e) => {
			if(e.propertyName === propertyName && e.srcElement.id === id) {
				numTransitions += 1;
				if(numTransitions === 1) onChange(true)
			}
		})

	 	element.addEventListener('transitionend', (e) => {
			if(e.propertyName === propertyName && e.srcElement.id === id) {
				numTransitions -= 1;
				if(numTransitions === 0) onChange(false)
			}
		})
	}
}