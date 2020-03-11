import React, {useState} from 'react';
import {Form, Input, Select, TimePicker, Button} from 'antd';
import { MinusCircleOutline, PlusOutline } from '@ant-design/icons';

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 4 },
  };


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

    const [gameCount, setCount] = useState(4)

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      
      const DynamicFieldSet = () => {
        const onFinish = (values:any) => {
            console.log('Received values of form:', values);
          };
    }
    

    return(
        <>
        <Form 
        {...layout}
        name="AddGames"
        >
            <Form.Item 
                label="Away Team"
                required
            >
                <Select showSearch>
                    {teamOptions}
                </Select>
            </Form.Item>

            <Form.Item 
                label="Time"
                required
            >
                <TimePicker/>
            </Form.Item>

        </Form>
        </>

        /*
         *
         * THIS IS THE CODE FOR A DYNAMIC FORM ITEM https://ant.design/components/form/ 
         *  (WORK IN PROGRESS)
         * 
         * */

    // <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
    //   <Form.List name="names">
    //     {(fields: any, { add, remove }: any) => {
    //       return (
    //         <div>
    //           {fields.map((field: any, index: any)  => (
    //             <Form.Item
    //               {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
    //               label={index === 0 ? 'Passengers' : ''}
    //               required={false}
    //               key={field.key}
    //             >
    //               <Form.Item
    //                 {...field}
    //                 validateTrigger={['onChange', 'onBlur']}
    //                 rules={[
    //                   {
    //                     required: true,
    //                     whitespace: true,
    //                     message: "Please input passenger's name or delete this field.",
    //                   },
    //                 ]}
    //                 noStyle
    //               >
    //                 <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
    //               </Form.Item>
    //               {fields.length > 1 ? (
    //                 <MinusCircleOutline
    //                   className="dynamic-delete-button"
    //                   onClick={() => {
    //                     remove(field.name);
    //                   }}
    //                 />
    //               ) : null}
    //             </Form.Item>
    //           ))}
    //           <Form.Item>
    //             <Button
    //               type="dashed"
    //               onClick={() => {
    //                 add();
    //               }}
    //               style={{ width: '60%' }}
    //             >
    //               <PlusOutline /> Add field
    //             </Button>
    //           </Form.Item>
    //         </div>
    //       );
    //     }}
    //   </Form.List>

    //   <Form.Item>
    //     <Button type="primary" htmlType="submit">
    //       Submit
    //     </Button>
    //   </Form.Item>
    // </Form>
    
    )

}



export default AddGames;