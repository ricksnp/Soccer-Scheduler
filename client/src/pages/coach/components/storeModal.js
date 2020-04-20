import React, { useState, Component } from 'react';
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
import { signup, checkUsernameAvailability, checkEmailAvailability, AssignorSignup } from '../../../utility/APIUtility';
import { sign } from 'crypto';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { schoolNames } from './autofill';

let emailContents = (username, password) => {
    return "<h2>Your Login Information:</h2>" +
        "<h3>Username:  </h3>" + username + "<br/>" +
        "<h3>Password:  </h3>" + password;
}


class StoreModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: {
                value: ''
            },
            lastname: {
                value: ''
            },
            username: {
                value: ''
            },
            schoolname: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.onSchoolNameChange = this.onSchoolNameChange.bind(this);
    }

    onSchoolNameChange = (event, values) => {
        this.setState({
            schoolname: { value: values.schoolname }
        }, () => {
            // This will output an array of objects
            // given by Autocompelte options property.
            console.log(this.state.schoolname);
            console.log(event);
        });
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
    handleNewChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
            }
        });
    }


    handleSubmit(event) {
        //event.preventDefault();

        let str = this.state.firstname.value + " " + this.state.lastname.value;
        const firstb4 = str.substr(0, str.indexOf(' '));
        const firstLet = firstb4.charAt(0).toLowerCase();
        const last = str.substr(str.indexOf(' ') + 1).toLowerCase();
        const finUserName = firstLet + last + Math.floor(Math.random() * 1000) + 1;

        const signupRequest = {
            name: this.state.firstname.value + " " + this.state.lastname.value,
            email: this.state.email.value,
            username: finUserName,
            schoolname: this.state.schoolname.value,
            district: this.props.userDistrict,
            password: 'Password1'
        };
        console.log(JSON.stringify(signupRequest));


        AssignorSignup(signupRequest)
            .then((response) => {
                notification.success({
                    message: 'Online Match Sim App',
                    description: "Sucessfully added a new coach!"
                });
                sendAnEmail(signupRequest.email, emailContents(signupRequest.username, signupRequest.password));
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
            // this.state.name.validateStatus === 'success' &&
            // this.state.username.validateStatus === 'success' &&
            // this.state.email.validateStatus === 'success' &&
            // this.state.password.validateStatus === 'success'
            false
        );
    }

    onClose = () => {
        this.props.closeModal();
    }

    closeMethod = () => {
        this.handleSubmit();
        this.onClose();
    }

    render() {
        return (
            <>
                <Modal
                    visible={this.props.showModal}
                    onCancel={this.onClose}
                    closable
                    okText="Add"
                    onOk={this.closeMethod}


                >
                    <p className="addAssignor-title">Add Coaches</p>
                    <form onSubmit={this.handleSubmit} className="addAssignor-form">
                        <TextField id="standard-basic" label="First name" name="firstname" value={this.state.firstname.value} onChange={(event) => this.handleNewChange(event)} />
                        <TextField id="standard-basic" label="Last name" name="lastname" value={this.state.lastname.value} onChange={(event) => this.handleNewChange(event)} />
                        <TextField id="standard-basic" label="E-mail" name="email" value={this.state.email.value} onBlur={this.validateEmailAvailability} onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
                        <Autocomplete
                            options={schoolNames}
                            onChange={this.onSchoolNameChange}
                            freeSolo
                            getOptionLabel={(option) => option.schoolname}
                            style={{ width: 250 }}
                            renderInput={(params) => <TextField id="standard-basic" label="School name" name="schoolname" onChange={(event) => this.handleNewChange(event)}  {...params} />}
                        />

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