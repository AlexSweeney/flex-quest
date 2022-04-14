import './HomeStyle.scss';

export default function Home() { 
	return (
		<div class="home-wrapper">
			<div class="home-box home-box--text">
				<h2 className="home-box__heading">Learn Flex Box</h2>
				<p className="home-box__text">Understand how flex box works with our tutorials.</p>
				<p className="home-box__text">Memorize what you have learnt with our interactive game.</p>
	    </div>
	    <div class="home-box home-box--preview">
	    </div> 
		</div>
	)
}