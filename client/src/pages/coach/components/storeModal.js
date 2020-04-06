import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { sendAnEmail } from '../../../common/email/email'
import { Link } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { Modal } from 'antd';
import {
    NAME_MIN_LENGTH,
    NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH
} from '../../../constants';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../../utility/APIUtility';
import { sign } from 'crypto';
import zIndex from '@material-ui/core/styles/zIndex';

const AWS = require('aws-sdk');
const AWS_SES_REGION = "us-east-1"
const AWS_SES_ACCESS_KEY_ID = "AKIA5GWYDREOZX3BXCPE"
const AWS_SES_SECRET_ACCESS_KEY = "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"

// Amazon SES configuration
const SESConfig = {
    apiVersion: '2010-12-01',
    accessKeyId: "AKIA5GWYDREOZX3BXCPE",
    secretAccessKey: "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",
    region: "us-east-1"
}

class StoreModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }



    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };


        signup(signupRequest)
            .then((response) => {
                notification.success({
                    message: 'Online Match Sim App',
                    description: "Sucessfully added a new coach!"
                });
                //this.props.history.push('/login');
                var randompass = Math.random().toString(36).slice(-8);
                let str = signupRequest.name;
                const firstb4 = str.substr(0, str.indexOf(' '));
                const firstLet = firstb4.charAt(0).toLowerCase();
                const last = str.substr(str.indexOf(' ') + 1).toLowerCase();
                const finUserName = firstLet + last + Math.floor(Math.random() * 1000) + 1;
                sendAnEmail(signupRequest.email, "Login Information:" + "<br/>" + finUserName + "<br/>" + randompass);
            })
            .catch((error) => {
                notification.error({
                    message: 'Online Match Sim App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
    }

    isFormInvalid() {
        return !(
            this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    onClose = () => {
        this.props.closeModal();
    }

    render() {
        return (
            <>
                <Modal
                    visible={this.props.showModal}
                    onCancel={this.onClose}
                    closable
                    okText="Add"

                >
                    <p className="addAssignor-title">Add Coaches</p>
                    <form onSubmit={this.handleSubmit} className="addAssignor-form">
                        <TextField id="standard-basic" label="Full Name" name="name" value={this.state.name.value} onChange={(event) => this.handleInputChange(event, this.validateName)} />
                        <TextField id="standard-basic" label="Username" name="username" value={this.state.username.value} onChange={(event) => this.handleInputChange(event, this.validateName)} />
                        <TextField id="standard-basic" label="E-mail" name="email" value={this.state.email.value} onBlur={this.validateEmailAvailability} onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
                        <TextField id="standard-basic" label="Password" name="password" type="password" value={this.state.password.value} onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="signup-form-button"
                            disabled={this.isFormInvalid()}
                            onClick={this.onClose}
                        >Add Coach</Button>
                    </form>
                </Modal>
            </>
        )
    }

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            };
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            };
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            };
        }
    };

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'
            };
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            };
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            };
        }

        return {
            validateStatus: null,
            errorMsg: null
        };
    };

    validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            };
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            };
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            };
        }
    };

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if (usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
            .then((response) => {
                if (response.available) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            errorMsg: 'This username is already taken'
                        }
                    });
                }
            })
            .catch((error) => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
            .then((response) => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: 'This Email is already registered'
                        }
                    });
                }
            })
            .catch((error) => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            });
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            };
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            };
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            };
        }
    };

}

export default StoreModal;