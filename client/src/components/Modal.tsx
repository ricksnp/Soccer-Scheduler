import React, { Component } from "react";
import { Modal, Button } from "antd";
import ReactDOM from "react-dom";

class MyModal extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = (e: any) => {
        console.log(e);
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
                <Button type="primary" onClick={this.showModal}>
                    Click For Game Options
                </Button>
                <Modal
                    title="Game Options"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Schedule Game</p>
                    <p>Remove Game</p>
                    <p>View All Games</p>
                </Modal>
            </>
        );
    }
}

export default MyModal;