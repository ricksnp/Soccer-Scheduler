import React, {useState} from 'react';
import {Form, Input, Select, TimePicker, Button, DatePicker, Radio, Card} from 'antd';
import { MinusCircleOutline, PlusOutline } from '@ant-design/icons';
import {isMobile, isIPad13} from "react-device-detect";

const layout = 
  isMobile ?
    
      {wrapperCol: { span: 14 },
      labelCol: { span: 12 }}
    :
      {labelCol: { span: 2 },
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

    const [gameCount, setCount] = useState(4);
    
    return(
      <>
        <Card>
        <Form name="AddGames">
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

        </Form>
        </Card>
        <Button type="primary">Add Another Game</Button>
      </>
    );
}



export default AddGames;