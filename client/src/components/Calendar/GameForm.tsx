import React, {useState}from 'react'
import { Form, Select, Radio, TimePicker, Input } from 'antd';
import { useGlobalState } from './Provider';

interface Props {
    form: any
}



const CreateEditGame = ( props: Props ) => {
    const Option = Select.Option
    const showAddGame = useGlobalState('showAddGame');
    const addGameDate = useGlobalState('addGameDate');

    const [date, setDate] = useState(addGameDate);

    //for home/away team Select element
    const teams: Array<string> = [ "Neville", "West Monroe", "Ouachita" ]
    const teamOptions = teams.map((team, i) => {
        return (
            <Option value={team} key={i}>
                {team}
            </Option>
        );
    });

    console.log("Date" + date);
    
    const { form } = props;
    const { getFieldDecorator } = form;
    return (

        <Form layout="vertical">
            {showAddGame && addGameDate} 
            <Form.Item label="Home Team">
                {getFieldDecorator('homeTeamName', {
                    rules: [{ required: true, message: 'Select Home Team' }],
                })(
                    <Select showSearch >
                        {teamOptions}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="Away Team">
                {getFieldDecorator('awayTeamName', { 
                    rules: [{ required: true, message: 'Select Away Team' }],
                })(
                    <Select showSearch >
                        {teamOptions}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="Level">
                { getFieldDecorator('teamLevel', {
                    rules: [{ required: true }],
                })(
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="v">Varsity</Radio.Button>
                        <Radio.Button value="jv">Junior Varsity</Radio.Button>
                    </Radio.Group>
                ) }
            </Form.Item>
            <Form.Item label="Team">
                    { getFieldDecorator( 'gender', {
                        rules: [{ required: true }],
                    } )(
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value="b">Boys</Radio.Button>
                            <Radio.Button value="g">Girls</Radio.Button>
                        </Radio.Group>
                    ) }
            </Form.Item>
            <Form.Item label="Location">
                {getFieldDecorator('location', {
                    rules: [{ required: true, message: 'Select Location' }],
                })(
                    <Input/>
                )}
            </Form.Item>
            <Form.Item label="Status">
                {getFieldDecorator('status', {
                    rules: [{ required: true, message: 'Select Status' }],
                })(
                    <Input/>
                )}
            </Form.Item>
            {/* <Form.Item label="Time">
                { getFieldDecorator('time', {
                    rules: [{ required: true }],
                })(
                    <TimePicker use12Hours format="h:mm a" />
                ) }
            </Form.Item> */}

            <Form.Item label="Date">
                {getFieldDecorator('date', {
                    initalValue: date
                })(
                    <></>
                )}
            </Form.Item>
                <Form.Item/>
        </Form>
      );
};

const GameForm = Form.create({ name: "add_game" })(CreateEditGame);
export default GameForm;
