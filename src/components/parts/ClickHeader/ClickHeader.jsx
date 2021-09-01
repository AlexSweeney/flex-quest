import './ClickHeaderStyle.css';

export default function ClickHeader({newStyle, styleString, setStyleString, handleClick, passedClass = '', children}) { 
	return <h2 className={(newStyle === styleString ? `info-header selected ${passedClass}`: `info-header ${passedClass}`)}
						onClick={() => { handleClick(newStyle, styleString, setStyleString); }}>{children}</h2>
}