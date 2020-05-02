import React, { useState, useEffect } from 'react';
import { CategoryCard } from '../../components/GameManager';
import { Header, SubHeader } from '../../style/PageStyles';
import { apiGetGames } from '../../utility/APIGameControl';
import { getGames } from '../../components/Provider';
import { getCoachPending, getCoachSchedule, getTeamSchedule, getAdminPending, getScheduledGames } from '../../components/Games';
import { LoadingIndicator } from '../../common'
import { Form, Select } from 'antd';

function getNewGames(setNew: any) {

    apiGetGames().then(response => {
        if (response != undefined) {

            setNew(response);

        }
    })
}

const NewAdmin = (userInfo: any) => {


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
    const [newSchedulued, setScheduled] = useState(initialResponse);
    const [userSchool, setSchool] = useState(userInfo.user.schoolname)
    const [userHome, setHome] = useState("null")
    const [change, setChange] = useState(1)


    //list of categories to display
    const categories = ['Pending Approval', 'Scheduled Games'];

    //store list of pending games based on user role
    const pendingGames = () => {
        //if user is coach, get games where (status == coachpending || away edit || home edit) AND where "my" team is a part of game
        if (user === "ROLE_USER") {


            if (newResponse[0] !== undefined && newResponse[0].status !== 'null' && counter < 2) {
                getCoachPending(newResponse, setPending, userSchool)
                setCounter(counter + 1)
            }
        }
        // if user isn't coach, find games where status == assignorPending || assignoredit
        else {

            if (newResponse !== undefined && newResponse[0].status !== 'null' && counter < 2) {
                getAdminPending(newResponse, setPending)
                setCounter(counter + 1)
            }

        }

        return newPending
    }

    //store list of scheduled games based on user roll -- same as pending, different status requirements
    const scheduledGames = () => {

        if (user === "ROLE_USER") {

            if (newResponse[0] != undefined && newResponse[0].status !== 'null' && counter < 2) {
                getTeamSchedule(newResponse, setScheduled, userSchool)
                setCounter(counter + 1)
            }
        }
        else {

            if (newResponse[0].status !== 'null' && counter < 2) {
                getScheduledGames(newResponse, setScheduled)
                setCounter(counter + 1)
            }
        }

        return newSchedulued
    }

    if (counter === 0) {
        getNewGames(setNew);
        setCounter(counter + 1);
        setUser(userInfo.user.role)
        setHome(userInfo.user.schoolname)

    }


    useEffect(() => {
        setCounter(0)
        pendingGames()
        scheduledGames()
    },
        [change, newResponse]

    )

    //map game categories to be displayed (pending games v scheduled games)
    const displayCards = categories.map((categoryName, i) => {

        return (
            <>

                {newResponse == undefined && newResponse[0].status === "null" ?

                    <>{console.log(newResponse)}</>
                    :
                    <>
                        {categoryName === 'Pending Approval' &&
                            <CategoryCard
                                role={userInfo.user.role}
                                category={categoryName}
                                pendingGames={newPending}
                                scheduledGames={newSchedulued}
                                homeName={userHome}
                                change={change}
                                onUpdate={setChange}
                                user={userInfo}
                            />}
                    </>
                }
            </>
        );
    });


    return (
        <div>
            <div>You are signed in as {userInfo.user.schoolname}</div>
            {displayCards}
        </div>
    );
}

export default NewAdmin;