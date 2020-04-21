import React, {useState} from 'react';
import {Select, Form,} from 'antd';
import {isMobile} from "react-device-detect";
import styled from 'styled-components';
import EditModal from '../../pages/coach/components/editModal';
import {getAllUsers} from '../../utility/APIUtility';



function updateOptions(setter:any, userRole: string)
{

    let list:any = []

    let set = new Set()
    let count = 2;

    if(userRole == "ROLE_USER")
    {
        list[0] = "Your Games";
        list[1] = "Scheduled";
    }
    else{
        list[0] = "Scheduled";
        count = 1;
    }

    getAllUsers().then((response)=>
    {

        console.log("res: " + JSON.stringify(response))
        for(let i=0;i<response.length;i++)
        {
            if(!set.has(response[i].schoolname) && response[i].schoolname != "Assignor")
            {
                list[i+count] = response[i].schoolname
                set.add(response[i].schoolname)
        
            }
        }

        console.log(list)

        setter(list)
    })

    console.log("list" + list);
}


const Filter = ({setFilter, userRole}: any) =>
{

    const Option = Select.Option
    const teams: Array<string> = ["Your Games", "Scheduled"]

    const [teamList, setTeamList] = useState(teams)
    const [counter, setCounter] = useState(0);

    const teamOptions = teams.map((team, i) => {
        return (
            <Option value={team} key={i}>
                {team}
            </Option>
        );
    });


    const apiTeamOptions = teamList.map((team, i) => {
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

    if(counter === 0)
    {

        updateOptions(setTeamList, userRole);

        setCounter(counter +1)
    }



    return(
        <>

        {teamList.length === 2 ? 

        <Form {...layout}>
            <Form.Item label="Filter">
                {userRole == "ROLE_USER" ?
                    <Select showSearch onChange={handleChange} 
                        placeholder={"Your Games"}>
                            {teamOptions}
                    </Select>
                        :
                    <Select showSearch onChange={handleChange} 
                        placeholder={"Scheduled"}>
                            {teamOptions}
                    </Select>
                }        
            </Form.Item>
        </Form>

            :
        <Form {...layout}>
            <Form.Item label="Filter">
            {userRole == "ROLE_USER" ?
                    <Select showSearch onChange={handleChange} 
                        placeholder={"Your Games"}>
                            {apiTeamOptions}
                    </Select>
                        :
                    <Select showSearch onChange={handleChange} 
                        placeholder={"Scheduled"}>
                            {apiTeamOptions}
                    </Select>
                }        
            </Form.Item>
        </Form>

        }
        </>
    );

}
export default Filter;