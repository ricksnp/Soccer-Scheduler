import React, { useState } from 'react';
import GameCalendar from './GameCalendar';
import CalendarModal from './CalendarModal';
import Filter from './Filter';
import { Provider } from './Provider';
import styled from 'styled-components';


const Scheduled = styled.span`background: #78e388`;

const Pending = styled.span`background: #fdff87`;

const Cancelled = styled.span`background: #ff5757`;

const Moved = styled.span`background: #adadad`;



//CalendarController controls all aspects of the control,
// it returns the Provider, GameCalendar, and Calendar Modal
const CalendarController = (user: any) => {

    //intital state must be "Scheduled" or else everything breaks
    const [filter, setFilter] = useState("Your Games")

    console.log("CalendarController: "+  JSON.stringify(user))
    return (
        <>
            <Provider>
                <Filter setFilter={setFilter} />
                <div className="inline-bloccc">
                    <Scheduled className="game-status-tab">Scheduled Game</Scheduled>
                    <Pending className="game-status-tab">Pending Game</Pending>
                    <Cancelled className="game-status-tab">Cancelled Game</Cancelled>
                    <Moved className="game-status-tab">Moved Game</Moved>
                </div>

                <GameCalendar filter={filter} user={user} />

                <CalendarModal />


            </Provider>
        </>
    );
}

export default CalendarController;