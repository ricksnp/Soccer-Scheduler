import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import {Home} from './pages';

function App() {
	return (
		<div className="App">
			<Router>
				<Route path="*" render={()=><Home/>}/>
			</Router>

		</div>
	);
}

export default App;
