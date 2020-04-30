import React, {useState} from 'react';
import {Form, Input, Select, TimePicker, DatePicker, Radio, Card, Button, notification} from 'antd';
import {postGames}from '../../utility/APIGameControl'
import { isMobile } from "react-device-detect";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import moment from 'moment';

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
    homeTeam: undefined,
    oppTeam: undefined,
    level: undefined,
    gender: undefined,
    location: undefined,
    date: undefined,
    time: undefined
}

const assignorBase = {
    homeTeam: undefined,
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
    teamData: any,
    role: any,
    updateAbove: any
}


const AddGames = (props:Props) => {

    const [gameData, setData] = useState(baseGame);
    const [counter, setCounter] = useState(0);
    const [bgColor, setbgColor] = useState("white")
    const [input, setInput] = useState("")
    const [outsideFlag, setOutsideflag] = useState(false)

    

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

    const Option = Select.Option
    const options = props.teamData
    const teamOptions = options.map((team:any, i:any) => {
        return (
            <Option value={team} key={i}>
                {team}
            </Option>
        );
    });

    const levelOpt = [{label: "Varsity",value: "v"},{label: "Junior Varsity", value: "jv"}]
    const genderOpt = [{label: "Boys",value: "b"},{label: "Girls", value: "g"}]
    
    const inputChange = (newE: any) => {

        let e = {
            target: {
                value: newE.target.value,
                dataset:{
                    idx: props.index,
                },
                class: "input"
            }
        }

        setOutsideflag(true)
        props.handleChange(e)
    }
    
    const homeChange =(newE: any) =>
    {
        console.log("value: " + newE)
        let e = {
            target: {
                value: newE,
                dataset:{
                    idx: props.index,
                },
                class: "homeTeam"
            }
        }

        props.handleChange(e)
    }
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
        
        let e = {
            target: {
                value: newE,
                dataset:{
                    idx: props.index,
                },
                class: "time"
            }
        }

        props.handleChange(e)
    }

    const confirmGame = () =>{

        let status = "coachPending"
        let home = props.control.homeTeam;
        let away = props.control.awayTeam;
        var d = new Date(props.control.time);
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();

        let hours;
        let min;
        let sec;

        if(h < 10)
        {hours = "0" + h;}
        else{hours = h;}

        if(m < 10)
        {min = "0" + m}
        else
        {min = m }

        if(s < 10)
        {sec = "0" + s}
        else
        {sec = s;}

        if(props.role != "ROLE_USER")
        {
            status="scheduled";
        }
        else if(outsideFlag)
        {
            status = "assignorPending"

            if(home === "Outside of District")
            {
                home = props.control.input
            }
            else if(away === "Outside of District")
            {
                away = props.control.input
            }
        }

        let addGame = {
            homeTeamName: home,
            awayTeamName: away,
            date: props.control.date + "T" + hours +":"+min+":"+s,
            location: props.control.location,
            teamLevel: props.control.level,
            gender: props.control.gender,
            status: status
        }

        console.log(addGame)
        console.log("Time: " + d.getHours())

        postGames(addGame)
            .then((response)=>{
                notification.success({
                    message: "Game Added successfully",
                    description: "Game on " + props.control.date + " was added"
                    
                })
                console.log("RESPONSE" + JSON.stringify(response))
                setbgColor("#73d13d")
                props.updateAbove()
            })
            .catch((error)=>{
                notification.error({
                    message: "Game was not added",
                    description: error.essage
                })

                setbgColor("#ff4d4f")
            })
    }

    //Oppossing Team, Level, Gender, Location, Date, Time
    return(
        <>
       <TableRow style={{background: bgColor}}>

           {props.role != "ROLE_USER" ? 
               <TableCell>
                    <Select 
                        style={{width: "100%"}}
                        defaultValue={gameData.homeTeam}
                        onChange={homeChange}
                        data-idx={props.index}
                        value={props.control.homeTeam != "Assignor" && props.control.homeTeam != "admin" ? props.control.homeTeam : "" }
                    >
                        {teamOptions}
                    </Select>
                </TableCell>
                :
            <></>
            }
           <TableCell>
                    <Select
                        style={{width: "100%"}} 
                        defaultValue={gameData.oppTeam}
                        onChange={awayChange}
                        data-idx={props.index}
                        value={props.control.awayTeam}
                    >
                        {teamOptions}
                    </Select>
            </TableCell>

            <TableCell>
                <Radio.Group value={props.control.level} options={levelOpt} onChange={levelChange} />
            </TableCell>

            <TableCell>
                <Radio.Group value={props.control.gender} options={genderOpt} onChange={genderChange}/>
            </TableCell>

            <TableCell>
                <Input value={props.control.location} onChange={locationChange} defaultValue={gameData.location}/>
            </TableCell>

            <TableCell>
                <DatePicker value={props.control.date == '' ? null : moment(props.control.date, 'YYYY-MM-DD')} onChange={dateChange}/>
            </TableCell>

            <TableCell>
                <TimePicker onChange={timeChange}/>
            </TableCell>

            <TableCell>
                <Button type="primary" onClick={confirmGame}><i className="fas fa-check"></i></Button>
            </TableCell>

            <TableCell>
                <Button type="danger" onClick={()=>deleteRow(props.index)}><i className="fas fa-times"></i></Button>
            </TableCell>
       </TableRow>

            {props.control.homeTeam === "Outside of District" ? 
                 <>Type in home team name:<Input defaultValue={props.control.input} onChange={inputChange} style={{margin: "10% 0%"}} /><br/></>
                 :
                 <></>
                }
            {props.control.awayTeam === "Outside of District" ? 
                <>Type in away team name:<Input defaultValue={props.control.input} onChange={inputChange} style={{marginTop: "10%"}} /><br/></>
                :
                <></>
            }
       </>
    );
}



export default AddGames;