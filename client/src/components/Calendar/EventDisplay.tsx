import React from 'react';
import './EventDisplay.css'

interface Props {
    event: any
    school: any
}

const formatTime = ( dateTimeStr: string ) => {
    const hr12 = ( timeStr: string ) => {
        let splitTime = timeStr.split(':');
        if ( parseInt( splitTime[0], 10 ) > 12 ){
            splitTime[0] = JSON.stringify( parseInt( splitTime[0], 10 ) - 12 );
            splitTime.push('pm');
        } else {
            splitTime.push('am');
        }
        
        const formatTimeStr = splitTime[0] + ':' + splitTime[1] + ' ' + splitTime[3];

        return formatTimeStr;
    }

    const timeStrArray = dateTimeStr.split(' ');
    const dateStr = timeStrArray[0] + ' ' + timeStrArray[1] + ' ' + timeStrArray[2] + ', ' +
                    timeStrArray[3] + ' ';
    const formattedTime = dateStr + hr12(timeStrArray[4]);

    return formattedTime;

}

const EventDisplay = ( props: Props ) => {
    
    let mySchool = props.school;
    let home = props.event[5];
    let away = props.event[6];

    function setStatus() {
        if ( props.event[7] === "coachPending" &&  mySchool === home )
            return "Pending opponent approval";
        else if ( props.event[7] === "coachPending" &&  mySchool === away )
            return "Pending your approval"
        else if ( props.event[7] === "scheduled" )
            return "Scheduled";
        else if ( props.event[7] === "moved" )
            return "Moved";
        else if ( props.event[7] === "cancelled" )
            return "Cancelled";
        else if(props.event[7] === "assignorPending")
            return "Pending assignor approval"
        else if ( (props.event[7].includes("away") && mySchool === home) || //if i'm home and away edited, pending my approval OR vice vera
                    (props.event[7].includes("home") && mySchool === away ) ) {
            return 'Edited by opponent, pending your approval'
        }
        else if ( (props.event[7].includes("away") && mySchool === away) || //if i'm away and i edited, pending opponents approval OR vice versa
                    ( props.event[7].includes("home") && mySchool === home ) ){
            return 'Edited by you, pending opponent approval'
        }
        else
            return "unknown"
    }

    const status: string = setStatus();

    const time = formatTime(props.event[1].toString());
    const level = props.event[3].toString() === 'v'? 'Varsity' : 'Junior Varsity';
    const gender = props.event[4].toString() === 'g'? 'Girls' : 'Boys';

    return(
        <div className="view-event-container">
            <div className="info title">
                <div className="label">Title: </div>{props.event[0].toString()}
            </div>

            <div className="info home">
                <div className="label">Home: </div>{props.event[5]}
            </div>

            <div className="info away">
                <div className="label">Away: </div>{props.event[6]}
            </div>

            <div className="info time">
                <div className="label">Time: </div>{time}
            </div>

            <div className="info location">
                <div className="label">Location: </div>{props.event[2].toString()}
            </div>

            <div className="info level">
                <div className="label">Level: </div>{ level }
            </div>

            <div className="info gender">
                <div className="label">Gender: </div>{ gender }
            </div>
            
            <div className="info status">
                <div className="label">Status: </div>{status}
            </div>
        </div>
    );
}

export default EventDisplay;