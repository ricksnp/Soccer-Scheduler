import React, { useState } from 'react';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import '../style/gameCalendar.scss';



const GameCalendar = () => {

  const [events, setEvents] = useState();

  return(
      <div className="game-cal">
          <Calendar 
            defaultView="dayGridMonth"  
            header={{
              left: 'prev, next, today',
              center: 'title',
              right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
            }}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          />
      </div>
  );
}

export default GameCalendar;