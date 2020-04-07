import React, { useState } from 'react';
import { Card } from 'antd';
import { Header } from '../../style/PageStyles';
import GameCard from './GameCard';
import styled from 'styled-components';
import AddGameController from './AddGameController'
import {isMobile} from 'react-device-detect'
import GMModal from './GMModals';
import {GMProvider} from './GMProvider'


const Empty = styled.div`
    @media only screen and (max-width: 768px){
        font-size: 8vw;
    }
    @media only screen and (min-width: 1200px){
        font-size: 2vw;
    }
    font-size:2vw;
    text-align:center;
`;

const Headstyle = isMobile ?  
    {
        fontSize: "9vw",
        color:"red"
    }
    :
    {
        fontSize: "3vw",
        color:"red"
    }

//sorts pending games based on status
function sortGames (games: any) 
{
    let edit:any = [];
    let newGames: any = [];

    console.log("CategoryCard" + JSON.stringify(games))
    for ( let i = 0; i < games.length; i++ ) {
    
        if(games[i].status === "coachPending")
        {
            console.log("GamesList" + games[i])
            newGames.push(games[i]);
            
        }
        else if(games[i] !== undefined)
        {
            if(games[i].status.includes("Edit") )
            {edit.push(games[i])}
            
        } 

    }


    console.log("EDITED" + edit)
    return { "edited": edit, "new": newGames }
}

function sortScheduled(games:any)
{
    let scheduled: any = []
    let canceled: any = []
    let moved: any = []

    for(let i = 0; i < games.length; i++ )
    {

        console.log("scheduled games" + JSON.stringify(games))
        if(games[i].status == "scheduled")
        {
            scheduled.push(games[i]);
            
        }
        else if(games[i].status == "cancelled")
        {
            canceled.push(games[i]);
            
        }
        else if(games[i].status == "moved")
        {
            moved.push(games[i])
        }

    }

    return { "scheduled": scheduled, "canceled": canceled, "moved": moved }
}

interface Props {
    category: string,
    editGames: any,
    scheduledGames: any
}

const CategoryCard = ( props: Props ) => {

    //depending on category of curret card, gamesList is assigned list(s) of games
    console.log("editGames" + JSON.stringify(props.editGames))
    const gamesList = props.editGames === "" ? props.editGames : sortGames(props.editGames)
    const scheduledList = props.scheduledGames === "" ? props.scheduledGames : sortScheduled(props.scheduledGames)
    
    //sortGames(props.editGames);
    

    const [key, setKey] = useState("pending");
   
    // const handleTabChange = () => {
    //     key === "new"? 
    //         setKey('edit')
    //     :
    //         setKey("new");
    // }

    //if current category is pending approval, add tabs to category card
    const tabList = 
        [
            {
                key: 'pending',
                tab: 'Pending Approval',
            },
            {
                key: "scheduled",
                tab: "Scheduled/Cancelled/Moved Games",
            },
            {
                key: "add",
                tab: "Add Games"
            }
        ]

    //contains list of new games or message
    const listNew = gamesList.new[0] === undefined ?
       <Empty> There are no new game requests</Empty>
    :
        gamesList.new.map((game: any, i: any) => {

            return(
                <div>
                    <GameCard game={game} index={i}/>
                    <GMModal />
                </div>
            );
        })
    
    //contains list of edited games or message
    const listEdit = gamesList.edited[0] ==  undefined ?
        <Card><Empty>No games have been edited</Empty></Card>
    :
        gamesList.edited.map((game: any, i: any) => {
            return(
                <div>
                    <GameCard game={game} index={i}/>
                    <GMModal />
                </div>
            );
        })

    //contains list of scheduled games
    const listScheduled =  scheduledList.scheduled == undefined  ?
        <Empty>No games have been scheduled</Empty>
    :
        scheduledList.scheduled.map((game: any, i: any) => {
            return(
                <GMProvider>
                    <GameCard game={game} index={i}/>
                    <GMModal />
                </GMProvider>
            );
        })

    const canceledList =  scheduledList.canceled[0] == undefined  ?
    <Empty>No games have been canceled</Empty>
    :
        scheduledList.canceled.map((game: any, i: any) => {
            return(
                <GameCard game={game} index={i}/>
            );
        })

    const movedList =  scheduledList.moved[0] == undefined  ?
    <Empty>No games have been moved</Empty>
    :
        scheduledList.moved.map((game: any, i: any) => {
            return(
                <GameCard game={game} index={i}/>
            );
        })

    return(
        <Card
            style={{ width: '90%'}}
            //bodyStyle={{background: "#686868"}}
            headStyle={Headstyle}
            title={"Game Manager"}
            tabList={tabList}
            activeTabKey={key}
            onTabChange={key =>setKey(key)}
        >
               { key === "pending" && 
                    <>
                    <Header>Recently Added</Header>
                    {listNew}
                    <Header>Edited Games</Header>
                    {listEdit}
                    </>
                }
                {key === "scheduled" && 
                    <>
                        <Header>Scheduled</Header>
                        {listScheduled}
                        <Header>Moved</Header>
                        {movedList}
                        <Header>Canceled</Header>
                        {canceledList}
                    </>
                }
                {key === "add" && <AddGameController/>}   
        </Card>
    );

}

export default CategoryCard;