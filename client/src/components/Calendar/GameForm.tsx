import React, {useState}from 'react'
import { Form, Select, Radio, TimePicker, Input, Checkbox } from 'antd';
import { useGlobalState } from './Provider';

interface Props {
    form: any
}

//if "other", school is not in disctrict, make new field appear to type in school

const CreateEditGame = ( props: Props ) => {
    const Option = Select.Option
    const showAddGame = useGlobalState('showAddGame');
    const addGameDate = useGlobalState('addGameDate');

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
            {/*showAddGame && addGameDate*/} 
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
            <Form.Item label="Status" style={ {display: "none"} } >
                {getFieldDecorator('status', {
                    rules: [{ required: true, message: 'Select Status' }],
                    initialValue: "coachPending"
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

            {/* <Form.Item label="Date">
                {getFieldDecorator('date', {
                    rules: [{ required: true, message: 'Select Status' }],
                    initialValue: [date]
                })(
                    <Checkbox>{date}</Checkbox>
                )}
            </Form.Item> */}


            <Form.Item label="Date">
                {getFieldDecorator('date', {
                    rules: [{ required: true, message: 'Select Status' }],
                    initialValue: addGameDate
                })(
                    <Input disabled style={{width:"50%"}} />
                )}
            </Form.Item>
                <Form.Item/>
        </Form>
      );
};

const GameForm = Form.create({ name: "add_game" })(CreateEditGame);
export default GameForm;
