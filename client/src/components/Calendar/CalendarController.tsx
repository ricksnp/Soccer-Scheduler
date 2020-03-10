import React, { useState } from 'react';
import GameCalendar from './GameCalendar';
import CalendarModal from './CalendarModal';
import Filter from './Filter';
import { Provider, useDispatch } from './Provider';



//CalendarController controls all aspects of the control,
// it returns the Provider, GameCalendar, and Calendar Modal
const CalendarController = (loggedin: any) => {


    //const dispatch = useDispatch();

    //const [clickedGame, setClickedGame] = useState();


    return (
        <>
            <Provider>
                <Filter/>
                <GameCalendar />
                <CalendarModal />
            </Provider>
        </>
    );
}

export default CalendarController;