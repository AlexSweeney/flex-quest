export function mapNumber(num, fn) {
	return (
		[...Array(num - 1).keys()].map((i) => {
			return fn(i)
		})
	) 
}

// ============================== Transitions - call fn on ================================ //
export function triggerOnTransitionStart(id: string, propertyName: string, onStart: Function) {
	const element = document.getElementById(id);  
	if(!element) throw new Error(`triggerOnTransitionStart() element not found for id: '${id}'`)
	
	element.addEventListener('transitionstart', (event) => {  
		const isBubbling = event.eventPhase === 3;
		const isSameProperty = event.propertyName === propertyName; 

		if(isSameProperty && !isBubbling) onStart()
	}) 
}

export function triggerOnTransitionEnd(id: string, propertyName: string, onEnd: Function, cancel:boolean = false) { 
	const element = document.getElementById(id);  
	if(!element) throw new Error(`triggerOnTransitionEnd() element not found for id: '${id}'`)
 
	element.addEventListener('transitionend', (event) => {  
		const isBubbling = event.eventPhase === 3;
		const isSameProperty = event.propertyName === propertyName; 

		if(isSameProperty && !isBubbling && !cancel) onEnd() 
	})
}

export function triggerOnFirstTransitionEnd(ids: string[], propertyName: string, onEnd: Function) {	
	let firstTriggered = false;

	function onEndWrapperFn() { 
		if(!firstTriggered) onEnd()
		firstTriggered = true; 
	}
	
	ids.forEach(id => { 
		triggerOnTransitionEnd(id, propertyName, onEndWrapperFn, firstTriggered)	
	})
}
  
// export function transitionendPromise(id, propertyName) {
// 	return new Promise(resolve => {
// 		triggerOnTransitionEnd(id, propertyName, resolve)
// 	})
// }

// ================ Scrollbar
// move scrollbars to 0, call onFinish when complete
export function resetScrollBars(id, time = 200) { 
	const horizPromise = moveScrollBar(id, 'horiz', 0, time);
	const vertPromise = moveScrollBar(id, 'vert', 0, time); 

	return Promise.all([horizPromise, vertPromise])
}

export function moveScrollBars(id, targetObject, time) {
	const horizPromise = moveScrollBar(id, 'horiz', targetObject.scrollLeft, time)
	const vertPromise = moveScrollBar(id, 'vert', targetObject.scrollTop, time)

	return Promise.all([horizPromise, vertPromise])
}

export function moveScrollBar(id, scrollbar, target, time) {
	const property = (scrollbar === 'horiz') ? 'scrollLeft' : 'scrollTop';
	const element = document.getElementById(id);

	const timeoutInterval = 4;
	const numSteps = time / timeoutInterval; 

	const position = element[property];
	const distance = target - position;
	const stepSize = distance / numSteps; 

	if(distance === 0 || !elementHasScrollBar(id)) return new Promise(resolve => resolve())

	return new Promise(resolve => { 
		incrementScrollBar(element, property, timeoutInterval, stepSize, target, resolve)
	})
}
 
function incrementScrollBar(element, property, timeoutInterval, stepSize, target, resolve) {
	if(stepSize > 0 && element[property] >= target) return resolve()
	if(stepSize < 0 && element[property] <= target) return resolve()

	element[property] += stepSize;

	setTimeout(() => {
		incrementScrollBar(element, property, timeoutInterval, stepSize, target, resolve)
	}, timeoutInterval) 
}

