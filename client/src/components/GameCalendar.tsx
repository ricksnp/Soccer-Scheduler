import React, { useState } from 'react';
import  {Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../style/gameCalendar.css'

const localizer = momentLocalizer(moment);

const GameCalendar = () => {

  const [events, setEvents] = useState([
    {
      'title': 'All Day Event very long title',
      'start': new Date(2020, 3, 0),
      'end': new Date(2020, 3, 1),
      'allDay': true,
    },
    {
      'title': 'Long Event',
      'start': new Date(2020, 3, 7),
      'end': new Date(2020, 3, 10)
    },
  
    {
      'title': 'DTS STARTS',
      'start': new Date(2020, 2, 13, 0, 0, 0),
      'end': new Date(2020, 2, 20, 0, 0, 0)
    }
  ]);

  return(
      <div className="game-cal">
          <Calendar 
            localizer={localizer}
            events={events}
          />
      </div>
  );
}

export default GameCalendar;