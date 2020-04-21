import React from 'react';
import { CalendarController } from '../../components'
import {addMultipleGames, addBlockedDay, getBlockedDays, editBlockedDay} from '../../utility/APIGameControl'
import {getAllUsers} from '../../utility/APIUtility'

const Home = ({isAuthenticated, user}: any) => {

// function addGames()
// {
//     let games = [
//         {homeTeamName: "West Monroe", awayTeamName: "Neville", date: "2020-04-28T00:00:00", location: "MultipleTest", status: "Scheduled", teamLevel: "V", gender: "b" },
//         {homeTeamName: "Neville", awayTeamName: "West Monroe", date: "2020-04-28T00:00:00", location: "MultipleTest", status: "Scheduled", teamLevel: "V", gender: "b" }
//     ]

//     console.log("Addding Multiple Games")
//     console.log("MultipleGames: " + JSON.stringify(games))

//     addMultipleGames(games)
// }


// function getUsers(){
//    getAllUsers().then(response =>{
//        console.log(response);
//    })
// }

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
        </>
    );
}

export default Home;