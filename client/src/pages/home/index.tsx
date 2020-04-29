import React, {useState} from 'react';
import { CalendarController } from '../../components'
import {addMultipleGames, addBlockedDay, getBlockedDays, editBlockedDay, apiGetGames} from '../../utility/APIGameControl'
import {getAllUsers} from '../../utility/APIUtility'
import AssignorExport from './AssignorExport';
import {getOnlyScheduledGames} from '../../components/Games'


const Home = ({isAuthenticated, user}: any) => {

    const [data, setData] = useState("")
    const [counter, setCounter] = useState(0)
    const [scheduledData, setScheduled] = useState("")

    if(counter == 0)
    {

        // apiGetGames().then((response)=>{setData(response); console.log("New Response" + JSON.stringify("Home Index: " + response))})

        apiGetGames().then((response)=>{setData(response)})

        if(data != "")
        {
            getOnlyScheduledGames(data, setScheduled)
            setCounter(counter + 1)
        }
            
    }

        function getBlock()
        {
            getBlockedDays().then((response)=>{console.log(response)})
        }


        function addBlock()
        {
            let blockedDay = {
                name: "blocked day",
                date: "2020-04-20"
            }
            addBlockedDay(blockedDay)
        }

        function editBlock()
        {
            let blockedDay = {
                name: "null",
                date: "2020-04-20",
                id: "1"
            }
            editBlockedDay(blockedDay)
        }



    return (


        <>
        <div>You are signed in as {user.schoolname}</div>
            <CalendarController user={user}/>

            {user.role != "ROLE_USER" && scheduledData != "" ?     
                <AssignorExport newData={scheduledData}/>
            :
                <></>
            }
        </>
    );
}

export default Home;