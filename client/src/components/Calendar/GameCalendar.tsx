import React, { useState, useEffect } from 'react';
import { useDispatch } from './Provider';
import '../../style/gameCalendar.css';
import Cal from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../style/gameCalendar.scss';
import { CSVLink } from 'react-csv';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { apiGetGames } from '../../utility/APIGameControl';
import { getCSVSchedule, getUserSecondFilter, getCoachSecondFilter, getScheudSecondFilter } from '../Games';
import { isBrowser, isMobile } from "react-device-detect";
import Button from '@material-ui/core/Button';
import { getCurrentUser } from '../../utility/APIUtility'
import { notification } from 'antd';


var csvData = '';

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

const openPastDateNotif = () => {
  notification.open({
    message: 'Date already passed',
    description: 'You cannot add a new game on a date which has already passed.'
  })
}


const GameCalendar = ({ filter, secondFilter, update, change }: any) => {

  const dispatch = useDispatch();
  const [events, setEvents] = useState('null');
  const [api, setApi] = useState("null");
  const [counter, setCounter] = useState(0);
  const [prevFilter, setPrev] = useState("Your Games");
  const [currentUser, setUser] = useState(user)
  const [csvData, setCsvData] = useState('null');

  const newDate = new Date;
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  /**
   * allows/disallows addition of game based on the day clicked vs blocked days
   * @param info from date on calendar clicked
   */
  const dayClick = (info: any) => {
    let clickedDate = info.dateStr.split("-");
    const currentDate = [year, month, day];
    let clickedPastDate = false;

    /**
     * determines if a past date was clicked
     */
    if (clickedDate[0] < currentDate[0]) {
      clickedPastDate = true;
    } else if (clickedDate[1] < currentDate[1]) {
      clickedPastDate = true;
    } else if (clickedDate[1] > currentDate[1]) {
      clickedPastDate = false;
    } else if (clickedDate[2] < currentDate[2]) {
      clickedPastDate = true;
    }

    if (clickedPastDate === true /** or if days are blocked by assignor */) {
      openPastDateNotif();
    } else {
      dispatch({ type: 'ADD_GAME', payload: info.dateStr })
    }

  }


  if (counter === 0) {
    getGames(setApi)
    getCurrentUser().then((response => { setUser(response) }))
    apiGetGames().then((response) => { getCSVSchedule(response, setCsvData); console.log(csvData) })


    if (api !== "null") {

      if (filter === "Scheduled") {
        getScheudSecondFilter(api, setEvents, secondFilter)
      }
      else if (filter === "Your Games" || filter === currentUser.schoolname) {
        if (currentUser.role.includes("USER")) {
          getUserSecondFilter(api, setEvents, currentUser.schoolname, secondFilter)
          //console.log("getCoachSchedule")
        }
        else {
          //TODO ADMIN STUFF
        }
      }
      else //for games of specific teams that are not the user
      {
        getCoachSecondFilter(api, setEvents, filter, secondFilter)
      }


      setPrev(filter);
      setCounter(counter + 1);
    }
  }

  useEffect(()=>{
    console.log("inside use effect")
    setCounter(0)
  },
    [secondFilter, update, change]
  )
  //apiGetGames().then((response) => { getScheduledGames(response, setCsvData); console.log(csvData) })
  return (
    <>
      <div className="game-cal">
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
          dateClick={(info) => dayClick(info)}
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
      <Button color="secondary"><CSVLink data={csvData} filename={"schedule.csv"} className="hiddenOnPhone" >Export Games</CSVLink></Button>
    </>

  );
}

export default GameCalendar;