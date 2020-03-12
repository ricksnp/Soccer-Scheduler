import React, {useState} from 'react';
import {Select, Form,} from 'antd';
import {isMobile} from "react-device-detect";
import styled from 'styled-components';
import EditModal from '../../pages/coach/components/editModal';




const Filter = ({setFilter}: any) =>
{


    const Option = Select.Option
    const teams: Array<string> = [ "Your Games", "Scheduled", "Neville", "West Monroe", "Ouachita" ]
    
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

    const layout = 
        isMobile ? 
        {   
            labelCol: {span: 3},
            wrapperCol: {span: 10}
        }
        :
        {
            labelCol: { span: 1 },
            wrapperCol: { span: 8 },
        }



    return(
        <Form {...layout}>
            <Form.Item label="Filter">
                <Select showSearch onChange={handleChange} placeholder={"Your Games"}>
                    {teamOptions}
                </Select>
            </Form.Item>
        </Form>
    );

}
export default Filter;