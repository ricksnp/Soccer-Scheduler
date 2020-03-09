import React, { useState, useEffect} from 'react';
import { CategoryCard } from '../../components/GameManager';
import { Header, SubHeader } from '../../style/PageStyles';
import games from './gm.json';
import { useGlobalState, useDispatch } from '../../components/APIGameControls/Games';


const NewAdmin = () =>{

    //holds list of json file fames
    const gameList = games.games;
    const [apiGames, setGames] = useState("");
    const [user, setUser] = useState("coach");
    const response = useGlobalState("response");
    const [count, setCount] = useState(0);
    const [newRes,setRes] = useState("NULL");
    const [newPen, setPending] = useState("");
    const [newSched, setSched] = useState("");

    console.log("NewAdmin RESPONSE:" + response);

    const dispatch= useDispatch();

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

            if(count === 0)
            {
                dispatch({type: "CoachPending"});
                setCount(count + 1);
                console.log("COUNT: " + count)
            }
            for ( let i = 0; i < response.length; i++ ) {
                    pending.push(response[i]);
                    console.log("Pending coach games" + response[i])
            }
        } 
        // if user isn't coach, find games where status == assognorpending || assignoredit
        else {
            for ( let i = 0; i < gameList.length; i++ ) {
                if ( gameList[i].status === "assignorPending" || gameList[i].status === "assignorEdit" )
                    pending.push(gameList[i]);
            }
        }
        return pending
    }

    //store list of scheduled games based on user roll -- same as pending, different status requirements
    const scheduledGames = () => {
        let scheduled: any = [];
        if ( user === "coach" )
        {
            if(count === 0 )
            {
                dispatch({type: "ScheduledGames"});
                console.log("Scheduled Response: " + response)
                setCount(count + 1);
                console.log("COUNT: " + count)
            }
            for ( let i = 0; i < gameList.length; i++ ) 
            {
                    scheduled.push(response[i]);
                    console.log("Scheduled Game: " + response[i])
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
                {categoryName == 'Pending Approval' && <CategoryCard category={categoryName} games={pendingGames()}/>}
                {categoryName == 'Scheduled Games' && <CategoryCard category={categoryName} games={scheduledGames()}/>}


                {/* <CategoryCard 
                    category={categoryName} 
                    games={ categoryName === 'Pending Approval'? pendingGames() : scheduledGames() } /> */}
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