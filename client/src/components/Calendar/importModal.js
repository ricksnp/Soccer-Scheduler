import React from 'react';
import { Modal, Button } from 'antd';
import CSVReader1 from './importReader'

class MyModal1 extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showModal} >Choose File</Button>
                < Modal
                    title="Upload your schedule!"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Download our template first:  <a href={`${process.env.PUBLIC_URL}/template.csv`} download="">Download</a></p>
                    <CSVReader1 />
                </Modal>
            </>
        );
    }

}

export default MyModal1;

