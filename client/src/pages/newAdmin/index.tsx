import React, { useState, useEffect } from 'react';
import { CategoryCard } from '../../components/GameManager';
import { Header, SubHeader } from '../../style/PageStyles';
import { apiGetGames } from '../../utility/APIGameControl';
import { getGames } from '../../components/Calendar/Provider';
import { getCoachPending } from '../../components/Games';


async function getNewGames(setNew: any) {

    await apiGetGames().then(response => {
        setNew(response);
    })
}
interface User {
    name: string,
    role: string
}
const NewAdmin = (userInfo: User) => {


    const initialResponse: any = [{
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
    const [user, setUser] = useState("coach");
    const [counter, setCounter] = useState(0);
    const [newResponse, setNew] = useState(initialResponse);
    const [newPending, setPending] = useState(initialResponse);
    const [flag, setflag] = useState(false);
 

    if (counter == 0) {
        getNewGames(setNew);
        setCounter(counter + 1);
        setUser("ROLE_USER")
    }


    //for testing purposes
    const onClick = () => {
        user === "coach" ?
            setUser("assignor")
            :
            setUser("ROLE_USER")

    }

    //list of categories to display
    const categories = ['Pending Approval', 'Scheduled Games'];

    //store list of pending games based on user role
    const pendingGames = () => 
    {
        //if user is coach, get games where (status == coachpending || away edit) AND where "my" team is a part of game
        if (user === "ROLE_USER") 
        {
            console.log("COUNTER:" + counter);
    
            if(newResponse[0].status != 'null' && counter < 2)
            {
                getCoachPending(newResponse, setPending, "West Monroe")
                setCounter(counter + 1)
                console.log("Current" + JSON.stringify(newPending))
            }
        }
        // if user isn't coach, find games where status == assognorpending || assignoredit
        else {


        }
        console.log(JSON.stringify("NEWPENDING " + JSON.stringify(newPending)))
        return newPending
    }

    //store list of scheduled games based on user roll -- same as pending, different status requirements
    const scheduledGames = () => {
        let scheduled: any = [];
        if (user === "coach") {
            
                // } else {
            //     for ( let i = 0; i < gameList.length; i++ ) {
            //         if ( gameList[i].status === "scheduled" )
            //             scheduled.push(gameList[i]);
            //     }
        }
        return scheduled
    }


    //map game categories to be displayed (pending games v scheduled games)
    const displayCards = categories.map((categoryName, i) => {

        return (
            <>
                {newResponse.status == "null" ?

                    <div>There Are No Games</div>
                    :
                    <>
                    {console.log("INPENDING" + newPending) }
                        {categoryName == 'Pending Approval' &&
                            <CategoryCard 
                                category={categoryName} 
                                editGames={pendingGames()} 
                                scheduledGames={scheduledGames()}
                            />}
                    </>
                }
            </>
        );
    });


    return (
        <div>
            {console.log("USER ROLE: " + user)}
            {displayCards}
        </div>
    );
}

export default NewAdmin;