import React, { useState, useEffect } from 'react';
import { useDispatch } from './Provider';
import '../../style/gameCalendar.css';
import Cal from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../style/gameCalendar.scss';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { apiGetGames } from '../../utility/APIGameControl';
import { getScheduledGames, getCoachPending } from '../Games';
import {isBrowser, isMobile} from "react-device-detect";


interface Props {
  handleEventClick: Function
}

const getGames = (setApi: any) => {

  apiGetGames().then(response =>{
   setApi(response);
})

}

const GameCalendar = ({filter}:any) => {

  const dispatch = useDispatch();
  const [events, setEvents] = useState('null');
  const [api, setApi] = useState("null");
  const [counter, setCounter] = useState(0);
  const [prevFilter,setPrev] = useState("All");

  if(counter == 0)
  { 
    getGames(setApi)

    if(api != "null")
    {
      if(filter === "All")
      {
        getScheduledGames(api, setEvents);
        console.log("All Events=" + events)
        setPrev(filter);
        
      }
      else
      {
        getCoachPending(api,setEvents,filter)
        console.log("Pending Events=" + events)
        setPrev(filter);
      }
    }
      setCounter(counter + 1);
  }


  return (
    <div className="game-cal">
      {console.log(isBrowser)}
      <Cal
        header={isBrowser ? 
          {
            left: 'dayGridMonth,dayGridFiveDay,dayGridDay',
            center: 'title',
            right: 'prev next, today',
          }

          : 
          {
            center: 'dayGridMonth,dayGridFiveDay,dayGridDay     today',
            left: 'title',
            right: ''
          }
        }


        footer={
          isMobile ? 
          {
            center: 'prev next',
            left:'today'
          } 
          : 
          {}
        }
        views={{
          dayGridFiveDay: {
            type: 'dayGridWeek',
            duration: { days: 5 },
            buttonText: '5-day'
          }
        }}
        defaultView={isMobile ? "dayGridFiveDay": "dayGridMonth"}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={(info) => dispatch({ type: 'ADD_GAME', payload: info.dateStr })}
        events={events}
        eventClick={(calEvent) => dispatch({ type: 'VIEW_GAME', payload: [calEvent.event.title, calEvent.event.start, calEvent.event.extendedProps.location, calEvent.event.extendedProps.teamLevel, calEvent.event.extendedProps.gender] })}
      />

      {//Conditional rendering with filter hook is used to force rerender when state changes
        filter == "All" ?
        <>{counter != 0 && prevFilter != filter && setCounter(0)}</>
        :
        <>{counter != 0 && prevFilter != filter && setCounter(0)}</>
      }

    </div>


  );
}

export default GameCalendar;