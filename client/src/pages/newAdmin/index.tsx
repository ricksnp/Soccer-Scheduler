import React, { useState, useEffect} from 'react';
import { CategoryCard } from '../../components/GameManager';
import { Header, SubHeader } from '../../style/PageStyles';
import games from './gm.json';
import {apiGetGames} from '../../utility/APIGameControl';
import { getGames } from '../../components/Calendar/Provider';


async function getNewGames (setNew: any) {

        await apiGetGames().then(response =>{
          setNew(response);
        })
}

const NewAdmin = () =>{

    const initialResponse: any= [{
        status: "null",
        homeTeamName: "null",
        awayTeamName: "null",
        matchid: "null",
        date: "null",
        location: "null",
        teamLevel: "null",
        gender: "null"
}]

    //holds list of json file fames
    const gameList = games.games;
    const [apiGames, setGames] = useState("");
    const [user, setUser] = useState("coach");
    const [count, setCount] = useState(0);
    const [newRes,setRes] = useState("NULL");
    const [newPen, setPending] = useState(initialResponse);
    const [newSched, setSched] = useState("");
    const [counter, setCounter] = useState(0);
    const [newResponse, setNew] = useState(initialResponse);

    console.log("NewAdmin RESPONSE:" + newResponse);


    if(counter == 0)
    {
        getNewGames(setNew);
        setCounter(counter + 1);
    }


    //for testing purposes
    const onClick = () => {
        user === "coach" ? 
            setUser("assignor")    
        :
            setUser("coach")

    }

    //list of categories to display
    const categories = [ 'Pending Approval', 'Scheduled Games' ];
    
    //store list of pending games based on user role
    const pendingGames = () => {
        let pending: any = [];

        //if user is coach, get games where (status == coachpending || away edit) AND where "my" team is a part of game
        if (user === "coach") {

            for(let i = 0; i < newResponse.length; i++)
            {
                if(newResponse[i].status == "coachPending" && newResponse[i].homeTeamName == "West Monroe")
                {
                    pending.push({
                        id: newResponse[i].matchid,
                        home: newResponse[i].homeTeamName,
                        away: newResponse[i].awayTeamName,
                        start: newResponse[i].date.replace(" ", "T"),
                        location: newResponse[i].location,
                        teamLevel: newResponse[i].teamLevel,
                        status: newResponse[i].status,
                        gender: newResponse[i].gender
                    })
                }
            }

            console.log("newResponse =" + newResponse[0].status);
            console.log("Pending =" + pending);

        } 
        // if user isn't coach, find games where status == assognorpending || assignoredit
        else {
            for ( let i = 0; i < gameList.length; i++ ) {
                if ( gameList[i].status === "assignorPending" || gameList[i].status === "assignorEdit" )
                    pending.push(gameList[i]);
            }
        }
        console.log("Pending = " + pending)
        return pending
    }

    //store list of scheduled games based on user roll -- same as pending, different status requirements
    const scheduledGames = () => {
        let scheduled: any = [];
        if ( user === "coach" )
        {
            if(count === 0 )
            {
                setCount(count + 1);
                console.log("COUNT: " + count)
            }
            for ( let i = 0; i < gameList.length; i++ ) 
            {
            }
        } else {
            for ( let i = 0; i < gameList.length; i++ ) {
                if ( gameList[i].status === "scheduled" )
                    scheduled.push(gameList[i]);
            }
        }
        return scheduled
    }


    //map game categories to be displayed (pending games v scheduled games)
    const displayCards = categories.map((categoryName, i) => {

            return(
                <>
                {newResponse.status ==  "null" ? 
                
                <div>NULL</div>
                : 
                    <>
                    {categoryName == 'Pending Approval' && <CategoryCard category={categoryName} games={pendingGames()}/>}
                    {categoryName == 'Scheduled Games' && <CategoryCard category={categoryName} games={scheduledGames()}/>}
                    </>
            }
            </>
            );
    });
    

    return(
        <div>
            <Header>Game Manager</Header>
            <button onClick={onClick}>toggle role</button>
            {console.log("USER ROLE: " + user)}
            {displayCards}
        </div>
    );
}

export default NewAdmin;