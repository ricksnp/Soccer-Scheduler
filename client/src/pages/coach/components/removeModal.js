import React from 'react';
import {deleteUser} from '../../../utility/APIUtility'
import { Modal, notification } from 'antd';
import { format } from 'url';

class RemoveModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onClose = () => {
        this.props.closeModal();
       
        deleteUser(JSON.stringify(this.props.user))
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
    }

    render() {
        return (
            <>
            { console.log(JSON.stringify(this.props.user))}
                <Modal
                    visible={this.props.showModal}
                    onCancel={this.onClose}
                    closable
                    okText="Delete"
                    onOk={this.onDelete}
                >
                    <p className="addAssignor-title">Are you sure want to remove {this.props.user.name}</p>
                </Modal>
            </>
        )
    }
}

export default RemoveModal;