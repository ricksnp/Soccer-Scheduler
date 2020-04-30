import React, { useState } from 'react';
import {postGames, apiGetGames} from '../../utility/APIGameControl';


const { createContext, useContext, useReducer } = React;

const initialState = {
  showEditGame: false,
  clickedGame: []
};

type State = typeof initialState;

type Action =
  | { type: 'EDIT_GAME', payload: any }
  | { type: 'CLOSE_EDIT_GAME', payload: any }

const reducer = (state: State, action: Action) => {


  switch (action.type) {
    case 'EDIT_GAME': return {
      showEditGame: true,
      clickedGame: action.payload
    }
    case 'CLOSE_EDIT_GAME': return {
      showEditGame: false,
      clickedGame: action.payload
    }
    default: return state;
  }
};

const stateCtx = createContext(initialState);
const dispatchCtx = createContext((() => 0) as React.Dispatch<Action>);

export const GMProvider: React.ComponentType = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <dispatchCtx.Provider value={dispatch}>
        <stateCtx.Provider value={state}>
          {children}
        </stateCtx.Provider>
      </dispatchCtx.Provider>
    );
  };

  export const useDispatch = () => {
    return useContext(dispatchCtx);
  };
  
  export const useGlobalState = <K extends keyof State>(property: K) => {
    const state = useContext(stateCtx);
    return state[property]; // only one depth selector for comparison
  };


  //getGames returns the json file of game information
  export const getGames = () => {


    if(apiGetGames() == null)
    {
      console.log("if: "+ apiGetGames());
      return "";
    }
    else{
      apiGetGames().then(games=>{
        console.log("HERE" + games);

        const newGame = []
        
        newGame[0] =
        {
          title: games.homeTeamName + " vs " + games.awayTeamName,
          start: games.date.replace(" ", "T")
        
      } 

        // console.log("NewGame: " +newGame.title);
        // console.log("NewGame Date: " + newGame.start);
        console.log(JSON.stringify(newGame));
        return newGame;
      })
    }

}