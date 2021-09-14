export function detectTransition(id, propertyName, onChange) {
	let element = document.getElementById(id);
	if(!element) {
		console.log('Error: detectTransition element not found: id = ', id)
		return;
	}  

	element.addEventListener('transitionstart', (e) => {
		if(e.propertyName === propertyName && e.srcElement.id === id) {
			onChange(true)
		}
	})

 	element.addEventListener('transitionend', (e) => { 
		if(e.propertyName === propertyName && e.srcElement.id === id) {
			onChange(false)
		}
	})
}

export function detectTransitions(id, propertyNames, onChange) {
	console.log('detectTransitions ===========================')
	console.log('propertyNames', propertyNames)
	propertyNames.forEach(propertyName => {
		console.log('propertyName', propertyName)
		addListeners(id, propertyName, onChange)
	})
}

function addListeners(id, propertyName, onChange) {
	let element = document.getElementById(id);
	let numTransitions = 0; 

	if(!element) {
		console.log('Error: detectTransition element not found: id = ', id)
		return;
	}  

	console.log('element', element)
	
	element.addEventListener('transitionstart', (e) => {
		
		if(e.propertyName === propertyName && e.srcElement.id === id) {
			console.log('==============================================')
			console.log('transitionstart', id)
			console.log(e) 
			numTransitions += 1;
			if(numTransitions === 1) onChange(true)
		}
	})

 	element.addEventListener('transitionend', (e) => {
		if(e.propertyName === propertyName && e.srcElement.id === id) {
			console.log('==============================================')
			console.log('transitionend', id)
			console.log(e) 
			numTransitions -= 1;
			if(numTransitions === 0) onChange(false)
		}
	})
}