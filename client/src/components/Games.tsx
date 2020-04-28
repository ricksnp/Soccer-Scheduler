import React, { useState } from 'react';
import { apiGetGames } from '../utility/APIGameControl';


/*
getScheduledGames reads through the JSON data in the "getgames" API call
    and creates an array compatabile with full calendar
@param setEvents is a hook function to be set to the array
*/
export const getScheduledGames = (apiCall: any, setEvents: any) => {

    const res = apiCall;

    let games: any = [];

    for (let i = 0; i < res.length; i++) {
        if (res[i].status === "scheduled" || res[i].status === "moved" || res[i].status === "cancelled") {

            let color;
            if (res[i].status === "scheduled")
                color = '#78e388';
            else if (res[i].status === "moved")
                color = '#adadad';
            else if (res[i].status === 'cancelled')
                color = '#ff5757';

            games.push({
                title: res[i].homeTeamName + " vs " + res[i].awayTeamName,
                id: res[i].id,
                home: res[i].homeTeamName,
                away: res[i].awayTeamName,
                start: res[i].date.replace(" ", "T"),
                location: res[i].location,
                teamLevel: res[i].teamLevel,
                gender: res[i].gender,
                status: res[i].status,
                color: color,
                textColor: 'black'
            })
        }
    }

    setEvents(games);

}

export const getCSVSchedule = (apiCall: any, setEvents: any) => {

    const res = apiCall;

    let games: any = [];

    for (let i = 0; i < res.length; i++) {
        if (res[i].status === "scheduled" || res[i].status === "moved" || res[i].status === "cancelled") {
            let resDate = res[i].date.split(" ")
            let newDate = resDate[0];
            let newTime = resDate[1]

            games.push({
                HomeTeam: res[i].homeTeamName,
                AwayTeam: res[i].awayTeamName,
                Date: newDate,
                Time: newTime,
                Location: res[i].location,
                TeamLevel: res[i].teamLevel,
                Gender: res[i].gender,
                Status: res[i].status
            })
        }
    }

    setEvents(games);

}


export const getOnlyScheduledGames = (apiCall: any, setEvents: any) => {

    const res = apiCall;
    console.log("onlyscheduled res: " + JSON.stringify(res))

    let games: any = [];

    for (let i = 0; i < res.length; i++) {
        if (res[i].status == "scheduled") {
            console.log("IN IF STATEMENT")
            games.push({
                title: res[i].homeTeamName + " vs " + res[i].awayTeamName,
                id: res[i].id,
                home: res[i].homeTeamName,
                away: res[i].awayTeamName,
                start: res[i].date.replace(" ", "T"),
                location: res[i].location,
                teamLevel: res[i].teamLevel,
                status: res[i].status,
                gender: res[i].gender
            })
        }
    }

    console.log("Get scheduled games" + JSON.stringify(games))
    setEvents(games);

}

/*
getCoachSchedule reads through the JSON data in the "getgames" API call
    and creates an array of objects to be used by the CalendarFilter or 
    the Coaches Scheduling Page
@param setSchedule hook function to be set to the array
@param name the coaches school name
*/
export const getCoachSchedule = (apiCall: any, setSchedule: any, name: any) => {

    const res = apiCall;

    let games: any = [];

    for (let i = 0; i < res.length; i++) {
        if ((res[i].status === "scheduled" || res[i].status === "moved" || res[i].status === "cancelled" || res[i].status === "coachPending" || res[i].status === "assignorPending") &&
            (res[i].homeTeamName === name || res[i].awayTeamName === name)) {

            let color;
            if (res[i].status === "scheduled")
                color = '#78e388';
            else if (res[i].status === "moved")
                color = '#adadad';
            else if (res[i].status === 'cancelled')
                color = '#ff5757';
            else if (res[i].status === 'coachPending' || res[i].status === "assignorPending")
                color = '#fdff87';

            games.push({
                title: res[i].homeTeamName + " vs " + res[i].awayTeamName,
                id: res[i].id,
                home: res[i].homeTeamName,
                away: res[i].awayTeamName,
                start: res[i].date.replace(" ", "T"),
                location: res[i].location,
                teamLevel: res[i].teamLevel,
                gender: res[i].gender,
                status: res[i].status,
                color: color,
                textColor: 'black'
            })
        }
    }
    console.log("GETCOACHSCHEDULE: " + games)
    setSchedule(games);

}



