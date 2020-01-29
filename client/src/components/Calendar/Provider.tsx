import React from 'react';


const { createContext, useContext, useReducer } = React;

const initialState = {
  showAddGame: false
};

type State = typeof initialState;

type Action =
  | { type: 'ADD_GAME' }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_GAME': return {
      showAddGame: true
    };
    default: return state;
  }
};

const stateCtx = createContext(initialState);
const dispatchCtx = createContext((() => 0) as React.Dispatch<Action>);

export const Provider: React.ComponentType = ({ children }) => {
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