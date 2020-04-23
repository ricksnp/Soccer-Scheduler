import React, {useState} from 'react';
import {addBlockedDay, editBlockedDay, getBlockedDays} from '../../utility/APIGameControl'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import DayBlockModal from './DayBlockModal';

import {notification, Button} from 'antd';

const defaultBlock = [{
    id: -0,
    date: "null",
    name: "null"
}]



const DayBlocker = () => {

    const [counter, setCounter] = useState(0);
    const [blockedDays, setBlockedDays] = useState(defaultBlock)
    const [daysToDelete, setDeleteDays] = useState(defaultBlock);
    const [showModal, setModal] = useState(false);
    const [modalType, setType] = useState("remove");
    const [buttonDisable, setDisable] = useState(true);


    function pushDelete(day: any)
    {
        let newDay = {
            id: day.id,
            name: day.name,
            date: day.date
        }

        let existFlag = false;

        let temp = [];

        //checking games already marked for deletion, if its in there it wont be added to Temp
        // and therefore will be removed from daysToDelete
        for (let i =0; i< daysToDelete.length; i++)
        {
            if(daysToDelete[i].id == day.id && daysToDelete[i].name == day.name && daysToDelete[i].date == day.date)
            {
                existFlag = true;
            }
            else{
                temp.push(daysToDelete[i])
            }
        }

        setDeleteDays(temp)

        if(existFlag == false)
        {
            setDisable(false)
            daysToDelete.push(newDay);
        }

    }

    function removeModal(){
        setType("remove");
        setModal(true);
        console.log("In Remove")
    }

    const blockedList = blockedDays.map((day:any, i:any) =>{
        return(
            <TableRow>
                <TableCell>
                    <Checkbox  onClick={()=>pushDelete(day)}/>
                </TableCell>
        <TableCell>{day.date}</TableCell>
            </TableRow>
        );
    })

    if(counter === 0)
    {
        setCounter(counter + 1)
        getBlockedDays().then((response) =>{
            setBlockedDays(response)
        })

    }




    return(
        <>
        <DayBlockModal show={showModal} setModal={setModal} type={modalType} delete={daysToDelete}/>
        <Table >
            <TableHead >
                <TableCell>Select: </TableCell>
                <TableCell>Date: </TableCell>
            </TableHead>

            {blockedDays[0].id == -0 ? 
                <></>
            :
                <TableBody>{blockedList}</TableBody>
            }
        </Table>
        <Button disabled={buttonDisable} style={{marginTop: "2vh"}} type="primary" onClick={()=>removeModal()}>Remove Selected</Button>
        </>
    )
}

export default DayBlocker;