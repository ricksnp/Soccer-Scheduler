import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useGlobalState } from './Provider';


const AddGame = (  ) => {

    const visible = useGlobalState('showAddGame')

    return(
        <Modal visible={visible}>
            <Form layout="vertical">
                <Form.Item label="Home Team">
                    formform
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddGame;