import React, { useState } from 'react';
import GameCalendar from './GameCalendar';
import CalendarModal from './CalendarModal';
import Filter from './Filter';
import { Provider, useDispatch } from './Provider';
import styled from 'styled-components';


const Scheduled = styled.span`
float: left;
color: black;
font-weight: bolder;
padding: 2px;
margin-right: 5px;
border-radius: 5px;
background: #78e388
`;

const Pending = styled.span`
float: left;
color: black;
font-weight: bolder;
padding: 2px;
margin-right: 5px;
border-radius: 5px;
background: #fdff87
`;

const Cancelled = styled.span`
float: left;
color: black;
font-weight: bolder;
padding: 2px;
margin-right: 5px;
border-radius: 5px;
background: #ff5757
`;

const Moved = styled.span`
float: left;
color: black;
font-weight: bolder;
padding: 2px;
margin-right: 5px;
border-radius: 5px;
background: #adadad
`;



//CalendarController controls all aspects of the control,
// it returns the Provider, GameCalendar, and Calendar Modal
const CalendarController = () => {

    //intital state must be "Scheduled" or else everything breaks
    const [filter, setFilter] = useState("Your Games")

    return (
        <>
            <Provider>
                <Filter setFilter={setFilter}/>

                <Scheduled>Scheduled Game</Scheduled>
                <Pending>Pending Game</Pending> 
                <Cancelled>Cancelled Game</Cancelled>
                <Moved>Moved Game</Moved>
                

                <GameCalendar filter={filter} />

                <CalendarModal />
            </Provider>
        </>
    );
}

export default CalendarController;