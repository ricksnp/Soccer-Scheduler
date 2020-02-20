import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import footballLogo from '../../assets/stadium.svg';
import styled from 'styled-components';
import './index.css';



const I = styled.i`
margin-left: 0%;
`;


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
					<div class="menu-container" style={{textAlign: "center"}}>
						<ul>
							<li>
								<NavLink exact={true} activeClassName='is-active' to="/">
									<div><I className="fas fa-home"></I></div><div>Calendar</div>
								</NavLink>
							</li>
							<li>
								<NavLink exact={true} activeClassName='is-active' to="/admin">
									<I className="fas fa-user-shield"></I><div>Admin</div>
								</NavLink>
							</li>
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
