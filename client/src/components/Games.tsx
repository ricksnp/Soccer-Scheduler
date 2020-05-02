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

    let games: any = [];

    for (let i = 0; i < res.length; i++) {
        if (res[i].status == "scheduled") {
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

    let pending = [];

    for (let i = 0; i < res.length; i++) {

        if ( ( res[i].status === "coachPending" && res[i].awayTeamName === name) || //if status is coachPending and I am away team, then game is pending my approval
            ( res[i].status === "assignorPending" && ( res[i].awayTeamName === name || res[i].homeTeamName == name ) || //if status is assignor pending and I am a participant, then we are both waiting on assignor approval
            ( res[i].status === "awayEdit" && res[i].homeTeamName === name ) || ( res[i].status === "homeEdit" && res[i].awayTeamName === name ) ) ) { // (if awayTeam edited game and I am homeTeam) OR (if homeTeam edited game and I am awayTeam), then game is pending my approval 

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

    setAssignorPending(pending);

}

export const getUserSecondFilter = (apiCall: any, setSecond: any, name: String, secondFilter: any) => {
    const res = apiCall;

    let second: any = []

    for (let i = 0; i < res.length; i++) {
        const scheduled = secondFilter.scheduled ? res[i].status == "scheduled" : false;
        const moved = secondFilter.moved ? res[i].status === "moved" : false;
        const canceled = secondFilter.canceled ? res[i].status === "cancelled" : false;
        const pending = secondFilter.pending ? res[i].status === "coachPending" || res[i].status.includes("Edit") || res[i].status === "assignorPending" : false;
        const varsity = secondFilter.varsity ? res[i].teamLevel === "v" : false;
        const jv = secondFilter.jv ? res[i].teamLevel === "jv" : false;
        const boys = secondFilter.boys ? res[i].gender === "b" : false;
        const girls = secondFilter.girls ? res[i].gender === "g" : false;


        if ((scheduled || moved || canceled || pending) && (varsity || jv) && (boys || girls) && (res[i].awayTeamName === name || res[i].homeTeamName == name)) {

            let color;
            if (res[i].status === "scheduled")
                color = '#78e388';
            else if (res[i].status === "moved")
                color = '#adadad';
            else if (res[i].status === 'cancelled')
                color = '#ff5757';
            else if (res[i].status === 'coachPending' || res[i].status === "assignorPending" || res[i].status.includes('Edit') )
                color = '#fdff87';

            second.push({
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

    setSecond(second)

}

export const getCoachSecondFilter = (apiCall: any, setSecond: any, name: String, secondFilter: any) => {
    const res = apiCall;

    let second: any = []

    for (let i = 0; i < res.length; i++) {
        const scheduled = secondFilter.scheduled ? res[i].status == "scheduled" : false;
        const moved = secondFilter.moved ? res[i].status === "moved" : false;
        const canceled = secondFilter.canceled ? res[i].status === "cancelled" : false;
        const varsity = secondFilter.varsity ? res[i].teamLevel === "v" : false;
        const jv = secondFilter.jv ? res[i].teamLevel === "jv" : false;
        const boys = secondFilter.boys ? res[i].gender === "b" : false;
        const girls = secondFilter.girls ? res[i].gender === "g" : false;


        if ((scheduled || moved || canceled) && (varsity || jv) && (boys || girls) && (res[i].awayTeamName === name || res[i].homeTeamName == name)) {

            let color;
            if (res[i].status === "scheduled")
                color = '#78e388';
            else if (res[i].status === "moved")
                color = '#adadad';
            else if (res[i].status === 'cancelled')
                color = '#ff5757';
            else if (res[i].status === 'coachPending' || res[i].status === "assignorPending")
                color = '#fdff87';

            

            second.push({
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

    setSecond(second)

}

export const getScheudSecondFilter = (apiCall: any, setSecond: any, secondFilter: any, role: string) => {
    const res = apiCall;

    let second: any = []

    if ( role === 'ROLE_USER' ) {

        for (let i = 0; i < res.length; i++) {
            const scheduled = secondFilter.scheduled ? res[i].status == "scheduled" : false;
            const moved = secondFilter.moved ? res[i].status === "moved" : false;
            const canceled = secondFilter.canceled ? res[i].status === "cancelled" : false;
            const varsity = secondFilter.varsity ? res[i].teamLevel === "v" : false;
            const jv = secondFilter.jv ? res[i].teamLevel === "jv" : false;
            const boys = secondFilter.boys ? res[i].gender === "b" : false;
            const girls = secondFilter.girls ? res[i].gender === "g" : false;


            if ((scheduled || moved || canceled) && (varsity || jv) && (boys || girls)) {

                let color;
                if (res[i].status === "scheduled")
                    color = '#78e388';
                else if (res[i].status === "moved")
                    color = '#adadad';
                else if (res[i].status === 'cancelled')
                    color = '#ff5757';
                else if (res[i].status === 'coachPending' || res[i].status === "assignorPending")
                    color = '#fdff87';


                second.push({
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
    }
    
    else {
        for (let i = 0; i < res.length; i++) {
            const pending = secondFilter.pending ? res[i].status === 'assignorPending' : false;
            const scheduled = secondFilter.scheduled ? res[i].status == "scheduled" : false;
            const moved = secondFilter.moved ? res[i].status === "moved" : false;
            const canceled = secondFilter.canceled ? res[i].status === "cancelled" : false;
            const varsity = secondFilter.varsity ? res[i].teamLevel === "v" : false;
            const jv = secondFilter.jv ? res[i].teamLevel === "jv" : false;
            const boys = secondFilter.boys ? res[i].gender === "b" : false;
            const girls = secondFilter.girls ? res[i].gender === "g" : false;


            if ((scheduled || moved || canceled || pending) && (varsity || jv) && (boys || girls)) {

                let color;
                if (res[i].status === "scheduled")
                    color = '#78e388';
                else if (res[i].status === "moved")
                    color = '#adadad';
                else if (res[i].status === 'cancelled')
                    color = '#ff5757';
                else if (res[i].status === 'coachPending' || res[i].status === "assignorPending")
                    color = '#fdff87';


                second.push({
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
    }

    setSecond(second)

}


export { }; 