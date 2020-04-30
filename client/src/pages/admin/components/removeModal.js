import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {deleteUser} from '../../../utility/APIUtility'
import { Modal, notification } from 'antd';

class RemoveModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onClose = () => {
        this.props.closeModal();
    }

    onDelete= () =>{

        deleteUser(this.props.user.id)
            .then((response)=>{
                notification.success({
                message: "User Successfully deleted"
            })
        })
        .catch((error)=>{
            notification.error({
                message: "User could not be deleted",
                description: error.message
            })
        })
        this.props.closeModal();
    }

    render() {
        return (
            <>
                <Modal
                    visible={this.props.showModal}
                    onCancel={this.onClose}
                    closable
                    okText={this.delete}
                >
                    <p className="addAssignor-title">Are you sure want to remove this user?</p>
                </Modal>
            </>
        )
    }
}

export default RemoveModal;