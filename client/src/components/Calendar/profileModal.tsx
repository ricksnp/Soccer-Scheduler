import React, { Component } from "react";
import { Modal, notification } from "antd";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import { Menu, Dropdown } from 'antd';
import SettingsIcon from "@material-ui/icons/Settings";
import TextField from '@material-ui/core/TextField';
import { getCurrentUser, resetPassword, getAllUsers } from '../../utility/APIUtility'



class MyModal extends React.Component {
    state = {
        visible: false,
        newPass: "",
        confPass: "",
        user: { id: "", name: "", password: "", username: "", email: "", district: "", schoolname: "", role: "" }
    };

    menu = () => {
        return (<Menu>
            <Menu.Item onClick={this.showModal}>
                Change Password
            </Menu.Item></Menu>)
    }

    handleNewChange = (e: any) => {
        this.setState({
            newPass: e.target.value
        })
    }

    handleConfChange = (e: any) => {
        this.setState({
            confPass: e.target.value
        })
    }

    componentDidMount() {

        getCurrentUser().then((response) => {
            this.setState({ user: response })
            console.log("-=-=-==" + JSON.stringify(response))
        })


    }



    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = (e: any) => {
        console.log(this.state.user);
        if (this.state.newPass === this.state.confPass) {
            let update = {
                id: this.state.user.id,
                password: this.state.newPass,
                name: this.state.user.name,
                username: this.state.user.username,
                email: this.state.user.email,
                district: this.state.user.district,
                schoolname: this.state.user.schoolname
            }
            console.log(JSON.stringify(update))
            resetPassword(update).then((response) => {
                notification.success({
                    message: "User's password Successfully reset",
                    description: response.message
                })
            })
                .catch((error) => {
                    notification.error({
                        message: "User's password was not reset",
                        description: error.message
                    })
                })
        }
        this.setState({
            visible: false
        });
    };

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };



    render() {
        return (
            <>
                <Dropdown overlay={this.menu} placement="bottomLeft">
                    <Button variant="contained" color="default" startIcon={<SettingsIcon />} style={{ display: "flex", marginLeft: "auto" }}>Profile</Button>
                </Dropdown>
                <Modal
                    title="Change Password"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <TextField id="standard-basic" label="New Password" name="newpass" value={this.state.newPass} onChange={this.handleNewChange} /><br /><br />
                    <TextField id="standard-basic" label="Confirm Password" name="confpass" value={this.state.confPass} onChange={this.handleConfChange} />
                </Modal>
            </>
        );
    }
}

export default MyModal;