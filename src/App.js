// animate router
// animate open and close play
// add level selector on burger click 
// animate changes  
// play -> if all deselected = change spacing so all move to left

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

          <CSSTransition
          
            className="app-body"
          >
        		<Switch>
        			<Route path="/" exact component={Home}/>
        			<Route path="/learn" component={Learn}/>
        		</Switch>
          </CSSTransition>
	    </Router>
    </div>
  );
}

export default App;