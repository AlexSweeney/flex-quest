export default function BurgerDropDown({isOpen, options, handleOptionClick}) {
	console.log('burger drop', options);
	return (
		<div className={options && isOpen ? "burger-body full-height" : "burger-body no-height"}>
			{options && options.map(option => (
				<h3 className="burger-title" onClick={() => handleOptionClick(option)}>
					{option}
				</h3>
			))} 
		</div>
	)
}

