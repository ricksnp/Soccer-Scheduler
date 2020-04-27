import React, {useState} from 'react';
import {addBlockedDay, editBlockedDay, getBlockedDays} from '../../utility/APIGameControl';
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

        console.log("New Day" + JSON.stringify(newDay) );

        let existFlag = false;

        let temp = [];

        //checking games already marked for deletion, if its in there it wont be added to Temp
        // and therefore will be removed from daysToDelete
        for (let i =0; i< daysToDelete.length; i++)
        {
            if(daysToDelete[i].id == day.id && daysToDelete[i].name == day.name && daysToDelete[i].date == day.date)
            {
                existFlag = true;
                console.log("Exisitng flag" + existFlag)
            }
            else if(daysToDelete[i].id == -0)
            {
                    //Do Nothing
            }
            else{
                temp.push(daysToDelete[i])
            }
        }


        if(existFlag == false)
        {
            setDisable(false)
            temp.push(newDay);
            setDeleteDays(temp)
        }

        console.log("TEMP"  + JSON.stringify(temp));

    }

    function closeModal(){
        setModal(false);
    }

    function removeModal(){
        setType("remove");
        setModal(true);
    }

    function addDay()
    {
        setType("add");
        setModal(true);
    }

    const blockedList = blockedDays.map((day:any, i:any) =>{
        return(
            <>
            {day.name == "blocked day" ? 
                <TableRow key={i}>
                    {console.log("Day" + JSON.stringify(day))}
                    <TableCell>
                        <Checkbox  onClick={()=>pushDelete(day)}/>
                    </TableCell>
                    <TableCell>{day.date}</TableCell>
                </TableRow>
                :
                <></>
            }
            </>
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
        <DayBlockModal show={showModal} close={closeModal} type={modalType} delete={daysToDelete} blockedDays={blockedDays}/>
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
        <Button type="primary" style={{marginLeft: "2%"}} onClick={()=> addDay()}>Add Blocked Day</Button>
        </>
    )
}

export default DayBlocker;