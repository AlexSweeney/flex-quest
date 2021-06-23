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
    <div class="background">
    	<Header/>

    	<section class="main-body">
    		<Router>
    		<Switch>
    			<Route path="/" expact component={Home}/>
    		</Switch>
    		</Router>
    	</section>
    </div>
  );
}

export default App;