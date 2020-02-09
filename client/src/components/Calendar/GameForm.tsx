import React from 'react'
import { Form, Select, Radio, TimePicker } from 'antd';

interface Props {
    form: any
}



const CreateEditGame = ( props: Props ) => {
    const Option = Select.Option

    //for home/away team Select element
    const teams: Array<string> = [ "Neville", "West Monroe", "Ouachita" ]
    const teamOptions = teams.map((team, i) => {
        return (
            <Option value={team} key={i}>
                {team}
            </Option>
        );
    });

    
    const { form } = props;
    const { getFieldDecorator } = form;
    return (

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
            <Form.Item label="Level">
                { getFieldDecorator('level', {
                    rules: [{ required: true }],
                })(
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="v">Varsity</Radio.Button>
                        <Radio.Button value="jv">Junior Varsity</Radio.Button>
                    </Radio.Group>
                ) }
            </Form.Item>
            <Form.Item label="Team">
                    { getFieldDecorator( 'team', {
                        rules: [{ required: true }],
                    } )(
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value="b">Boys</Radio.Button>
                            <Radio.Button value="g">Girls</Radio.Button>
                        </Radio.Group>
                    ) }
            </Form.Item>
            <Form.Item label="Time">
                { getFieldDecorator('time', {
                    rules: [{ required: true }],
                })(
                    <TimePicker use12Hours format="h:mm a" />
                ) }
            </Form.Item>
        </Form>
      );
};

const GameForm = Form.create({ name: "add_game" })(CreateEditGame);
export default GameForm;
