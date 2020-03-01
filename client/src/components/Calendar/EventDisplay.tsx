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
        </div>
    );
}

export default EventDisplay;