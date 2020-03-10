import React, {useState}from 'react';
import {apiGetGames} from '../utility/APIGameControl';


//const [res, setRes] = useState();

const apiCall= () => {

    let x:any  = [];
    apiGetGames().then(response =>{
        x = response;
    })

    return x;
}


/*
getScheduledGames reads through the JSON data in the "getgames" API call
    and creates an array compatabile with full calendar
@param setEvents is a hook function to be set to the array
*/
export const getScheduledGames = (setEvents: any) =>{

const res = apiCall();

let games:any = [];

for(let i = 0; i < res.length; i++)
{
    if(res[i].status == "scheduled" || res[i].status == "moved" || res[i].status == "cancelled")
    {
        games.push({
            title: res[i].homeTeamName + " vs " + res[i].awayTeamName,
            start: res[i].date.replace(" ", "T"),
            location: res[i].location,
            teamLevel: res[i].teamLevel,
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
export const getCoachSchedule = (setSchedule: any,name:any) =>{

    const res = apiCall();
    
    let games:any = [];
    
    for(let i = 0; i < res.length; i++)
    {
        if((res[i].status == "scheduled" || res[i].status == "moved" || res[i].status == "cancelled") && 
            (res[i].homeTeamName == name || res[i].awayTeamName == name))
        {
            games.push({
                title: res[i].homeTeamName + " vs " + res[i].awayTeamName,
                start: res[i].date.replace(" ", "T"),
                location: res[i].location,
                teamLevel: res[i].teamLevel,
                gender: res[i].gender,
                status: res[i].status
            })
        }
    }
    
    setSchedule(games);
    
}
    


/*
getCoachPending reads through the JSON data in the "getgames" API call
    and creates an array of objects to be read on the Coaches scheduling 
    pages to show all of their pending games
@param setPending hook function to be set to the array
@param name the name of the coaches team
*/
export const getCoachPending = (setPending:any, name: any) =>{
    const res = apiCall();

    let pending = [];

    for(let i = 0; i < res.length; i++)
    {
        if(res[i].status == "coachPending" && res[i].homeTeamName.equals(name))
        {
            pending.push({
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
    
    setPending(pending);

}


/*
getAdminPending reads through the JSON data in the "getgames" API call
    and creates an array of objects to be read on the Admin scheduling 
    pages to show all the games that need their approval
@param setAssignorPending hook function to be set to the array
*/
export const getAdminPending = (setAssignorPending:any) =>{

    const res = apiCall();

    let pending = [];

    for(let i = 0; i < res.length; i++)
    {
        if(res[i].status == "assignorPending")
        {
            pending.push({
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
    
    setAssignorPending(pending);

}


/*
getEdit reads through the JSON data in the "getgames" API call
    and creates an array of objects to be read on the Coach's scheduling 
    pages to show all the edited games that need their approval
@param setEdit hook function to be set to the array
@param name the name of the coaches team
*/
export const getEdit = (setEdit:any, name:any) =>{

    const res = apiCall();

    let edited = [];

    for(let i = 0; i < res.length; i++)
    {
        if(res[i].status == "awayEdit" && res[i].homeTeamName.equals(name))
        {
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
        else if(res[i].status == "awayEdit" && res[i].awayTeamName.equals(name))
        {
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




export {}; 