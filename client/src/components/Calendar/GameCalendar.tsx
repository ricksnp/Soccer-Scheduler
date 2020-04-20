import React, { useState, useEffect } from 'react';
import { useDispatch } from './Provider';
import '../../style/gameCalendar.css';
import Cal from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../style/gameCalendar.scss';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { apiGetGames } from '../../utility/APIGameControl';
import { getScheduledGames, getTeamSchedule, getCoachSchedule } from '../Games';
import { isBrowser, isMobile } from "react-device-detect";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { getCurrentUser } from '../../utility/APIUtility'
import { setupMaster } from 'cluster';
import { notification } from 'antd';

interface Props {
  handleEventClick: Function
}

const getGames = ( setApi: any ) => {

  apiGetGames().then( response => {
    setApi( response );
  })

}

const user = {
  role: "USER_ROLE",
  schoolname: "West Monroe"
}

const openPastDateNotif = () => {
  notification.open({
      message: 'Date already passed',
      description: 'You cannot add a new game on a date which has already passed.'
  })
}


const GameCalendar = ( { filter }: any ) => {

  const dispatch = useDispatch();
  const [events, setEvents] = useState('null');
  const [api, setApi] = useState("null");
  const [counter, setCounter] = useState(0);
  const [prevFilter, setPrev] = useState("Your Games");
  const [currentUser, setUser] = useState(user)

  const newDate = new Date;
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const dayClick = ( info: any ) => {
    let clickedDate = info.dateStr.split("-");
    const currentDate = [ year, month, day ];

    let clickedPastDate = false;

    console.log(clickedDate)

    if ( clickedDate[0] < currentDate[0] ) {
      clickedPastDate = true;
    } else if ( clickedDate[1] < currentDate[1] ) {
      clickedPastDate = true;
    } else if ( clickedDate [1] > currentDate[1] ) {
      clickedPastDate = false;
    } else if ( clickedDate[2] < currentDate[2] ){
      clickedPastDate = true;
    }

    //@ts-ignore
    if ( clickedPastDate === true ) {
      openPastDateNotif();
    } else {
      dispatch({ type: 'ADD_GAME', payload: info.dateStr })
    }

  }


  if (counter === 0) {
    getGames(setApi)
    getCurrentUser().then((response=>{setUser(response)}))

    console.log("Calendar User: " + currentUser.role)

    if (api !== "null") {

      if (filter === "Scheduled") {
        getScheduledGames(api, setEvents)
      }
      else if (filter === "Your Games" || filter === currentUser.schoolname) {
        if (currentUser.role.includes("USER") ) {
          getCoachSchedule(api, setEvents, currentUser.schoolname)
          console.log("getCoachSchedule")
        }
        else if(filter === "Master Schedule")
        {

        }
        else {
          //TODO ADMIN STUFF
        }
      }
      else //for games of specific teams that is not the user
      {
        getTeamSchedule(api, setEvents, filter)
      }


      setPrev(filter);
      setCounter(counter + 1);
    }
  }


  return (
    <>
      <div className="game-cal">
        {console.log(isBrowser)}
        <Cal
          eventLimit={true}
          header={isBrowser ?
            {
              left: 'dayGridMonth,dayGridWeek,dayGridDay',
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
                left: ''
              }
              :
              {}
          }
          views={{
            dayGridFiveDay: {
              type: 'dayGridWeek',
              duration: { days: 5 },
              buttonText: '5-day',
              eventLimit: 10
            },
            dayGridMonth: {
              eventLimit: 3
            }
          }}
          defaultView={isMobile ? "dayGridFiveDay" : "dayGridMonth"}
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={ (info) => dayClick(info) }
          events={events}
          eventClick={(calEvent) => dispatch({ type: 'VIEW_GAME', payload: [calEvent.event.title, calEvent.event.start, calEvent.event.extendedProps.location, calEvent.event.extendedProps.teamLevel, calEvent.event.extendedProps.gender, calEvent.event.extendedProps.home, calEvent.event.extendedProps.away, calEvent.event.extendedProps.status, calEvent.event.extendedProps.id] })}
        />

        {//Conditional rendering with filter hook is used to force rerender when state changes
          filter === "Your Games" ?
            <>{counter !== 0 && prevFilter !== filter && setCounter(0)}</>
            :
            <>{counter !== 0 && prevFilter !== filter && setCounter(0)}</>
        }
      </div>
      <Button variant="contained" color="primary" className="hiddenOnPhone">Export CSV</Button>
    </>
  );
}

export default GameCalendar;