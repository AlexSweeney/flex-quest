import React from 'react';
import Header from './components/Header.jsx';
import Home from './pages/Home/Home.jsx';
import Learn from './components/Learn.jsx';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
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