/*
getTeamSchedule reads through the JSON data in the API call
    and creates an array of objects to be used by the CalendarFilter, shows another
    coaches games that have made it to the schedule. 
@param apiCall the JSON data to be sorted
@param setSchedule hook function to be set to the array
@param name the coaches school name
*/
export const getTeamSchedule = (apiCall: any, setSchedule: any, name: any) => {

    const res = apiCall;

    let games: any = [];

    for (let i = 0; i < res.length; i++) {
        if ((res[i].status === "scheduled" || res[i].status === "moved" || res[i].status === "cancelled") &&
            (res[i].homeTeamName === name || res[i].awayTeamName === name)) {
            let color;
            if (res[i].status === "scheduled")
                color = '#78e388';
            else if (res[i].status === "moved")
                color = '#adadad';
            else if (res[i].status === 'cancelled')
                color = '#ff5757';

            games.push({
                title: res[i].homeTeamName + " vs " + res[i].awayTeamName,
                id: res[i].id,
                home: res[i].homeTeamName,
                away: res[i].awayTeamName,
                start: res[i].date.replace(" ", "T"),
                location: res[i].location,
                teamLevel: res[i].teamLevel,
                gender: res[i].gender,
                status: res[i].status,
                color: color,
                textColor: 'black'
            })
        }
    }

    setSchedule(games);

}

/*
getCoachPending reads through the JSON data in the "getgames" API call
    and creates an array of objects to be read on the Coaches scheduling 
    pages to show all of their pending games
@param apiCall the JSON the api call returns
@param setPending hook function to be set to the array
@param name the name of the coaches team
*/
export const getCoachPending = (apiCall: any, setPending: any, name: String) => {

    const res = apiCall;
    console.log("RES" + JSON.stringify(res))

    let pending = [];

    for (let i = 0; i < res.length; i++) {

        if (res[i].status === "coachPending" || res[i].status === "assignorPending" && res[i].awayTeamName === name || res[i].homeTeamName == name) {
            console.log("IN IF")
            pending.push({
                title: res[i].homeTeamName + " vs " + res[i].awayTeamName,
                id: res[i].id,
                home: res[i].homeTeamName,
                away: res[i].awayTeamName,
                start: res[i].date,
                location: res[i].location,
                teamLevel: res[i].teamLevel,
                gender: res[i].gender,
                status: res[i].status
            })
        }
    }

    setPending(pending);

}


/*
getAdminPending reads through the JSON data in the "getgames" API call
    and creates an array of objects to be read on the Admin scheduling 
    pages to show all the games that need their approval
@param setAssignorPending hook function to be set to the array
*/
export const getAdminPending = (apiCall: any, setAssignorPending: any) => {

    const res = apiCall;

    let pending = [];

    for (let i = 0; i < res.length; i++) {
        if (res[i].status === "assignorPending") {
            pending.push({
                id: res[i].id,
                home: res[i].homeTeamName,
                away: res[i].awayTeamName,
                start: res[i].date.replace(" ", "T"),
                location: res[i].location,
                teamLevel: res[i].teamLevel,
                gender: res[i].gender,
                status: res[i].status
            })
        }
    }

    console.log("In Assignor Pending, Games = " + JSON.stringify(pending))
    setAssignorPending(pending);

}


/*
getEdit reads through the JSON data in the "getgames" API call
    and creates an array of objects to be read on the Coach's scheduling 
    pages to show all the edited games that need their approval
@param setEdit hook function to be set to the array
@param name the name of the coaches team
*/
export const getEdit = (apiCall: any, setEdit: any, name: any) => {

    const res = apiCall;

    let edited = [];

    for (let i = 0; i < res.length; i++) {
        if (res[i].status === "awayEdit" && res[i].homeTeamName.equals(name)) {
            edited.push({
                id: res[i].matchid,
                home: res[i].homeTeamName,
                away: res[i].awayTeamName,
                start: res[i].date.replace(" ", "T"),
                location: res[i].location,
                teamLevel: res[i].teamLevel,
                gender: res[i].gender
            })
        }
        else if (res[i].status === "awayEdit" && res[i].awayTeamName.equals(name)) {
            edited.push({
                id: res[i].matchid,
                home: res[i].homeTeamName,
                away: res[i].awayTeamName,
                start: res[i].date.replace(" ", "T"),
                location: res[i].location,
                teamLevel: res[i].teamLevel,
                gender: res[i].gender
            })
        }
    }

    setEdit(edited);

}




export { }; 