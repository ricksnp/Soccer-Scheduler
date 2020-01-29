import React from 'react';
import { useDispatch } from './Provider';
import '../../style/gameCalendar.css';
import Cal from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../style/gameCalendar.scss';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick




//const localizer = momentLocalizer(moment);


const GameCalendar = (  ) => {

  const dispatch = useDispatch();

  return(
    <div className="game-cal">
      <Cal 
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}  
        dateClick={ () => dispatch({ type: 'ADD_GAME' }) }
        events={[
          { title: 'event 1', date: '2020-04-01' },
          { title: 'event 2', date: '2020-04-02' }
        ]}
      />
      
    </div>
    

  );
}

export default GameCalendar;