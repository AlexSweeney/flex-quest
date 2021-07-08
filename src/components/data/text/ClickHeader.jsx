import './ClickHeaderStyle.css';

export default function ClickHeader({newStyle, styleString, setStyleString, handleClick, children}) { 
	return <h2 className={newStyle === styleString ? "info-header selected" : "info-header"}
						onClick={() => { handleClick(newStyle, styleString, setStyleString); }}>{children}</h2>
}