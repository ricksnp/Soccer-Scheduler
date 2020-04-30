import React, { useState } from 'react';
import GameCalendar from './GameCalendar';
import CalendarModal from './CalendarModal';
import Filter from './Filter';
import { Provider } from './Provider';
import SecondFilter from './SecondFilter'

const secondObj = {
    varsity: true,
    jv: true,
    boys: true,
    girls: true,
    canceled: true,
    moved: true,
    scheduled: true,
    pending: true
}

//CalendarController controls all aspects of the control,
// it returns the Provider, GameCalendar, and Calendar Modal
const CalendarController = (user: any, filteredBlocked: any) => {

    //intital state must be "Scheduled" or else everything breaks
    const [filter, setFilter] = useState("Your Games")
    const [counter, setCounter] = useState(0)
    const [thisUser, setThis] = useState(user.user)
    const [secondFilter, setSecond] = useState(secondObj)
    const [onUpdate, setUpdate] = useState(false)
    const [change, setChange] = useState(0)
    const userRole = user.user.role

    if((userRole === "ROLE_ASSIGNOR" || userRole === "ROLE_ADMIN") && counter === 0)
    {
        setFilter("Scheduled")
        setCounter(counter + 1)
    }

    const secondChange = (type: string) =>
    {
        const filter = {...secondFilter}

        console.log("New Filter: "  + JSON.stringify(filter))

        let newObj = {
            varsity: filter.varsity,
            jv: filter.jv,
            boys: filter.boys,
            girls: filter.girls,
            canceled: filter.canceled,
            moved: filter.moved,
            scheduled: filter.scheduled,
            pending: filter.pending
        };


        if(type === "v")
        {
            if(filter.varsity){newObj.varsity = false;}
            else{newObj.varsity = true;}
        }
        else if(type === "jv")
        {
            if(filter.jv){newObj.jv = false;}
            else{ newObj.jv = true; }
        }
        else if(type === "b")
        {
            if(filter.boys){newObj.boys = false;}
            else{newObj.boys = true;}
        }
        else if(type === "g")
        {
            if(filter.girls){newObj.girls = false;}
            else{newObj.girls = true;}
        }

        else if(type === "s")
        {
            if(filter.scheduled){newObj.scheduled = false}
            else(newObj.scheduled = true)
        }
        else if(type === "p")
        {
            if(filter.pending){newObj.pending = false}
            else(newObj.pending = true)
        }
        else if(type === "c")
        {
            if(filter.canceled){newObj.canceled = false}
            else(newObj.canceled = true)
        }
        else if(type === "m")
        {
            if(filter.moved){newObj.moved = false}
            else(newObj.moved = true)
        }

        console.log("NewObj: " + JSON.stringify(newObj))
        setSecond(newObj)
    }

    return (
        <>
        {console.log("Filter In Calendar Controller: " + JSON.stringify(secondFilter))}
            <Provider>
                <Filter setFilter={setFilter} userRole={userRole} />
                <SecondFilter secondFilter={secondFilter} setSecond={setSecond} secondChange={secondChange}/>
                <GameCalendar change={change} update={onUpdate} filter={filter} user={user} secondFilter={secondFilter} filteredBlocked={filteredBlocked}/>
                <CalendarModal change={change} setChange={setChange} setUpdate={setUpdate} onUpdate={onUpdate} user={user.user} school={user.schoolname} />
            </Provider>
        </>
    );
}

export default CalendarController;