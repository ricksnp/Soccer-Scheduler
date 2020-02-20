import React from 'react';
import {Select, Form} from 'antd';


const Filter = () =>
{

    const Option = Select.Option

    const teams: Array<string> = [ "Neville", "West Monroe", "Ouachita" ]
    const teamOptions = teams.map((team, i) => {
        return (
            <Option value={team} key={i}>
                {team}
            </Option>
        );
    });


    return(
        <Form.Item label="Home Team">
            <Select showSearch >
                {teamOptions}
            </Select>
        </Form.Item>
    );

}

export default Filter;