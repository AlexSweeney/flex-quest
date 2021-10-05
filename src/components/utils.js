// ================ trigger fn on transition start and end, one time
export function onTransition(id, propertyName, onStart = null, onEnd = null) {
	const element = document.getElementById(id); 

	const thisStartFn = transitionStartHandler.bind(null, id, propertyName, onStart);
	const thisEndFn = transitionEndHandler.bind(null, element, id, propertyName, onStart, onEnd);

	element.addEventListener('transitionstart', thisStartFn, {once: true})
	element.addEventListener('transitionend', thisEndFn, {once: true})
}

function transitionStartHandler(id, propertyName, onStart, e) { 
	if(e.propertyName === propertyName && e.srcElement.id === id) {
		onStart && onStart()
	}
}

function transitionEndHandler(element, id, propertyName, onStart, onEnd, e) {
	if(e.propertyName === propertyName && e.srcElement.id === id) { 
		onEnd && onEnd() 
	}
}

// ================ check if overflowing
export function elementWidthIsOverflowing(id) {
	const element = document.getElementById(id);
	return element.scrollWidth > element.clientWidth;
}

export function elementHeightIsOverflowing(id) {
	const element = document.getElementById(id);
	return element.scrollHeight > element.clientHeight;
}

export function elementHasInlineSize(id) {
	const element = document.getElementById(id); 

	return !(element.style.width === '' && element.style.height === '');
}

export function removeInlineSize(id) { 
	const element = document.getElementById(id);  
	element.style.width = '';
	element.style.height = ''; 
}

export function setToCurrentSize(id) {
	const element = document.getElementById(id);
	element.style.width = getElementWidth(element);
	element.style.height = getElementHeight(element);
}

export function setToParentSize(id) {
	const element = document.getElementById(id)
	const parentElement = element.parentNode; 

	element.style.width =	getElementWidth(parentElement);
	element.style.height = getElementHeight(parentElement);
}

/* ------------ */

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
	// console.log('detectTransitions ===========================')
	// console.log('propertyNames', propertyNames)
	propertyNames.forEach(propertyName => {
		// console.log('propertyName', propertyName)
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
	
	element.addEventListener('transitionstart', (e) => {
		
		if(e.propertyName === propertyName && e.srcElement.id === id) { 
			numTransitions += 1;
			if(numTransitions === 1) onChange(true)
		}
	})

 	element.addEventListener('transitionend', (e) => {
		if(e.propertyName === propertyName && e.srcElement.id === id) { 
			// console.log(e) 
			numTransitions -= 1;
			if(numTransitions === 0) onChange(false)
		}
	})
}