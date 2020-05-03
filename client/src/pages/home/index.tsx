import React, { useState, useEffect } from 'react';
import { CalendarController } from '../../components'
import { addMultipleGames, addBlockedDay, getBlockedDays, editBlockedDay, apiGetGames } from '../../utility/APIGameControl'
import { getAllUsers } from '../../utility/APIUtility'
import AssignorExport from './AssignorExport';
import { getOnlyScheduledGames } from '../../components/Games'


const Home = ({ isAuthenticated, user }: any) => {

    const blockedDay = [{
        name: "null",
        date: "2020-04-20",
        id: "1"
    }]
    const [data, setData] = useState("")
    const [counter, setCounter] = useState(1)
    const [scheduledData, setScheduled] = useState("")
    const [blockedDays, setBlockedDays] = useState(blockedDay)
    const [filterBlocked, setFilterBlocked] = useState("")
    const [change, setChange] = useState(0)

    if (counter == 0) {

        apiGetGames().then((response) => { setData(response) })

        if (data != undefined) {
            getOnlyScheduledGames(data, setScheduled)
            setCounter(counter + 1)
        }

    }

    function getBlock() {
        getBlockedDays().then((response) => { setBlockedDays(response) })
    }


    function addBlock() {
        let blockedDay = {
            name: "blocked day",
            date: "2020-04-20"
        }
        addBlockedDay(blockedDay)
    }

    function editBlock() {
        let blockedDay = {
            name: "null",
            date: "2020-04-20",
            id: "1"
        }
        editBlockedDay(blockedDay)
    }

    const filterBlockedDays = () => {

        let temp: any = []

        for (let i = 0; i < blockedDays.length; i++) {
            if (blockedDays[i].name === "blocked day") {
                // temp.push({
                //     start: blockedDay[i].date + "T00:00:00",
                //     end: blockedDay[i].date + "T00:00:00",
                //     rendering: "background",
                //     backgroundColor: "#434343"
                // })
            }
        }

        setFilterBlocked(temp);
    }

    useEffect(() => {
        getBlockedDays()
            .then((response) => {
                setBlockedDays(response)
            })

        filterBlockedDays()

    }, [change])

    useEffect(() => {
        filterBlockedDays()
    }, [blockedDays])


    return (


        <>
            <div>You are signed in as {user.schoolname}</div>
            <CalendarController user={user} filterBlocked={filterBlocked} />

            {user.role != "ROLE_USER" && scheduledData != "" ?
                <AssignorExport newData={scheduledData} />
                :
                <></>
            }
        </>
    );
}

export default Home;