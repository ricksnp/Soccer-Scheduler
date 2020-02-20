import React from 'react'
import { Form, Input, Button, Select } from 'antd';

interface Props {
    form: any
}

interface Game {
    homeTeamName:{
        value: String
    },
    awayTeamName:{
        value: String
    },
    date:{
        value: String
    },
    gender:{
        value: String
    },
    teamLevel:{
        value: String
    } 
}


const NewGame = ( props: Props ) => {

    const newGame:Game = {
        homeTeamName:{
            value: ""
        },
        awayTeamName:{
            value: ""
        },
        date:{
            value: ""
        },
        gender:{
            value: ""
        },
        teamLevel:{
            value: ""
        } 
    }

    
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
        </Form>
      );
};

const NewGameForm = Form.create({ name: "add_game" })(NewGame);
export default NewGameForm;
