import React, { useState, useEffect } from 'react';
import { useDispatch } from './Provider';
import '../../style/gameCalendar.css';
import Cal from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../style/gameCalendar.scss';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { apiGetGames } from '../../utility/APIGameControl';
import { getScheduledGames, getTeamSchedule, getCoachSchedule } from '../Games';
import {isBrowser, isMobile} from "react-device-detect";


interface Props {
  handleEventClick: Function
}

const getGames = (setApi: any) => {

  apiGetGames().then(response =>{
   setApi(response);
})

}

const user = {
  role: "USER_ROLE",
  team: "West Monroe"
}


const GameCalendar = ({filter}:any) => {

  const dispatch = useDispatch();
  const [events, setEvents] = useState('null');
  const [api, setApi] = useState("null");
  const [counter, setCounter] = useState(0);
  const [prevFilter,setPrev] = useState("Your Games");



  if(counter == 0)
  { 
    getGames(setApi)

    if(api != "null")
    {

      if(filter == "Scheduled")
      {
        getScheduledGames(api, setEvents)
        console.log("getScheduledGames")
      }
      else if(filter == "Your Games" || filter == user.team)
      {
        if(user.role == "USER_ROLE")
        {
          getCoachSchedule(api, setEvents, user.team)
          console.log("getCoachSchedule")
        }
        else
        {
          //TODO ADMIN STUFF
        }
      }
      else //for games of specific teams that is not the suer
      {
        getTeamSchedule(api,setEvents, filter)
        console.log("getTeamSchedule")
      }


    setPrev(filter);
    setCounter(counter + 1);
    }
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
            left:''
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
        filter == "Your Games" ?
        <>{counter != 0 && prevFilter != filter && setCounter(0)}</>
        :
        <>{counter != 0 && prevFilter != filter && setCounter(0)}</>
      }

    </div>


  );
}

export default GameCalendar;