import React, {useState} from 'react';
import {Form, Input, Select, TimePicker, DatePicker, Radio, Card, Button, notification} from 'antd';
import { isMobile } from "react-device-detect";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
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

const baseGame = {
    oppTeam: undefined,
    level: undefined,
    gender: undefined,
    location: undefined,
    date: undefined,
    time: undefined
}

interface Props{
    remove: any,
    index: any,
    control: any,
    handleChange: any,
}
const AddGames = (props:Props) => {

    const [gameData, setData] = useState(baseGame);
    const [counter, setCounter] = useState(0);
    

    function deleteRow(index:any){

        props.remove(index);
        
    }
    if(counter === 0)
    {
        for(let i = 0; i < props.control.length; i++)
        {
            if(props.control[i].id == props.index)
            {
                setData(props.control[i].gameData);
            }
        }

        setCounter(counter+1)
    }

    const teams: Array<string> = [ "Neville", "West Monroe", "Ouachita" ]
    const Option = Select.Option
    const teamOptions = teams.map((team, i) => {
        return (
            <Option value={team} key={i}>
                {team}
            </Option>
        );
    });

    const levelOpt = [{label: "Varsity",value: "v"},{label: "Junior Varsity", value: "jv"}]
    const genderOpt = [{label: "Boys",value: "b"},{label: "Girls", value: "g"}]

    const awayChange =(newE: any) =>
    {
        console.log("value: " + newE)
        let e = {
            target: {
                value: newE,
                dataset:{
                    idx: props.index,
                },
                class: "awayTeam"
            }
        }

        props.handleChange(e)
    }

    const levelChange =(newE: any) =>
    {
        console.log("value: " + newE.target.value)
        let e = {
            target: {
                value: newE.target.value,
                dataset:{
                    idx: props.index,
                },
                class: "level"
            }
        }

        props.handleChange(e)
    }

    const genderChange =(newE: any) =>
    {
        console.log("value: " + newE.target.value)
        let e = {
            target: {
                value: newE.target.value,
                dataset:{
                    idx: props.index,
                },
                class: "gender"
            }
        }

        props.handleChange(e)
    }

    const locationChange =(newE: any) =>
    {
        console.log("value: " + newE.target.value)
        let e = {
            target: {
                value: newE.target.value,
                dataset:{
                    idx: props.index,
                },
                class: "location"
            }
        }

        props.handleChange(e)
    }

    const dateChange =(newE: any) =>
    {
        console.log("value: " + JSON.stringify(newE))

        let split = JSON.stringify(newE).split("T")

        let split1 = split[0].split("/")
        let split2 = split1[0].split("\"");

        console.log(split2[0])
        let e = {
            target: {
                value: split2[1],
                dataset:{
                    idx: props.index,
                },
                class: "date"
            }
        }

        props.handleChange(e)
    }

    const timeChange =(newE: any) =>
    {
        console.log("value: " + JSON.stringify(newE))
        let split = JSON.stringify(newE).split("T")

        let split1 = split[1].split("/")
        let split2 = split1[0].split("\"");
        let split3 = split2[0].split(".")
        let e = {
            target: {
                value: split3[0],
                dataset:{
                    idx: props.index,
                },
                class: "time"
            }
        }

        props.handleChange(e)
    }

    //Oppossing Team, Level, Gender, Location, Date, Time
    return(
       <TableRow style={{marginBottom: "2%"}}>
           {console.log("TESTING " + JSON.stringify(props.control))}
           <TableCell>
                <Select 
                    defaultValue={gameData.oppTeam}
                    onChange={awayChange}
                    data-idx={props.index}
                    key={"awayTeam"}
                    value={props.control.awayTeam}
                >
                    {teamOptions}
                </Select>
            </TableCell>

            <TableCell>
                <Radio.Group options={levelOpt} onChange={levelChange} defaultValue={gameData.level} />
            </TableCell>

            <TableCell>
                <Radio.Group defaultValue={gameData.gender} options={genderOpt} onChange={genderChange}/>
            </TableCell>

            <TableCell>
                <Input onChange={locationChange} defaultValue={gameData.location}/>
            </TableCell>

            <TableCell>
                <DatePicker onChange={dateChange}/>
            </TableCell>

            <TableCell>
                <TimePicker onChange={timeChange}/>
            </TableCell>

            <TableCell>
                <Button type="primary" ><i className="fas fa-check"></i></Button>
            </TableCell>

            <TableCell>
                <Button type="danger" onClick={()=>deleteRow(props.index)}><i className="fas fa-times"></i></Button>
            </TableCell>

       </TableRow>
    );
}



export default AddGames;