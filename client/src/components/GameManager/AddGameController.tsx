import React, { useState } from 'react';
import { Button} from 'antd';
import AddGames from './AddGames'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import MyModal1 from '../Calendar/importModal'

interface Props{
    role:String,
    userHome: String
}

const AddGameController = (props: Props) => {
    const initialArray = [{
        id:0,
        gameData: {
            oppTeam: undefined,
            level: undefined,
            gender: undefined,
            location: undefined,
            date: undefined,
            time: undefined
        }
    }]

    const [controlArray, setArray] = useState(initialArray);
    const [cardCount, setCount] = useState(0)


    function addCard( ) {

        let tempArray: any =[]

        for(let i = 0; i < controlArray.length; i++)
        {
            tempArray.push({
                id: controlArray[i].id,
                gameData: controlArray[i].gameData
            })
        }

        tempArray.push({
            id: controlArray.length,
            gameData: initialArray[0].gameData
            })

        setCount(cardCount + 1)

        setArray(tempArray);
    }


    function removeCard(index: any) {

        let tempArray:any = [];

        //removing the selected card 
        for (let i = 0; i < controlArray.length; i++) {
            if (controlArray[i].id !== index) {
                tempArray.push({
                    id: controlArray[i].id,
                    gamedata: controlArray[i].gameData
                })

                console.log("the control is " + JSON.stringify(controlArray[i]))
            }
        }
        setArray(tempArray)
        console.log("The temp array is: " + JSON.stringify(tempArray))


    }

    function persistance(data:any, id: any, selector: string){

        let tempObj:any = [];
        let newControl: any = [];

        for(let i = 0; i < controlArray.length; i++)
        {
            if(controlArray[i].id === id)
            {
                tempObj.push(controlArray[i].gameData)
            }
        }

        if(selector === "opp")
        {
            tempObj.oppTeam = data;
        }
        else if(selector === "gen")
        {
            tempObj.gender = data;
        }
        else if(selector === "loc")
        {
            tempObj.location = data;
        }
        else if(selector === "date")
        {
            tempObj.date = data;
        }
        else if(selector === "time")
        {
            tempObj.time = data
        }

        for(let i = 0; i < controlArray.length; i++)
        {
            if(controlArray[i].id != id)
            {
                newControl.push(controlArray[i]);
            }
        }

        newControl.push(tempObj)
        setArray(newControl);

    }

    const baseGame = [{
        oppTeam: undefined,
        level: undefined,
        gender: undefined,
        location: undefined,
        date: undefined,
        time: undefined
    }]


    return (
        <>
            <Table style={{marginBottom: "2%"}}>
                <TableHead >
                    <TableCell>Opposing Team: </TableCell>
                    <TableCell>Level: </TableCell>
                    <TableCell>Gender: </TableCell>
                    <TableCell>Location: </TableCell>
                    <TableCell>Date: </TableCell>
                    <TableCell>Time: </TableCell>
                    <TableCell>Confirm: </TableCell>
                    <TableCell>Remove: </TableCell>
                </TableHead>
                    <TableBody>

                    {cardCount === 0 ?

                        <AddGames remove={removeCard} index={0} control={controlArray} persistance={persistance}/>
                        :

                        controlArray.map((controlArray, i) => {
                            console.log(controlArray + "in map")
                            return (
                                <>
                                    <AddGames control={controlArray} key={i} remove={removeCard} index={i} persistance={persistance}/>
                                </>
                            )
                        })

                    }
                    <div>
                        <Button type="primary" onClick={() => addCard()}>Add Another Game</Button>
                    </div>
                </TableBody>
            </Table>
            <MyModal1 role={props.role} userHome={props.userHome}/>
        </>
    )
}


export default AddGameController