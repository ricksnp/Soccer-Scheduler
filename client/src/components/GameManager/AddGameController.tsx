import React, { useState } from 'react';
import { Button, Form} from 'antd';
import AddGames from './AddGames'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MyModal1 from '../Calendar/importModal'

interface Props{
    role:String,
    userHome: String
}

const AddGameController = (props: Props) => {

    const game = {homeTeam: props.userHome, awayTeam: "", level: '', gender: '', location: '', date: '', time: ''}
    const [controlArray, setArray] = useState([
        {...game}
    ]);

    const  addCard = ()=> {

        setArray([...controlArray, {...game}])
        console.log("Control Array" + JSON.stringify(controlArray))
    }


    function removeCard(index: any) {
        const updateArray: any = [...controlArray];
        const values = updateArray.splice(index, 1)
        setArray(values)
        
    }

    const handleChange = (e:any)=>{
        const updateArray: any = [...controlArray];
        console.log("My e " + e)

        updateArray[e.target.dataset.idx][e.target.class] = e.target.value
        setArray(updateArray)
    }

    return (
        
        <>
            <Form>
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
                        {controlArray.map((controlArray, i) => {
                            return (
                                <>
                                    <AddGames handleChange={handleChange} control={controlArray} key={i} remove={removeCard} index={i} />
                                </>
                            )
                        })}
                    <div>
                        <Button type="primary" onClick={() => addCard()}>Add Another Game</Button>
                    </div>
                </TableBody>
            </Table>
            </Form>
            <MyModal1 role={props.role} userHome={props.userHome}/>
            
        </>
        
    )
}


export default AddGameController