import React from 'react';
import { useGlobalState } from './Provider';

interface Props {
    event: any
}

const EventDisplay = ( props: Props ) => {
    
    function setStatus() {
        if (props.event[7] === "coachPending" || props.event[7] === "awayEdit" )
            return "Pending Approval";
        else if ( props.event[7] === "scheduled" )
            return "Scheduled";
        else if ( props.event[7] === "moved" )
            return "Moved";
        else if ( props.event[7] === "cancelled" )
            return "Cancelled";
        else if(props.event[7] === "assignorPending")
            return "Assignor Pending"
        else if ( props.event[7].includes("Edit") ) {
            return 'Pending Approval'
        }
        else
            return "Not Covered"
    }

    const status: string = setStatus();


    return(
        <div className="view-event-container">
            <div className="view-event-item title-item">Title: {props.event[0].toString()}</div>
            <div>Home: {props.event[5]}</div>
            <div>Away: {props.event[6]}</div>
            <div>Time: {props.event[1].toString()}</div>
            <div>Location: {props.event[2].toString()}</div>
            <div>Level: {props.event[3].toString()}</div>
            <div>gender: {props.event[4].toString()}</div>
            <div>Status: {status}</div>
        </div>
    );
}

export default EventDisplay;