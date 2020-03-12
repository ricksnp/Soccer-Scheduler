import React, { useState } from 'react';
import { Card } from 'antd';
import { Header, SubHeader } from '../../style/PageStyles';
import GameCard from './GameCard';
import styled from 'styled-components';
import AddGames from './AddGames';
import {isMobile} from 'react-device-detect'


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
function sortGames (games: any) {
    let edit:any = [];
    let newGames: any = [];
    for ( let i = 0; i < games.length; i++ ) {
    
        if(games[i].status === "coachPending")
        {
        
            newGames.push(games[i]);
            
        }
        else if(games[i].status.includes("Edit") )
        {
            edit.push(games[i])
        } 

    }

    return { "edited": edit, "new": newGames }
}

interface Props {
    category: string,
    editGames: any,
    scheduledGames: any
}

const CategoryCard = ( props: Props ) => {

    //depending on category of curret card, gamesList is assigned list(s) of games
    const gamesList = sortGames(props.editGames);
    

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
                tab: "Scheduled Games",
            },
            {
                key: "add",
                tab: "Add Games"
            }
        ]

    //contains list of new games or message
    const listNew = gamesList.new.length === 0 ?
       <Empty> No new games have been created</Empty>
    :
        gamesList.new.map((game: any, i: any) => {
            return(
                <GameCard game={game} />
            );
        })
    
    //contains list of edited games or message
    const listEdit = gamesList.edited.length  === 0?
        <Card><Empty>No games have been edited</Empty></Card>
    :
        gamesList.edited.map((game: any, i: any) => {
            return(
                <GameCard game={game} />
            );
        })

    //contains list of scheduled games
    const listScheduled =  props.scheduledGames.length === 0 ?
        <Empty>No games have been scheduled</Empty>
    :
        props.scheduledGames.map((game: any, i: any) => {
            return(
                <GameCard game={game} />
            );
        })

    return(
        <Card
            style={{ width: '90%'}}
            // bodyStyle={{background: "#5cdbd3"}}
            headStyle={Headstyle}
            title={"Game Manager"}
            tabList={tabList}
            activeTabKey={key}
            onTabChange={key =>setKey(key)}
        >
               { key === "pending" && 
                    <>
                    <Header>New Games</Header>
                    {listNew}
                    <Header>Edited Games</Header>
                    {listEdit}
                    </>
                }
                {key === "scheduled" && listScheduled}
                {key === "add" && <AddGames/>}   
        </Card>
    );

}

export default CategoryCard;