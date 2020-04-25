import React from 'react';
import { Modal, Button } from 'antd';
import CSVReader1 from './importReader'

class MyModal1 extends React.Component {
    constructor(props) { super(props) }
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

        const role = this.props.role
        const userHome = this.props.userHome
        return (
            <>
                <Button type="primary" onClick={this.showModal} >Bulk Add</Button>
                < Modal
                    title="Upload your schedule!"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Download our template first:  <a href={`${process.env.PUBLIC_URL}/gametemp.xlsx`} download="">Download</a></p>
                    <CSVReader1 role={role} userHome={userHome} />
                </Modal>
            </>
        );
    }

}

export default MyModal1;

