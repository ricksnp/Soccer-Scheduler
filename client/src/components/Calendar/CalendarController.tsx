import React from 'react';
import GameCalendar from './GameCalendar';
import CalendarModal from './CalendarModal';
import { Provider } from './Provider';

const CalendarController = () => {


    return(
        <div>
            <Provider>
                <GameCalendar  />
                <CalendarModal />
            </Provider>
        </div>
    );
}

export default CalendarController;