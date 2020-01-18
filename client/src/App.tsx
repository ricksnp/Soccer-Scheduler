import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import {Home, Scheduling} from './pages';
import {TopNav} from './components';

function App() {
	return (
		<div className="App">
			<Router>
				<TopNav/>
				<Route path="/scheduling" render={()=> <Scheduling/>}/>
				<Route exact path="/" render={()=><Home/>}/>
			</Router>
			

		</div>
	);
}

export default App;
