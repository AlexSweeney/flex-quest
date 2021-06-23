import React from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './styles/reset.css';
import './styles/fonts.css';
import './styles/main-body.css';

import './App.css';

function App() {
  return (
    <div className="background">
    	<Router>
    		<Header/>

	    	<section className="main-body">	    		
	    		<Switch>
	    			<Route path="/" expact component={Home}/>
	    		</Switch>
	    	</section>
	    </Router>
    </div>
  );
}

export default App;