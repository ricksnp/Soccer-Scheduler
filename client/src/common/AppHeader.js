import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import footballLogo from '../assets/stadium.svg';

import './AppHeader.css';

const Header = Layout.Header;

class AppHeader extends Component {
	constructor(props) {
		super(props);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	handleMenuClick({ key }) {
		if (key === 'logout') {
			this.props.onLogout();
		}
	}

	render() {
		let menuItems;
		if (this.props.currentUser) {
			menuItems = [
				<Menu.Item key="/">
					<Link to="/">
						<Icon type="home" className="nav-icon" />
					</Link>
				</Menu.Item>,
				<Menu.Item key="/profile" className="profile-menu">
					<ProfileDropdownMenu currentUser={this.props.currentUser} handleMenuClick={this.handleMenuClick} />
				</Menu.Item>
			];
		} else {
			menuItems = [
				<Menu.Item key="/login">
					<Link to="/login">Login</Link>
				</Menu.Item>,
				<Menu.Item key="/signup">
					<Link to="/signup">Signup</Link>
				</Menu.Item>
			];
		}

		return (
			<nav class="sidebar-nav">
				<div class="logo-area">
					<img src={footballLogo} alt="Logo" />
				</div>
				<div class="menu-container">
					<ul>
						<li><Link to="/"><i className="fas fa-home"></i></Link></li>
						<li><Link to="/admin"><i className="fas fa-user-shield"></i></Link></li>
						<li><i class="fas fa-calendar-check"></i></li>
					</ul>
					<ul class="logout-ul">
						<li onClick={this.actionLogout}><i class="fas fa-sign-out-alt"></i></li>
					</ul>
				</div>
				<Menu
					className="app-menu"
					mode="horizontal"
					selectedKeys={[
						this.props.location.pathname
					]}
					style={{ lineHeight: '64px' }}
				>
					{menuItems}
				</Menu>
			</nav>
		);
	}
}

function ProfileDropdownMenu(props) {
	const dropdownMenu = (
		<Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
			<Menu.Item key="user-info" className="dropdown-item" disabled>
				<div className="user-full-name-info">{props.currentUser.name}</div>
				<div className="username-info">@{props.currentUser.username}</div>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="profile" className="dropdown-item">
				<Link to={`/users/${props.currentUser.username}`}>Profile</Link>
			</Menu.Item>
			<Menu.Item key="logout" className="dropdown-item">
				Logout
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown
			overlay={dropdownMenu}
			trigger={[
				'click'
			]}
			getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}
		>
			<a className="ant-dropdown-link">
				<Icon type="user" className="nav-icon" style={{ marginRight: 0 }} /> <Icon type="down" />
			</a>
		</Dropdown>
	);
}

export default withRouter(AppHeader);
