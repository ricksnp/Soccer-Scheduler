import React, { useState } from 'react';
import { Button, Form} from 'antd';
import AddGames from './AddGames'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import {getAllUsers} from '../../utility/APIUtility'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MyModal1 from '../Calendar/importModal'

interface Props{
    role:String,
    userHome: String
}

const getUsers = (setter: any, userHome: any) =>{

    let temp: any = [];
    let set = new Set();

    getAllUsers().then((response)=>{
        for(let i = 0; i < response.length; i++)
        {
            if(!set.has(response[i].schoolname) && response[i].schoolname != "Assignor" && response[i].schoolname != "admin"
                && response[i].schoolname != userHome)
            {
                temp[i] = response[i].schoolname
                set.add(response[i].schoolname)
            }
        }

        temp[temp.length] = "Outside of District"
        setter(temp);
    })
}


const AddGameController = (props: Props) => {

    const [homeName, setHomeName] = useState(props.userHome)
    const [counter, setCounter] = useState(0);
    const teams: Array<string> = [ "Neville"]
    const [teamData,setTeams] = useState(teams)
    const [outsideFlag, setOutsideflag] = useState(false)

    if(counter == 0)
    {
        getUsers(setTeams, props.userHome)

        if(props.role != "ROLE_USER")
        {
            setHomeName("");
        }

        setCounter(counter + 1)
    }
    const game = {homeTeam: homeName, awayTeam: "", level: '', gender: '', location: '', date: '', time: '', input: ''}

    const [controlArray, setArray] = useState([
        {...game}
    ]);

    const addCard = ()=> {
        setArray([...controlArray, {...game}])
        console.log("Control Array" + JSON.stringify(controlArray))
    }


    function removeCard(index: any) {
        const updateArray: any = [...controlArray];
        const values = updateArray.splice(index, 1)
        setArray(updateArray)
        
    }

    const handleChange = (e:any)=>{
        const updateArray: any = [...controlArray];

        updateArray[e.target.dataset.idx][e.target.class] = e.target.value
        setArray(updateArray)
    }
    return (
        
        <>
        {console.log("Control render: " + JSON.stringify(controlArray))}
            <Table style={{marginBottom: "2%"}}>
                <TableHead >
                    {props.role != "ROLE_USER" ? 
                        <TableCell>Home Team: </TableCell>
                        :
                        <></>
                    }
                    <TableCell>Opposing Team: </TableCell>
                    <TableCell>Level: </TableCell>
                    <TableCell>Gender: </TableCell>
                    <TableCell>Location: </TableCell>
                    <TableCell>Date: </TableCell>
                    <TableCell>Time: </TableCell>
                    <TableCell>Confirm: </TableCell>
                    <TableCell>Remove: </TableCell>
                </TableHead>
                    {teamData.length == 1 ? 
                        <></>
                        :

                        <TableBody>
                        {controlArray.map((controlArray, i) => {
                            return (
                                <>
                                    <AddGames role={props.role} teamData={teamData} handleChange={handleChange} control={controlArray} key={i} remove={removeCard} index={i} />
                                </>
                            )
                        })}
                    <div>
                        <Button type="primary" style={{marginTop: "10%"}}onClick={() => addCard()}>Add Another Game</Button>
                    </div>
                </TableBody>
                
                }
            </Table>
            <MyModal1 role={props.role} userHome={props.userHome}/>
            
        </>
        
    )
}


export default AddGameController