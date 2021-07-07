import './ClickHeaderStyle.css';

export default function ClickHeader({newStyle, styleString, handleClick, children}) { 
	return <h2 className={newStyle === styleString ? "info-header selected" : "info-header"}
						onClick={() => { handleClick(newStyle); }}>{children}</h2>
}