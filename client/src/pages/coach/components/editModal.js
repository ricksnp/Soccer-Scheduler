import React from 'react';
import TextField from '@material-ui/core/TextField';
import {resetPassword} from '../../../utility/APIUtility'
import { Modal, Button, notification } from 'antd';

class EditModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onClose = () => {
        this.props.closeModal();
    }

    resetPassword = () =>{

        let userInfo = {
            id: this.props.user.id,
            password: "password1",
            name: this.props.user.name,
            email: this.props.user.email,
            district: this.props.user.district,
            schoolname: this.props.user.schoolname
        }

        console.log("User Info: " + JSON.stringify(userInfo))

        resetPassword(userInfo)
            .then((response)=>{
                notification.success({
                    message: "User's password Successfully reset",
                    description: response.message
                })
            })
            .catch((error) =>{
                notification.error({
                    message: "User's password was not reset",
                    desctiption: error.message
                })
            })

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
                    <p className="addAssignor-title">Edit Coaches</p>
                    <form className="addAssignor-form">
                        {/* <TextField id="standard-basic" label="Name" />
                        <TextField id="standard-basic" label="E-Mail" />
                        <TextField id="standard-basic" label="District" />
                        <TextField id="standard-basic" label="School" /> */}
                        <Button onClick={this.resetPassword}>Reset User's Password</Button>
                    </form>
                </Modal>
            </>
        )
    }
}

export default EditModal;