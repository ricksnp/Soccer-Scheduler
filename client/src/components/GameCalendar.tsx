import React, { useState } from 'react';
import  {Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from "react-bootstrap/Modal";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../style/gameCalendar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Cal from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../style/gameCalendar.scss';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick




const localizer = momentLocalizer(moment);

const GameCalendar = () => {

  const [addGame, setAddGame] = useState(false);
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

  const handleClick = (e: any) =>{
    alert("clicked!");
  }

  return(
      /**<div className="game-cal">
          <Modal show={false}>
            dfsdfsdf
          </Modal>

          <Calendar 
            localizer={localizer}
            events={events}
            selectable
          />
      </div>*/
    <div className="game-cal">
      <Modal show={false}>
            dfsdfsdf
          </Modal>
      <Cal 
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}  
        dateClick={handleClick}
        events={[
          { title: 'event 1', date: '2020-04-01' },
          { title: 'event 2', date: '2020-04-02' }
        ]}
      />
    </div>

  );
}

export default GameCalendar;