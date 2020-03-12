import React, { useState } from 'react';
import GameCalendar from './GameCalendar';
import CalendarModal from './CalendarModal';
import Filter from './Filter';
import { Provider, useDispatch } from './Provider';
import styled from 'styled-components';

const Box = styled.span`
float: left;
height: 20px;
width: 20px;
margin-bottom: 15px;
border: 1px solid black;
background: #1976d2
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
                <div><Box></Box>=Pending Game</div>
                <GameCalendar filter={filter} />
                <CalendarModal />
            </Provider>
        </>
    );
}

export default CalendarController;