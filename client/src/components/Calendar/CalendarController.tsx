import React, { useState } from 'react';
import GameCalendar from './GameCalendar';
import CalendarModal from './CalendarModal';
import Filter from './Filter';
import { Provider, useDispatch } from './Provider';



//CalendarController controls all aspects of the control,
// it returns the Provider, GameCalendar, and Calendar Modal
const CalendarController = () => {

    //intital state must be "Scheduled" or else everything breaks
    const [filter, setFilter] = useState("Scheduled")

    return (
        <>
            <Provider>
                <Filter setFilter={setFilter}/>
                <GameCalendar filter={filter} />
                <CalendarModal />
            </Provider>
        </>
    );
}

export default CalendarController;