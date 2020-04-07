import React, {useState} from 'react';
import { CalendarController } from '../../components'
import { Header } from '../../style/PageStyles'
import {addMultipleGames} from '../../utility/APIGameControl'
import {getAllUsers} from '../../utility/APIUtility'

const Home = ({isAuthenticated, user}: any) => {

function addGames()
{
    let games = [
        {homeTeamName: "West Monroe", awayTeamName: "Neville", date: "2020-04-28T00:00:00", location: "MultipleTest", status: "Scheduled", teamLevel: "V", gender: "b" },
        {homeTeamName: "Neville", awayTeamName: "West Monroe", date: "2020-04-28T00:00:00", location: "MultipleTest", status: "Scheduled", teamLevel: "V", gender: "b" }
    ]

    console.log("Addding Multiple Games")
    console.log("MultipleGames: " + JSON.stringify(games))

    addMultipleGames(games)
}


function getUsers(){
   getAllUsers().then(response =>{
       console.log(response);
   })
}

        
    return (
        <>
        <div>You are signed in as {user.schoolname}</div>
            <CalendarController/>
        </>
    );
}

export default Home;