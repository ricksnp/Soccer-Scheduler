import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useGlobalState, useDispatch } from './Provider';

interface Props {
    form: any
}

const AddGameModal = ( props: Props ) => {
    const visible = useGlobalState('showAddGame')
    const dispatch = useDispatch();

    const Option = Select.Option
    const { getFieldDecorator } = props.form;

    //for home/away team Select element
    const teams: Array<string> = [ "Neville", "West Monroe", "Ouachita" ]
    const teamOptions = teams.map((team, i) => {
        return (
            <Option value={team} key={i}>
                {team}
            </Option>
        );
    });

    return(
        <Modal 
            visible={visible} 
            closable 
            onCancel={ (e: any) => {
                props.form.resetFields();
                dispatch({ type: 'CLOSE_ADD_GAME' }) 
            }} // needs to clear fields on cancel
            onOk={ () => {
                props.form.validateFields((err: any, values: any) => {
                    if (err) {
                        return;
                }
        
                console.log("Received values of form: ", values);
        
                props.form.resetFields();
                dispatch({ type: 'CLOSE_ADD_GAME' })
                });
            } }
        >
            <Form layout="vertical">
                <Form.Item label="Home Team">
                    {getFieldDecorator('home-team', {
                        rules: [{ required: true, message: 'Select Home Team' }],
                    })(
                        <Select showSearch >
                            {teamOptions}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Away Team">
                    {getFieldDecorator('away-team', { 
                        rules: [{ required: true, message: 'Select Away Team' }],
                    })(
                        <Select showSearch >
                            {teamOptions}
                        </Select>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
}

const AddGame = Form.create({ name: "add_game" })(AddGameModal);
export default AddGame;