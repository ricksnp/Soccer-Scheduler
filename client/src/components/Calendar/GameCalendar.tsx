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
    for(let i = 0; i < response.length; i++)
    {
      games.push({
        title: response[i].homeTeamName + " vs " + response[i].awayTeamName,
        start: response[i].date.replace(" ", "T"),
        location: response[i].location,
        teamLevel: response[i].teamLevel,
        gender: response[i].gender
      })
    }
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
          left: 'dayGridMonth,dayGridWeek,dayGridDay,today',
          center: 'title',
          right: 'prev next',
        }}
        footer={{
          center: 'prev next'
        }}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}  
        dateClick={ ( info ) => dispatch({ type: 'ADD_GAME', payload: info.dateStr }) }
        events={events}
        eventClick={ (calEvent) => dispatch({ type: 'VIEW_GAME', payload: [calEvent.event.title, calEvent.event.start, calEvent.event.extendedProps.location, calEvent.event.extendedProps.teamLevel, calEvent.event.extendedProps.gender]}) }
      />

    </div>


  );
}

export default GameCalendar;