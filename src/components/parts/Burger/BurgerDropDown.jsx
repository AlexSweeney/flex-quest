import './BurgerStyle.css';

export default function BurgerDropDown({isOpen, options, handleOptionClick}) { 
	return ( 
		<div className={isOpen ? "burger-body burger-body-open" : "burger-body burger-body-closed"}>
			{options && options.map(option => (
				<h3 className="burger-title" 
					onClick={() => handleOptionClick(option)}>
					{option}
				</h3>
			))} 
		</div>
	)
}

