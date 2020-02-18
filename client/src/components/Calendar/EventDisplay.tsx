import React from 'react';
import { useGlobalState } from './Provider';

interface Props {
    event: any
}

const EventDisplay = ( props: Props ) => {
    

    return(
        <div className="view-event-container">
            <div className="view-event-item title-item">Title: {props.event[0].toString()}</div>
            <div className="view-event-item time-item">Time: {props.event[1].toString()}</div>
            <div className="view-event-item location-item">Location: {props.event[2].toString()}</div>
            <div className="view-event-item level-item">Level: {props.event[3].toString()}</div>
            <div className="view-event-item team-item">Team: {props.event[4].toString()} </div>
        </div>
    );
}

export default EventDisplay;