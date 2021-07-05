import OpenCloseBox from './parts/OpenCloseBox/OpenCloseBox.jsx';

export default function InfoBox({levelNum, setLevelNum}) {
	const menuOptions = [
		'Level 1: display: flex',
		'Level 2: flex-direction',
		'Level 3: justify-content',
		'Level 4: flex-wrap',
		'Level 5: flex-flow',
		'Level 6: align-items',
		'Level 7: align-content',
		'Level 8: order',
		'Level 9: flex-grow',
		'Level 10: flex-shrink',
		'Level 11: flex-basis',
		'Level 12: flex',
		'Level 13: align-self',  
	]; 

	const menuText = [
		'text 1',
		'text 2',
		'text 3',
		'text 4',
		'text 5',
		'text 6',
		'text 7',
		'text 8',
		'text 9',
		'text 10',
		'text 11',
		'text 12',
		'text 13',
	];

	const title = menuOptions[levelNum];
	const text = menuText[levelNum];

	function handleMenuOptionClick(option) {
		setLevelNum(menuOptions.indexOf(option));
	}

	return (
		<OpenCloseBox title={title} text={text} menuOptions={menuOptions} handleMenuOptionClick={handleMenuOptionClick}/>
	)
}