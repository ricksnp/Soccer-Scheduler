import React, { useState, useEffect } from 'react';
import { useDispatch } from './Provider';
import '../../style/gameCalendar.css';
import Cal from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../style/gameCalendar.scss';
import { CSVLink, CSVDownload } from 'react-csv';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { apiGetGames } from '../../utility/APIGameControl';
import { getScheduledGames, getTeamSchedule, getCoachSchedule } from '../Games';
import { isBrowser, isMobile } from "react-device-detect";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { getCurrentUser } from '../../utility/APIUtility'
import { setupMaster } from 'cluster';


var csvData = '';
var headers: import("react-csv/components/CommonPropTypes").LabelKeyObject[] | string[] | undefined = [];

interface Props {
  handleEventClick: Function
}

const getGames = (setApi: any) => {

  apiGetGames().then(response => {
    setApi(response);
  })

}

const user = {
  role: "USER_ROLE",
  schoolname: "West Monroe"
}


const GameCalendar = ({ filter }: any) => {

  const dispatch = useDispatch();
  const [events, setEvents] = useState('null');
  const [api, setApi] = useState("null");
  const [counter, setCounter] = useState(0);
  const [prevFilter, setPrev] = useState("Your Games");
  const [currentUser, setUser] = useState(user)


  if (counter === 0) {
    getGames(setApi)
    getCurrentUser().then((response => { setUser(response) }))

    console.log("Calendar User: " + currentUser.role)

    if (api !== "null") {

      if (filter === "Scheduled") {
        getScheduledGames(api, setEvents)
      }
      else if (filter === "Your Games" || filter === currentUser.schoolname) {
        if (currentUser.role.includes("USER")) {
          getCoachSchedule(api, setEvents, currentUser.schoolname)
          console.log("getCoachSchedule")
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
  apiGetGames().then((response) => { csvData = response; })
  console.log("HI" + JSON.stringify(csvData[0]));
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
          dateClick={(info) => dispatch({ type: 'ADD_GAME', payload: info.dateStr })}
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
      <CSVLink data={csvData}>Download me</CSVLink>;
    </>

  );
}

export default GameCalendar;