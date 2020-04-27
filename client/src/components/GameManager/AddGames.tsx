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


  const teams: Array<string> = [ "Neville", "West Monroe", "Ouachita" ]
  const Option = Select.Option
  const teamOptions = teams.map((team, i) => {
      return (
          <Option value={team} key={i}>
              {team}
          </Option>
      );
  });

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
    persistance: any,
    control: any
}
const AddGames = (props:Props) => {

    const [gameData, setData] = useState(baseGame);
    const [counter, setCounter] = useState(0);
    const [oppTeam, setOpp] = useState("");
    const [level, setLevel] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    function deleteRow(index:any){

        props.remove(index);
        
    }

    function opChange(value: any)
    {
        props.persistance(value, props.index,"opp" )
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

    //Oppossing Team, Level, Gender, Location, Date, Time
    return(
       <TableRow style={{marginBottom: "2%"}}>
           <TableCell>
                <Select 
                    defaultValue={gameData.oppTeam}
                    onChange={opChange}
                >
                   {teamOptions}
                </Select>
            </TableCell>

            <TableCell>
                <Radio.Group defaultValue={gameData.level}>
                    <Radio.Button value={"v"}>Varsity</Radio.Button>
                    <Radio.Button value={"jv"}>Junior Varsity</Radio.Button>
                </Radio.Group>
            </TableCell>

            <TableCell>
                <Radio.Group defaultValue={gameData.gender}>
                    <Radio.Button value={"b"}>Boys</Radio.Button>
                    <Radio.Button value={"g"}>Girls</Radio.Button>
                </Radio.Group>
            </TableCell>

            <TableCell>
                <Input defaultValue={gameData.location}/>
            </TableCell>

            <TableCell>
                <DatePicker/>
            </TableCell>

            <TableCell>
                <TimePicker/>
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