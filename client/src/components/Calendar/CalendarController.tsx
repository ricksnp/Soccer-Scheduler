import React from 'react';
import GameCalendar from './GameCalendar';
import AddGame from './AddGame';
import { Provider } from './Provider';

const CalendarController = () => {


    return(
        <div>
            <Provider>
                <GameCalendar  />
                <AddGame  />
            </Provider>
        </div>
    );
}

export default CalendarController;