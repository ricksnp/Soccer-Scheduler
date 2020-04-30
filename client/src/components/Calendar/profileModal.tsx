import React, { Component } from "react";
import { Modal } from "antd";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import { Menu, Dropdown } from 'antd';
import SettingsIcon from "@material-ui/icons/Settings";
import TextField from '@material-ui/core/TextField';
import { getCurrentUser } from '../../utility/APIUtility'

class MyModal extends React.Component {
    state = {
        visible: false,
        newPass: "",
        confPass: "",
        user: ""
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
            newPass: e.target.value
        })
    }

    componentDidMount() {
        getCurrentUser().then((response) => {
            this.setState({ user: response })
        })
    }



    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = (e: any) => {
        console.log(e);
        if (this.state.newPass === this.state.confPass) {

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