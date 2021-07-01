import './BurgerStyle.css';

export default function BurgerDropDown({isOpen, options, handleOptionClick}) { 
	return ( 
		<div className={isOpen ? "burger-body full-height" : "burger-body no-height"}>
			{options && options.map(option => (
				<h3 className="burger-title" onClick={() => handleOptionClick(option)}>
					{option}
				</h3>
			))} 
		</div>
	)
}

