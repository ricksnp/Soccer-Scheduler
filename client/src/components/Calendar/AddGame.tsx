import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useGlobalState, useDispatch } from './Provider';


const AddGameModal = ( {form}: {form: any} ) => {
    const visible = useGlobalState('showAddGame')
    const dispatch = useDispatch();

    const Option = Select.Option
    const { getFieldDecorator } = form;

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
            onCancel={ (e: any) => dispatch({ type: 'CANCEL_ADD_GAME' }) } // needs to clear fields on cancel
        >
            <Form layout="vertical">
                <Form.Item label="Home Team">
                    {getFieldDecorator('home-team', {
                        rules: [{ required: true, message: 'Select Name of Home Team' }],
                    })(
                        <Select
                            showSearch
                            placeholder="Home Team"
                        >
                            {teamOptions}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Description">
                    {getFieldDecorator('description')(<Input type="textarea" />)}
                </Form.Item>
            </Form>
        </Modal>
    );
}

const AddGame = Form.create({ name: "add_game" })(AddGameModal);
export default AddGame;