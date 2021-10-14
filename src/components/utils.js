// ============================== Transitions - call fn on ================================ //
 export function onTransition(id, propertyName, onStart = null, onEnd = null) {
	if(onStart) triggerOnTransitionStart(id, propertyName, onStart)
	if(onEnd) triggerOnTransitionEnd(id, propertyName, onEnd)
}

export function triggerOnTransitionStart(id, propertyName, onStart = null) {
	const element = document.getElementById(id);  
	const thisStartFn = transitionHandler.bind(null, id, propertyName, onStart);
	element.addEventListener('transitionstart', thisStartFn, {once: true})
}

export function triggerOnTransitionEnd(id, propertyName, onEnd = null) { 
	const element = document.getElementById(id);  
	const thisEndFn = transitionHandler.bind(null, id, propertyName, onEnd); 
	element.addEventListener('transitionend', thisEndFn, {once: true})  
}

function transitionHandler(id, propertyName, fn, e) {
	if(e.propertyName === propertyName && e.srcElement.id === id) {
		fn && fn()
	// if fail try again 
	} else {
		transitionHandler(id, propertyName, fn)
	} 
}

/* export function onTransition(id, propertyName, onStart = null, onEnd = null) {
	const element = document.getElementById(id); 

	const thisStartFn = transitionStartHandler.bind(null, id, propertyName, onStart);
	const thisEndFn = transitionEndHandler.bind(null, id, propertyName, onEnd);

	element.addEventListener('transitionstart', thisStartFn, {once: true})
	element.addEventListener('transitionend', thisEndFn, {once: true})
}
*/

/*function transitionStartHandler(id, propertyName, onStart, e) { 
	// if pass call function 
	if(e.propertyName === propertyName && e.srcElement.id === id) {
		onStart && onStart()
	// if fail try again 
	} else {
		triggerOnTransitionStart(id, propertyName, onStart)
	}
}

function transitionEndHandler(id, propertyName, onEnd, e) {  
	// if pass call function 
	if(e.propertyName === propertyName && e.srcElement.id === id) {   
		onEnd && onEnd()   
	// if fail try again 
	} else {
		triggerOnTransitionEnd(id, propertyName, onEnd)
	}
}
*/
// ================ Scrollbar



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

export function setToElementSize(idOne, idTwo) {
	const elementOne = document.getElementById(idOne);
	const elementTwo = document.getElementById(idTwo);  

	const elementTwoStyle = window.getComputedStyle(elementTwo);  

	elementOne.style.width = elementTwoStyle.width;
	elementOne.style.height = elementTwoStyle.height;
}

/*export function setToCurrentSize(id) {
	const element = document.getElementById(id);
	element.style.width = getElementWidth(element);
	element.style.height = getElementHeight(element);
}

export function setToParentSize(id) {
	const element = document.getElementById(id)
	const parentElement = element.parentNode; 

	element.style.width =	getElementWidth(parentElement);
	element.style.height = getElementHeight(parentElement);
}*/

/* ------------ */

// export function detectTransition(id, propertyName, onChange) {
// 	let element = document.getElementById(id);
// 	if(!element) {
// 		console.log('Error: detectTransition element not found: id = ', id)
// 		return;
// 	}  

// 	element.addEventListener('transitionstart', (e) => {
// 		if(e.propertyName === propertyName && e.srcElement.id === id) {
// 			onChange(true)
// 		}
// 	})

//  	element.addEventListener('transitionend', (e) => { 
// 		if(e.propertyName === propertyName && e.srcElement.id === id) {
// 			onChange(false)
// 		}
// 	})
// }

// export function detectTransitions(id, propertyNames, onChange) {
// 	// console.log('detectTransitions ===========================')
// 	// console.log('propertyNames', propertyNames)
// 	propertyNames.forEach(propertyName => {
// 		// console.log('propertyName', propertyName)
// 		addListeners(id, propertyName, onChange)
// 	})
// }

// function addListeners(id, propertyName, onChange) {
// 	let element = document.getElementById(id);
// 	let numTransitions = 0; 

// 	if(!element) {
// 		console.log('Error: detectTransition element not found: id = ', id)
// 		return;
// 	}   
	
// 	element.addEventListener('transitionstart', (e) => {
		
// 		if(e.propertyName === propertyName && e.srcElement.id === id) { 
// 			numTransitions += 1;
// 			if(numTransitions === 1) onChange(true)
// 		}
// 	})

//  	element.addEventListener('transitionend', (e) => {
// 		if(e.propertyName === propertyName && e.srcElement.id === id) { 
// 			// console.log(e) 
// 			numTransitions -= 1;
// 			if(numTransitions === 0) onChange(false)
// 		}
// 	})
// }