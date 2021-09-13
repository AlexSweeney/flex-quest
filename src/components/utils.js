export function detectTransition(id, propertyName, onChange) {
	let numTransitions = 0; 

	let element = document.getElementById(id);
	if(!element) {
		console.log('Error: detectTransition element not found: id = ', id)
		return;
	} 

	if(element) {
		console.log('detectTransition element found: id = ', id)
	}

	addListeners(id, propertyName, numTransitions, onChange)
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
		console.log('Error: detectTransition element not found: id = ', id)
	} else {
		element.addEventListener('transitionstart', (e) => {
			console.log('transitionstart id', id)
			console.log(e)
			console.log('=========================')
			if(e.propertyName === propertyName && e.srcElement.id === id) {
				numTransitions += 1;
				if(numTransitions === 1) onChange(true)
			}
		})

	 	element.addEventListener('transitionend', (e) => {
	 		console.log('transitionend id', id)
	 		console.log(e)
	 		console.log('=========================')
			if(e.propertyName === propertyName && e.srcElement.id === id) {
				numTransitions -= 1;
				if(numTransitions === 0) onChange(false)
			}
		})
	}
}