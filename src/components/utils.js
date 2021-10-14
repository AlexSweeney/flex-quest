// ============================== Transitions - call fn on ================================ //
 export function onTransition(id, propertyName, onStart = null, onEnd = null) {
	if(onStart) triggerOnTransitionStart(id, propertyName, onStart)
	if(onEnd) triggerOnTransitionEnd(id, propertyName, onEnd)
}

export function triggerOnTransitionStart(id, propertyName, onStart = null) {
	const element = document.getElementById(id);  
	const thisStartFn = transitionHandler.bind(null, id, propertyName, onStart, triggerOnTransitionStart);
	element.addEventListener('transitionstart', thisStartFn, {once: true})
}

export function triggerOnTransitionEnd(id, propertyName, onEnd = null) { 
	const element = document.getElementById(id);  
	const thisEndFn = transitionHandler.bind(null, id, propertyName, onEnd, triggerOnTransitionEnd); 
	element.addEventListener('transitionend', thisEndFn, {once: true})  
}

function transitionHandler(id, propertyName, passFn, failFn, e) {
	if(e.propertyName === propertyName && e.srcElement.id === id) {
		passFn && passFn()
	// if fail try again 
	} else {
		failFn(id, propertyName, passFn)
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
// move scrollbars to 0, call onFinish when complete
export function resetScrollBars(id, time, onFinish = () => {}) {
	const horizPromise = moveScrollBar(id, 'horiz', 0, time);
	const vertPromise = moveScrollBar(id, 'vert', 0, time); 

	Promise.all([horizPromise, vertPromise]).then(onFinish)
}

export function moveScrollBar(id, scrollbar, target, time) {
	if(!elementHasScrollBar(id, scrollbar)) return new Promise(resolve => resolve())

	const property = (scrollbar === 'horiz') ? 'scrollLeft' : 'scrollTop';
	const element = document.getElementById(id);
	
	const timeoutInterval = 4;
	const numSteps = time / timeoutInterval; 
	const distance = element[property] - target;

	const stepSize = distance / numSteps; 

	const count = 0;

	return new Promise(resolve => { 
		incrementScrollBar(element, property, timeoutInterval, stepSize, target, count, resolve)
	})
}

function incrementScrollBar(element, property, timeoutInterval, stepSize, target, count, resolve) {
	count += 1;
	if(element[property] === target || count === 500) return resolve();

	element[property] -= stepSize;

	setTimeout(() => {
		incrementScrollBar(element, property, timeoutInterval, stepSize, target, count, resolve)
	}, timeoutInterval) 
}

// ================ check if overflowing
function elementHasScrollBar(id, property = null) { 
	const element = getElement(id);
	const hasHoriz = element.scrollWidth > element.clientWidth;
	const hasVert = element.scrollHeight > element.clientHeight;

	if(property === 'horiz') return hasHoriz;
	if(property === 'vert') return hasVert;
	if(!property) return hasHoriz || hasVert; 
}

function elementIsOverflowing(id, property = null) {
 		const parentElement = getParentElement(id);
 		const widthIsOverflowing = parentElement.scrollWidth > parentElement.clientWidth;
 		const heightIsOverflowing = parentElement.scrollHeight > parentElement.clientHeight;
 		
 		if(property === 'width') return widthIsOverflowing;
 		if(property === 'height') return heightIsOverflowing;
		if(!property) return widthIsOverflowing || heightIsOverflowing;
 	}

// ================ get element
function getParentElement(id) {
	const parentId = document.getElementById(id).parentElement.id;
	return document.getElementById(parentId);   
}

function getElement(id) {
	return document.getElementById(id);
}









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