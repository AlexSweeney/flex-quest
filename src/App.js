// animate router
// animate open and close play
// click min window = close burger
// add level selector on burger click 
// animate changes  
// play -> if all deselected = change spacing so all move to left

// Introduction - why is flex box useful => static vs flexible

// Learn

// Read

// Write

// Use

// Support

// settings

import React from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Learn from './components/Learn.jsx';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
import './styles/reset.css';
import './styles/fonts.css'; 
import './App.css';

function App() {
  return (
    <div className="app-container">
    	<Router>
    		<Header/>
        		<Switch>
                    <Route path={["/", "/flex-quest/"]} exact component={Home}/>
        			<Route path="/learn" component={Learn}/>
        		</Switch>
	    </Router>
    </div>
  );
}

export default App;