export function getScrollPositions(id: string) {
	const element = document.getElementById(id);
 	
 	return {
 		scrollLeft: element.scrollLeft,
 		scrollTop: element.scrollTop,
 	} 
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

export function elementIsOverflowing(id, property = null) { 
	const parentElement = getParentElement(id);
	
	const widthIsOverflowing = parentElement.scrollWidth > parentElement.clientWidth;
	const heightIsOverflowing = parentElement.scrollHeight > parentElement.clientHeight;

	if(property === 'width') return widthIsOverflowing;
	if(property === 'height') return heightIsOverflowing;
	if(!property) return widthIsOverflowing || heightIsOverflowing;
}

function elementIsSmallerOrEqualThanParent(id) {
	const parentId = getParentId(id);

	const elementWidth = getElementWidth(id);
	const elementHeight = getElementHeight(id);

	const parentWidth = getElementWidth(parentId);
	const parentHeight = getElementHeight(parentId);
	console.log('elementWidth', elementWidth)
	console.log('parentWidth', parentWidth)

	return ( elementWidth < parentWidth && elementHeight < parentHeight 
				|| elementIsSameSizeAsParent(id));
}

function elementIsSameSizeAsParent(id) {
	const parentId = getParentId(id);

	const elementWidth = getElementWidth(id);
	const elementHeight = getElementHeight(id);

	const parentWidth = getElementWidth(parentId);
	const parentHeight = getElementHeight(parentId);

	return elementWidth === parentWidth && elementHeight === parentHeight;
}

function elementIsBiggerThanParent(id) {
	const parentId = getParentId(id);

	const elementWidth = getElementWidth(id);
	const elementHeight = getElementHeight(id);

	const parentWidth = getElementWidth(parentId);
	const parentHeight = getElementHeight(parentId);

	return elementWidth > parentWidth || elementHeight > parentHeight;
}

// ================ change element size
export function setToContainerSize(id) {  
	const containerId = getOverflowContainerId(id);
	setSizeInPx(id)
	setToElementSize(id, containerId) 
}

function elementShowsOverflow(id) { 
	const element = getElement(id);
	const style = window.getComputedStyle(element);
	const overflowStyle = style.overflow; 
	return overflowStyle === 'auto' || overflowStyle === 'scroll';
}
 

function getOverflowContainerId(id) {  
	const isOverflowContainer = elementShowsOverflow(id);
	const parentId = getParentId(id);

	if(isOverflowContainer) return id;
	if(!isOverflowContainer) return getOverflowContainerId(parentId) 
} 
  
export function shrinkElementOverflow(id, onFinish = () => {}) {
	const widthPromise = shrinkOverflow(id, 'width');
	const heightPromise = shrinkOverflow(id, 'height');

	return Promise.all([widthPromise, heightPromise]).then(onFinish);
}

function shrinkOverflow(id, property) {
	return new Promise(resolve => { 
		if(!elementIsOverflowing(id, property))  return resolve()

		triggerOnTransitionEnd(id, property, resolve)
 		setSizeInPx(id, property)
 		setToParentSize(id, property)
	})
}
 

export function setSizeInPx(id, property) { 
	const element = getElement(id); 

	if(property === 'width') {
		element.style.width = element.clientWidth + 'px';
	}
	
	if(property === 'height') {
		element.style.height = element.clientHeight + 'px';
	}
}

export function setToParentSize(id, property) {
	const element = document.getElementById(id);
	const parentElement = getParentElement(id); 
	const parentStyle = window.getComputedStyle(parentElement);

	if(!property) {
		const newWidth = parentStyle.width;
		const newHeight = parentStyle.height;

		element.style.width = newWidth;
		element.style.height = newHeight;
	}

	if(property) {
		element.style[property] = parentStyle[property];
	} 
}

export function removeInlineSize(id) {
	const element = document.getElementById(id);
	element.style.width = '';
	element.style.height = '';
}

export function getElementHeight(id) {
	const element = document.getElementById(id);
	return window.getComputedStyle(element).height;
}

export function getElementWidth(id) {
	const element = document.getElementById(id);
	return window.getComputedStyle(element).width;
}

export function setElementHeight(id, height) { 
	const element = document.getElementById(id);
	element.style.height = height;
}

export function setElementWidth(id, width) { 
	const element = document.getElementById(id);
	element.style.width = width;
}

// ================ get element
export function getParentElement(id) {
	const parentId =  getParentId(id);
	return document.getElementById(parentId);   
}

function getParentId(id) {
	return document.getElementById(id).parentElement.id;
}

function getElement(id) {
	return document.getElementById(id);
}

// ================ query element
export function elementHasInlineSize(id) {
	const element = document.getElementById(id); 

	return !(element.style.width === '' && element.style.height === '');
}

export function setToElementSize(idOne, idTwo) {
	const elementOne = document.getElementById(idOne);
	const elementTwo = document.getElementById(idTwo);  

	const elementTwoStyle = window.getComputedStyle(elementTwo);  
	const newWidth = elementTwoStyle.width;
	const newHeight = elementTwoStyle.height;

	elementOne.style.width = newWidth;
	elementOne.style.height = newHeight;
}
/*

export function elementWidthIsOverflowing(id) {
	const element = document.getElementById(id);
	return element.scrollWidth > element.clientWidth;
}

export function elementHeightIsOverflowing(id) {
	const element = document.getElementById(id);
	return element.scrollHeight > element.clientHeight;
}



export function removeInlineSize(id) { 
	const element = document.getElementById(id);  
	element.style.width = '';
	element.style.height = ''; 
}

*/

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