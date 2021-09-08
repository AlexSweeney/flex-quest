export function detectTransitions(id, propertyName, onChange) {
	let numTransitions = 0;
	let isTransitioning = false;

	let element = document.getElementById(id);

	element.addEventListener('transitionstart', (e) => {
		if(e.propertyName === propertyName) {
			numTransitions += 1;
			if(numTransitions === 1) onChange(true)
		}
	})

 	element.addEventListener('transitionend', (e) => {
		if(e.propertyName === propertyName) {
			numTransitions -= 1;
			if(numTransitions === 0) onChange(false)
		}
	})
}