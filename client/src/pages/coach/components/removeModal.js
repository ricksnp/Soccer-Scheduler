import React from 'react';
import { Modal } from 'antd';

class RemoveModal extends React.Component {
    constructor(props) {
        super(props);
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
                    okText="Delete"
                >
                    <p className="addAssignor-title">Are you sure want to remove this user?</p>
                </Modal>
            </>
        )
    }
}

export default RemoveModal;