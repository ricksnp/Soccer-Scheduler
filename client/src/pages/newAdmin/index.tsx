import React, { useState } from 'react';
import { CategoryCard } from '../../components/GameManager';
import { Header, SubHeader } from '../../style/PageStyles';
import games from './gm.json';




const NewAdmin = () =>{

    //holds list of json file fames
    const gameList = games.games;
    const [user, setUser] = useState("coach");

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
            for ( let i = 0; i < gameList.length; i++ ) {
                if ( (gameList[i].status === "coachPending" || gameList[i].status === "awayEdit" ) && (gameList[i].home === "West Monroe H.S." || gameList[i].away === "West Monroe H.S.") )
                    pending.push(gameList[i]);
            }
        } 
        // if user isn't coach, find games where status == assognorpending || assignoredit
        else {
            for ( let i = 0; i < gameList.length; i++ ) {
                if ( gameList[i].status === "assignorPending" || gameList[i].status === "assignorEdit" )
                    pending.push(gameList[i]);
            }
        }
        return pending;
    }

    //store list of scheduled games based on user roll -- same as pending, different status requirements
    const scheduledGames = () => {
        let scheduled: any = [];
        if ( user === "coach" ){
            for ( let i = 0; i < gameList.length; i++ ) {
                if ( gameList[i].status === "scheduled" && (gameList[i].home === "West Monroe H.S." || gameList[i].away === "West Monroe H.S.") )
                    scheduled.push(gameList[i]);
            }
        } else {
            for ( let i = 0; i < gameList.length; i++ ) {
                if ( gameList[i].status === "scheduled" )
                    scheduled.push(gameList[i]);
            }
        }
        return scheduled;
    }

    //map game categories to be displayed (pending games v scheduled games)
    const displayCards = categories.map((categoryName, i) => {
        return(
            <CategoryCard 
                category={categoryName} 
                games={ categoryName === 'Pending Approval'? pendingGames() : scheduledGames() } />
        );
    });
    

    return(
        <div>
            <Header>Game Manager</Header>
            <button onClick={onClick}>toggle role</button>

            {displayCards}
        </div>
    );
}

export default NewAdmin;