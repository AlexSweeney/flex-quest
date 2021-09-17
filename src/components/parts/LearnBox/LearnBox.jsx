import React, {useState, useEffect} from 'react'; 
import OpenCloseBox2 from './../OpenCloseBox/OpenCloseBox2.jsx'; 
import './LearnBox.css'; 

export default function LearnBox({
	title, 
	i, 
	buttons, 
	learnBoxStatus,
	setLearnBoxStatus, 
	displayBoxResizeStatus = '',
	displayBoxRefreshClass = '',
	children}) {
	/* 
		show children
		animate children open close on open / close toggle press
	*/

	// =========================== Vars =========================== //
	const learnBoxId = 'learn-box';
	 
	// =============== state
	const [learnBoxIsOpen, setLearnBoxIsOpen] = useState(true); 

	// =============== status
	const [isLearnBoxTranstionEnd, setIsLearnBoxTranstionEnd] = useState(false);
	const [displayBoxHeightTransitioning, setDisplayBoxHeightTransitioning] = useState(false); 
	const [displayBoxStatus, setDisplayBoxStatus] = useState('display-box-open');
	
	// =============== classes
	const [displayBoxClass, setDisplayBoxClass] = useState('display-box-open');
	
	const [displayBoxOverflowClass, setDisplayBoxOverflowClass] = useState('');
	const [displayBoxHeightTransitionFinished, setDisplayBoxHeightTransitionFinished] = useState(false);

	// =========================== Element fns =========================== // 
	
	function elementWidthIsOverflowing(id) {
		const element = document.getElementById(id);
		if(!element) return;

	  return element.scrollWidth > element.clientWidth;
	}

	function elementHeightIsOverflowing(id) {
		const element = document.getElementById(id);
		if(!element) return;

	  return element.scrollHeight > element.clientHeight;
	}

	function getOverflowClass(id) {
		const heightOverflow = elementHeightIsOverflowing(id);
		const heightOverflowClass = heightOverflow ? 'display-box-height-overflow' : '';

		const widthOverflow = elementWidthIsOverflowing(id);
		const widthOverflowClass = widthOverflow ? 'display-box-width-overflow' : '';

		if(heightOverflow && widthOverflow) {
			return heightOverflowClass + ' ' + widthOverflowClass;
		}

		if(heightOverflow) return heightOverflowClass;
		if(widthOverflow) return widthOverflowClass
		return '';
	}

	// =========================== Event Handlers =========================== //
	function onOpenCloseToggleClick() {
		setLearnBoxIsOpen(oldVal => !oldVal)
	}

	function onLearnBoxClosing() {
		setDisplayBoxOverflowClass(getOverflowClass('learn-box-body'))
		setDisplayBoxClass('display-box-closing display-box-closing-x')
	}

	function onLearnBoxOpening() {
		setDisplayBoxClass('display-box-opening display-box-opening-x')
	}

	function onLearnBoxClosed() {
		setDisplayBoxClass(`display-box-closing display-box-closing-y`)
	}

	function onLearnBoxOpen() {
		setDisplayBoxClass('display-box-opening display-box-opening-y')
	}

	function onDisplayBoxOpen() {
		setDisplayBoxOverflowClass('')
		setDisplayBoxClass('display-box-open')
	}

	function onDisplayBoxClosed() {
		setDisplayBoxClass('display-box-closed')
	}
  
	// =========================== Set Status =========================== //
	// ============== Display Box
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-closed'
			&& displayBoxStatus === 'display-box-open') {
			setDisplayBoxStatus('display-box-closing')
		}

		if(learnBoxStatus === 'learn-box-open'
			&& displayBoxStatus === 'display-box-closed') {
			setDisplayBoxStatus('display-box-opening')
		}
	}, [learnBoxStatus, displayBoxStatus])

	// open close
	useEffect(() => {
		const displayBoxElement = document.getElementById('display-box')

		displayBoxElement.addEventListener('transitionstart', (e) => {
			if(e.propertyName === 'height' && e.srcElement.id === 'display-box') { 
				setDisplayBoxHeightTransitionFinished(false)
			}
		})

		displayBoxElement.addEventListener('transitionend', (e) => {
			if(e.propertyName === 'height' && e.srcElement.id === 'display-box') { 
				setDisplayBoxHeightTransitionFinished(true)
			}
		})
	})

	useEffect(() => {
		if(displayBoxHeightTransitionFinished) {
			if(displayBoxStatus === 'display-box-closing') {
				setDisplayBoxStatus('display-box-closed')
			}

			if(displayBoxStatus === 'display-box-opening') {
				setDisplayBoxStatus('display-box-open')
			}

			setDisplayBoxHeightTransitionFinished(false)
		}
	}, [displayBoxHeightTransitionFinished, displayBoxStatus])

	// =========================== Trigger Handler Fns =========================== //
	// ============== Learn Box
	useEffect(() => {
		if(learnBoxStatus === 'learn-box-open') onLearnBoxOpen()
		if(learnBoxStatus === 'learn-box-opening') onLearnBoxOpening()
		if(learnBoxStatus === 'learn-box-closed') onLearnBoxClosed()
		if(learnBoxStatus === 'learn-box-closing') onLearnBoxClosing()
	}, [learnBoxStatus])

	// ============== Display Box
	useEffect(() => {
		if(displayBoxStatus === 'display-box-open') onDisplayBoxOpen()
		if(displayBoxStatus === 'display-box-closed') onDisplayBoxClosed()
	}, [displayBoxStatus])

  // =========================== output =========================== //
	return (
		<OpenCloseBox2 
			title={title} 
			boxIsOpen={learnBoxIsOpen}
			handleOpenCloseToggleClick={onOpenCloseToggleClick}
			buttons={buttons}
			learnBoxStatus={learnBoxStatus}
			setLearnBoxStatus={setLearnBoxStatus}
			resizeStatus={displayBoxResizeStatus}
		>	
			<div className={`display-box 
				${displayBoxClass} 
				${displayBoxOverflowClass}
				${displayBoxRefreshClass}`} id="display-box">
	 
			</div>
		</OpenCloseBox2>
	)
}	 