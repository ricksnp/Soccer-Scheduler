import React, {useState, useEffect} from 'react';
import { useDispatch, getGames } from './Provider';
import '../../style/gameCalendar.css';
import Cal from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../style/gameCalendar.scss';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick


interface Props {
  handleEventClick: Function
}

//date with time



const GameCalendar = (  ) => {

  const dispatch = useDispatch();

  
  return(
    <div className="game-cal">
      <Cal 
        header={{ 
          left: 'dayGridMonth,dayGridWeek,today',
          center: 'title',
          right: 'prev next'
        }}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}  
        dateClick={ ( info ) => dispatch({ type: 'ADD_GAME', payload: info.dateStr }) }
        events={getGames()}
        eventClick={ (calEvent) => dispatch({ type: 'VIEW_GAME', payload: [calEvent.event.title, calEvent.event.start]}) }
      />

    </div>


  );
}

export default GameCalendar;