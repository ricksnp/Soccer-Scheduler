import React from 'react';
import { useGlobalState } from './Provider';

interface Props {
    event: any
}

const EventDisplay = ( props: Props ) => {
    

    //const events = useGlobalState('clickedGame');


    return(
        <div className="view-event-container">
            <div className="view-event-item title-item">Title: {props.event[0].toString()}</div>
            <div>Time: {props.event[1].toString()}</div>
            <div>Location: {props.event[2].toString()}</div>
            <div>Level: {props.event[3].toString()}</div>
            <div>gender: {props.event[4].toString()}</div>
        </div>
    );
}

export default EventDisplay;