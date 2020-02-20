import React, {useState, useEffect} from 'react';
import { useDispatch } from './Provider';
import '../../style/gameCalendar.css';
import Cal from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../style/gameCalendar.scss';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { apiGetGames } from '../../utility/APIGameControl';


interface Props {
  handleEventClick: Function
}

function getGames(setEvents: any){

  apiGetGames().then(response =>{
    let games:any = []
    
    games.push({
      title: response.homeTeamName + " vs " + response.awayTeamName,
      start: response.date.replace(" ", "T"),
      location: response.location,
      teamLevel: response.teamLevel,
      gender: response.gender
    })

    setEvents(games);
 })

}


const GameCalendar = (  ) => {

  const dispatch = useDispatch();
  const [events, setEvents] = useState();
  const [counter, setCounter] = useState(0);

  if(counter <= 0)
  {
    setCounter(counter + 1);
    getGames(setEvents);
  }


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
        events={events}
        eventClick={ (calEvent) => dispatch({ type: 'VIEW_GAME', payload: [calEvent.event.title, calEvent.event.start]}) }
      />

    </div>


  );
}

export default GameCalendar;