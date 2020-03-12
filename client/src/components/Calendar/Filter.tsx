import React, {useState} from 'react';
import {Select, Form,} from 'antd';

const Filter = ({setFilter}: any) =>
{


    const Option = Select.Option
    const teams: Array<string> = [ "All", "Neville", "West Monroe", "Ouachita" ]
    
    const teamOptions = teams.map((team, i) => {
        return (
            <Option value={team} key={i}>
                {team}
            </Option>
        );
    });

    const handleChange = (values: any)=>{
        setFilter(values);
    }

    const layout = {
        labelCol: { span: 1 },
        wrapperCol: { span: 8 },
      };



    return(
        <Form {...layout}>
            <Form.Item label="Filter">
                <Select showSearch onChange={handleChange}>
                    {teamOptions}
                </Select>
            </Form.Item>
        </Form>
    );

}
export default Filter;