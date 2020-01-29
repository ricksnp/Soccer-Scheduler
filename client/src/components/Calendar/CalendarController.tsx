import React from 'react';
import GameCalendar from './GameCalendar';
import AddGame from './AddGame';
import { Provider } from './Provider';
import ViewGame from './ViewGame';

const CalendarController = () => {

    return(
        <div>
            <Provider>
                <GameCalendar  />
                <AddGame />
                <ViewGame />
            </Provider>
        </div>
    );
}

export default CalendarController;