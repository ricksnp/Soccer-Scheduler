import React, {useState, createContext, useReducer, useContext, useEffect}from 'react';
import {apiGetGames} from '../../utility/APIGameControl';
import { ReactComponent } from '*.svg';
import { render } from '@testing-library/react';


//const [res, setRes] = useState();

async function getGames (getResponse: any) {

        await apiGetGames().then(response =>{
            getResponse(response);
        })


}

const initialState = {
    name:"",
    response: ""

}

type Action =
  | { type: 'ScheduledGames'}
  | { type: 'CoachSchedule'}
  | { type: 'AdminPending' }
  | { type: 'CoachPending'}
  | { type: 'GetEdit'}

type State = typeof initialState;

const reducer = (state: State, action: Action) => {

    switch(action.type){
        case 'ScheduledGames':
            console.log("HERE!!!!");
            return{
                response: getScheduledGames()
            };
        case 'CoachSchedule':
            return{
                response: getCoachSchedule(initialState.name)
            };
        case 'AdminPending':
            return{
                response: getCoachPending(initialState.name)
            };
        case 'CoachPending':
            return{
                response: getCoachPending(initialState.name)
            }
            
        default: return state;
    };
};


const stateCtx = createContext(initialState);
const dispatchCtx = createContext((() => 0) as React.Dispatch<Action>);


export const Games:React.ComponentType= ({children}, games) =>{


    initialState.name = "West Monroe";

    console.log("APP.js GAMES: " + JSON.stringify(games))

    const [response, getResponse] = useState("NULL");
    const [counter, setCounter] = useState(0);

    if(counter === 0)
    {
        getGames(getResponse)
        setCounter(counter + 1)
    
    }

    //@ts-ignore
    const [state, dispatch] = useReducer(reducer, initialState);

    state.response = JSON.stringify(games);
    initialState.response = JSON.stringify(games);

    console.log("GAMES RESPONSE: " + state.response)

        return(

        <dispatchCtx.Provider value={dispatch}>
        <stateCtx.Provider value={state}>
            {children}
        </stateCtx.Provider>
        </dispatchCtx.Provider>
    
    );
}

export const useDispatch = () => {
    return useContext(dispatchCtx);
  };
  
  export const useGlobalState = <K extends keyof State>(property: K) => {
    const state = useContext(stateCtx);
    return state[property]; // only one depth selector for comparison
  };


/*
getScheduledGames reads through the JSON data in the "getgames" API call
    and creates an array compatabile with full calendar
@param setEvents is a hook function to be set to the array
*/
export const getScheduledGames = () =>{

const res: any = initialState.response;

console.log("RES!!!!!!!!!!!!: " + res)

let games:any = [];

    console.log("INSIDE SCHEDULEDGAMESFUNCTION")

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

    return(games);

}

/*
getCoachSchedule reads through the JSON data in the "getgames" API call
    and creates an array of objects to be used by the CalendarFilter or 
    the Coaches Scheduling Page
@param setSchedule hook function to be set to the array
@param name the coaches school name
*/
export const getCoachSchedule = (name: any) =>{

    const res: any = initialState.response;
    
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
    
    return(games);
    
}
    


/*
getCoachPending reads through the JSON data in the "getgames" API call
    and creates an array of objects to be read on the Coaches scheduling 
    pages to show all of their pending games
@param setPending hook function to be set to the array
@param name the name of the coaches team
*/
export const getCoachPending = (name:String) =>{

    const res: any = initialState.response;

    console.log("hometeamename " + name);

    console.log("INitial res" + res);

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
                status: res[i].status,
                gender: res[i].gender
            })
        }
    }
    console.log("getCoachPending return: " + JSON.stringify(pending))
    return(pending);

}


/*
getAdminPending reads through the JSON data in the "getgames" API call
    and creates an array of objects to be read on the Admin scheduling 
    pages to show all the games that need their approval
@param setAssignorPending hook function to be set to the array
*/
export const getAdminPending = () =>{

    const res: any = initialState.response;

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
    
    return(pending);

}


/*
getEdit reads through the JSON data in the "getgames" API call
    and creates an array of objects to be read on the Coach's scheduling 
    pages to show all the edited games that need their approval
@param setEdit hook function to be set to the array
@param name the name of the coaches team
*/
export const getEdit = (name:String) =>{

    const res: any = initialState.response;
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
    
    return(edited);

}




export {}; 