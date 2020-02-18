import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import footballLogo from '../../assets/stadium.svg';

import './index.css';

const Header = Layout.Header;

class AppHeader extends Component {
	constructor(props) {
		super(props);
	}


	actionLogout = () => {
		this.props.onLogout();
	}

	render() {
		return (
			<>
				<nav class="sidebar-nav">
					<div class="logo-area">
						<img src={footballLogo} alt="Logo" />
					</div>
					<div class="menu-container">
						<ul>
							<li><NavLink exact={true} activeClassName='is-active' to="/"><i className="fas fa-home"></i></NavLink></li>
							<li><NavLink exact={true} activeClassName='is-active' to="/admin"><i className="fas fa-user-shield"></i></NavLink></li>
							<li><i class="fas fa-calendar-check"></i></li>
						</ul>
						<ul class="logout-ul">
							<li onClick={this.actionLogout}><i class="fas fa-sign-out-alt"></i></li>
						</ul>
					</div>
				</nav>
			</>
		)
	}
}

export default withRouter(AppHeader);
