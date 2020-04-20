import React, {useState} from 'react';
import {Form, Input, Select, TimePicker, Button, DatePicker, Radio, Card} from 'antd';
import {isMobile, isIPad13} from "react-device-detect";
import styled from 'styled-components';


const Wrapper = styled.div`
    @media only screen and (max-width: 768px){
    }
    @media only screen and (min-width: 1200px){
        width:50%
    }
`;


const layout = 
  isMobile ?
    
      {wrapperCol: { span: 14 },
      labelCol: { span: 12 }}
    :
      {labelCol: { span: 4 },
      wrapperCol: { span: 5 }}
    
  


  const teams: Array<string> = [ "Neville", "West Monroe", "Ouachita" ]
  const Option = Select.Option
  const teamOptions = teams.map((team, i) => {
      return (
          <Option value={team} key={i}>
              {team}
          </Option>
      );
  });

  
const AddGames = () => {

    
    return(
        <Card>
            <Form.Item 
                label="Away Team"
                required
                {...layout}
            >
                <Select showSearch>
                    {teamOptions}
                </Select>
            </Form.Item>
            <Form.Item 
                label="Time"
                required
                {...layout}
            >
                <TimePicker/>
            </Form.Item>
            <Form.Item 
                label="Date"
                required
                {...layout}
            >
                <DatePicker/>
            </Form.Item>
            <Form.Item 
                label="Level"
                required
                {...layout}
            >
            <Radio.Group buttonStyle="solid">
                        <Radio.Button value="v">Varsity</Radio.Button>
                        <Radio.Button value="jv">Junior Varsity</Radio.Button>
                    </Radio.Group>

            </Form.Item>
            <Form.Item 
                label="Gender"
                required
                {...layout}
            >
            <Radio.Group buttonStyle="solid">
                        <Radio.Button value="v">Boys</Radio.Button>
                        <Radio.Button value="jv">Girls</Radio.Button>
                    </Radio.Group>

            </Form.Item>

            <Form.Item 
                label="Location"
                required
                {...layout}
            >
            <Input />

            </Form.Item>

        </Card>
    );
}



export default AddGames;