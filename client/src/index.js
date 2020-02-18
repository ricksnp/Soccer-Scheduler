import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import './style/global/index.css';
import './style/global/scrollbar.css';
ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
