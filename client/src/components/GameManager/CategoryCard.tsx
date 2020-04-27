import React, { useState } from 'react';
import { Card } from 'antd';
import { Header } from '../../style/PageStyles';
import GameCard from './GameCard';
import styled from 'styled-components';
import AddGameController from './AddGameController'
import { isMobile } from 'react-device-detect'
import GMModal from './GMModals';
import {GMProvider, useGlobalState } from './GMProvider';
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

    console.log("CategoryCard" + JSON.stringify(games))
    
    for (let i = 0; i < games.length; i++) {

        console.log("All Pending Games " + JSON.stringify(games[i]))

        var titleArray;
        var awayName;

        if(games[i].title != undefined)
        {
            titleArray = games[i].title.split("vs");
            awayName = titleArray[1]
        }

        if(role == "ROLE_USER")
        {
            if (games[i].status === "coachPending" && homename != undefined && awayName.includes(homename)) {
                console.log("GamesList" + games[i])
                newGames.push(games[i]);

            }
            else if(games[i].status == "assignorPending")
            {
                console.log("Assignor Pending Games " + games[i])
                assignorPending.push(games[i])
            }
            else if (games[i].status != undefined) {
                if (games[i].status.includes("Edit")) { edit.push(games[i]) }

            }

        }
        else
        {
            if (games[i].status === "assignorPending") {
                console.log("Assignor Pending" + games[i])
                newGames.push(games[i]);

            }
        }

    }


    console.log("EDITED" + edit)
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
    editGames: any,
    scheduledGames: any,
    role: string,
    homeName: String
}

const CategoryCard = (props: Props) => {

    let showEditGame = useGlobalState("showEditGame");

    //depending on category of curret card, gamesList is assigned list(s) of games
    const gamesList = props.editGames === "" ? props.editGames : sortGames(props.editGames, props.role, props.homeName)
    const scheduledList = props.scheduledGames === "" ? props.scheduledGames : sortScheduled(props.scheduledGames)

    //sortGames(props.editGames);


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
                    <GameCard game={game} index={i} role={props.role}/>
                    <GMModal />
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
                    <GameCard game={game} index={i} role={props.role}/>
                    <GMModal />
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
                    <GameCard game={game} index={i} role={props.role}/>
                    { showEditGame && <GMModal /> }
                </GMProvider>
            );
        })

    const canceledList = scheduledList.canceled[0] == undefined ?
        <Empty>No games have been canceled</Empty>
        :
        scheduledList.canceled.map((game: any, i: any) => {
            return (
                <GameCard game={game} index={i} role={props.role}/>
            );
        })

    const movedList = scheduledList.moved[0] == undefined ?
        <Empty>No games have been moved</Empty>
        :
        scheduledList.moved.map((game: any, i: any) => {
            return (
                <GameCard game={game} index={i} role={props.role}/>
            );
        })

    const assignorList = gamesList.assignor[0] == undefined ?
    <Empty>No games have been sent to the Assignor</Empty>
    :
    gamesList.assignor.map((game: any, i: any) => {
        return (
            <GameCard game={game} index={i} role={props.role}/>
        );
    })

    return (
        <Card
            style={{ width: '90%' }}
            //bodyStyle={{background: "#686868"}}
            headStyle={Headstyle}
            title={"Game Manager"}
            tabList={props.role != "ROLE_USER" ? adminTabList : tabList}
            activeTabKey={key}
            onTabChange={key => setKey(key)}
        >
            {key === "pending" &&
                <>
                    <Header>Recently Added</Header>
                    {listNew}
                    <Header>Edited Games</Header>
                    {listEdit}
                    {props.role === "ROLE_USER" ? 
                    <>
                    <Header>Assignor pending</Header>
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
                    {listScheduled}
                    <Header>Moved</Header>
                    {movedList}
                    <Header>Canceled</Header>
                    {canceledList}
                </>
            }
            {key === "add" && <AddGameController  role={props.role} userHome={props.homeName}/>}
            {key === "block" && props.role != "ROLE_USER" && <DayBlocker/>}
        </Card>
    );

}

export default CategoryCard;