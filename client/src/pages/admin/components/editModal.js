import React from 'react';
import { Modal } from 'antd';

class EditModal extends React.Component {

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
                    okText="Save"
                >
                    <p className="addAssignor-title">Edit Assignor</p>
                    <form className="addAssignor-form">
                        {/* <TextField id="standard-basic" label="Name" />
                        <TextField id="standard-basic" label="E-Mail" />
                        <TextField id="standard-basic" label="District" />
                        <TextField id="standard-basic" label="School" /> */}
                    </form>
                </Modal>
            </>
        )
    }
}

export default EditModal;