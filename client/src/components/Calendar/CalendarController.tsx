import React, { useState } from 'react';
import GameCalendar from './GameCalendar';
import CalendarModal from './CalendarModal';
import { Provider, useDispatch } from './Provider';

const CalendarController = () => {

    
    const dispatch = useDispatch();

    const [clickedGame, setClickedGame] = useState();


    return(
        <div>
            <Provider>
                <GameCalendar />
                <CalendarModal />
            </Provider>
        </div>
    );
}

export default CalendarController;