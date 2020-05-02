import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Header } from '../../style/PageStyles';
import GameCard from './GameCard';
import styled from 'styled-components';
import AddGameController from './AddGameController'
import GMModal from './GMModals';
import {GMProvider, useGlobalState } from './GMProvider';
import { isBrowser, isMobile } from "react-device-detect";
import BlockDays from '../Calendar/BlockDays';
import DayBlocker from './DayBlocker';

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
        color: "red"
    }
    :
    {
        fontSize: "3vw",
        color: "red"
    }

//sorts pending games based on status
function sortGames(games: any, role: string, homename: String) {
    let edit: any = [];
    let newGames: any = [];
    let assignorPending: any = [];
    
    for (let i = 0; i < games.length; i++) {


        var titleArray;
        var awayName;
        var gameHome;

        if(games[i].title != undefined)
        {
            titleArray = games[i].title.split("vs");
            awayName = titleArray[1]
            gameHome = titleArray[0]
        }

        if(role === "ROLE_USER")
        {
            if (games[i].status === "coachPending" && homename !== undefined) {
                newGames.push(games[i]);
            }
            else if(games[i].status === "assignorPending")
            {
                assignorPending.push(games[i])
            }
            else if (games[i].status !== undefined && games[i].status.includes('Edit')) { 
                edit.push(games[i]) 
            }

        }
        else
        {
            if (games[i].status === "assignorPending") {
                newGames.push(games[i]);
            }
        }

    }

    return { "edited": edit, "new": newGames, "assignor":assignorPending}
}

function sortScheduled(games: any) {
    let scheduled: any = []
    let canceled: any = []
    let moved: any = []

    for (let i = 0; i < games.length; i++) {

        if (games[i].status == "scheduled") {
            scheduled.push(games[i]);

        }
        else if (games[i].status == "cancelled") {
            canceled.push(games[i]);

        }
        else if (games[i].status == "moved") {
            moved.push(games[i])
        }

    }

    return { "scheduled": scheduled, "canceled": canceled, "moved": moved }
}

interface Props {
    category: string,
    pendingGames: any,
    scheduledGames: any,
    role: string,
    homeName: String,
    onUpdate: any,
    change: any
}

const CategoryCard = (props: Props) => {

    let showEditGame = useGlobalState("showEditGame");

    const [newGamesList, setGamesList] = useState(props.pendingGames)
    const [newScheduledList, setNewScheduled] =useState(props.scheduledGames)
    const role = props.role;

    //depending on category of curret card, gamesList is assigned list(s) of games
    const gamesList = newGamesList === "" ? props.pendingGames : sortGames(props.pendingGames, props.role, props.homeName)
    const scheduledList = newScheduledList === "" ? props.scheduledGames : sortScheduled(props.scheduledGames);

    const [key, setKey] = useState("pending");

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

        const mobileTabList =
        [
            {
                key: 'pending',
                tab: 'Pending Approval',
            },
            {
                key: "scheduled",
                tab: "Scheduled/Cancelled/Moved Games",
            }
        ]

    const adminTabList = [
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
        },
        {
            key: "block",
            tab: "Block Days"
        }
    ]

    //contains list of new games or message
    const listNew = gamesList.new[0] === undefined ?
        <Empty> There are no new game requests</Empty>
        :
        gamesList.new.map((game: any, i: any) => {

            return (
                <div>
                 <GMProvider>
                    <GameCard change={props.change} onUpdate={props.onUpdate} game={game} index={i} role={props.role}/>
                    <GMModal home={props.homeName} />
                  </GMProvider>
                </div>
            );
        })

    //contains list of edited games or message
    const listEdit = gamesList.edited[0] == undefined ?
        <Card><Empty>No games have been edited</Empty></Card>
        :
        gamesList.edited.map((game: any, i: any) => {
            return (
                <div>
                    <GMProvider>
                    <GameCard change={props.change} onUpdate={props.onUpdate} game={game} index={i} role={props.role}/>
                    <GMModal home={props.homeName} />
                    </GMProvider>
                </div>
            );
        })

    //contains list of scheduled games
    const listScheduled = scheduledList.scheduled == undefined ?
        <Empty>No games have been scheduled</Empty>
        :
        scheduledList.scheduled.map((game: any, i: any) => {
            return (
                <GMProvider>
                    <GameCard change={props.change} onUpdate={props.onUpdate} game={game} index={i} role={props.role}/>
                    { showEditGame && <GMModal home={props.homeName} /> }
                </GMProvider>
            );
        })

    const canceledList = scheduledList.canceled[0] == undefined ?
        <Empty>No games have been canceled</Empty>
        :
        scheduledList.canceled.map((game: any, i: any) => {
            return (
                <GameCard change={props.change} onUpdate={props.onUpdate} game={game} index={i} role={props.role}/>
            );
        })

    const movedList = scheduledList.moved[0] == undefined ?
        <Empty>No games have been moved</Empty>
        :
        scheduledList.moved.map((game: any, i: any) => {
            return (
                <GameCard change={props.change} onUpdate={props.onUpdate} game={game} index={i} role={props.role}/>
            );
        })

    const assignorList = gamesList.assignor[0] == undefined ?
    <Empty>No games have been sent to the Assignor</Empty>
    :
    gamesList.assignor.map((game: any, i: any) => {
        return (
            <GameCard change={props.change} onUpdate={props.onUpdate} game={game} index={i} role={props.role}/>
        );
    })

    useEffect(()=>{
        setGamesList(props.pendingGames)
        setNewScheduled(props.scheduledGames)
    },
        [props.change]
    )

    return (
        <Card
            style={{ width: '90%' }}
            //bodyStyle={{background: "#686868"}}
            headStyle={Headstyle}
            title={"Game Manager"}
            tabList={props.role != "ROLE_USER" ? adminTabList : isMobile ? mobileTabList : tabList}
            activeTabKey={key}
            onTabChange={key => setKey(key)}
        >
            {key === "pending" &&
                <>
                    
                    <Header>Recently Added</Header> 
                    There are {listNew.length === undefined ? <>0 pending games</> : <>{listNew.length} game(s) that need approval </>} 
                    {listNew}
                    <Header>Edited Games</Header>
                    There are {listEdit.length === undefined ? <>0 edited games</> : <>{listEdit.length} games that have been editied </>} 
                    {listEdit}
                    {props.role === "ROLE_USER" ? 
                    <>
                    <Header>Assignor pending</Header>
                    There are {assignorList.length === undefined ? <>0 games that need assignor approval</> : <>{assignorList.length} game(s) that need assignor aproval </>} 
                    {assignorList}
                    </>
                    :
                    <></>
                    }
                </>
            }
            {key === "scheduled" &&
                <>
                    <Header>Scheduled</Header>
                    There are {listScheduled.length === undefined ? <>0 scheduled games</> : <>{listScheduled.length} scheduled games </>} 
                    {listScheduled}
                    <Header>Moved</Header>
                    {movedList}
                    <Header>Canceled</Header>
                    {canceledList}
                </>
            }
            {key === "add" && isBrowser && <AddGameController onUpdate={props.onUpdate} change={props.change} role={props.role} userHome={props.homeName}/>}
            {key === "block" && props.role != "ROLE_USER" && <DayBlocker/>}
        </Card>
    );

}

export default CategoryCard;