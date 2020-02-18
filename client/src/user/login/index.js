import React, { Component } from 'react';
import { Form, Input, Button, Icon, notification } from 'antd';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import { login } from '../../utility/APIUtility';
import { ACCESS_TOKEN } from '../../constants';
import footballLogo from '../../assets/stadium.svg';

import './index.css';
const FormItem = Form.Item;

class Login extends Component {
	render() {
		const AntWrappedLoginForm = Form.create()(LoginForm);

		return (
			<div className="login-container center-component">
				<div className="auth-component">
					<img src={footballLogo} alt="logo" />
					<div className="login-content">
						<AntWrappedLoginForm onLogin={this.props.onLogin} />
					</div>
				</div>
			</div >
		);
	}
}

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const loginRequest = Object.assign({}, values);
				login(loginRequest)
					.then((response) => {
						localStorage.setItem(ACCESS_TOKEN, response.accessToken);
						this.props.onLogin();
					})
					.catch((error) => {
						if (error.status === 401) {
							notification.error({
								message: 'Online Match Sim App',
								description: 'Your Username or Password is incorrect. Please try again!'
							});
						} else {
							notification.error({
								message: 'Online Match Sim App',
								description: error.message || 'Sorry! Something went wrong. Please try again!'
							});
						}
					});
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					{getFieldDecorator('usernameOrEmail', {
						rules: [
							{ required: true, message: 'Please input your username or email!' }
						]
					})(
						<TextField
							label="Username"
							className="auth-inputs"
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [
							{ required: true, message: 'Please input your Password!' }
						]
					})(
						<TextField
							type="password"
							className="auth-inputs"
							label="Password"
						/>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
					<p class="option-auth">Or <Link to="/signup">register now!</Link></p>
				</FormItem>
			</Form>
		);
	}
}

export default Login;
