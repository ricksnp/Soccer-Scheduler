import React, { useState } from 'react';
import { Card, Button, notification, Tooltip } from 'antd';
import styled from 'styled-components';
import { apiUpdateGame } from '../../utility/APIGameControl'
import { useDispatch } from '../Provider';
import { sendAnEmail } from '../../common/email/email'
import { getAllUsers } from '../../utility/APIUtility'


const Title = styled.span`
font-weight: bold;
`;

const Div = styled.div`
    padding-top: 2vw;
    text-align: right;
`;

interface Props {
    game: any,
    index: any,
    role: string,
    onUpdate: any,
    change: any
}

let emailContents = (away: string, on: string) => {
    return "<h2>PENDING GAME CONFIRMATION:</h2>" +
        "You have a new game to confirm against " +
        away + "on " + on
}

let emailContents2 = (away: string, on: string) => {
    return "<h2>GAME CONFIRMATION:</h2>" +
        "Your game was approved and is now scheduled against" +
        away + "on " + on
}



const grabEmail2 = (h: any, a: any, d: any, contents: any) => {
    let desiredEmail = "";
    let desiredEmail2 = "";
    let assignorEmail = "";
    let assignorarray: any[] = [];
    getAllUsers().then((response) => {

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname === "Assignor") {

                assignorarray.push(response[i])
            }
        }

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname === a) {

                desiredEmail = response[i].email;

            }
        }
        sendAnEmail(desiredEmail, contents + d);

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname === h) {

                for (let j = 0; j < assignorarray.length; j++) {

                    if (response[i].district === assignorarray[j].district) {
                        desiredEmail2 = response[i].email;
                        assignorEmail = assignorarray[j].email;
                    }

                }

            }

        }

    })

    sendAnEmail(desiredEmail, contents + d);
    sendAnEmail(desiredEmail2, contents + d);
    sendAnEmail(assignorEmail, contents + d);

}

const grabEmail = (h: any, a: any, d: any, contents: any) => {
    let desiredEmail = "";
    let desiredEmail2 = "";

    getAllUsers().then((response) => {


        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname === a) {

                desiredEmail = response[i].email;
                sendAnEmail(desiredEmail, contents + d);

            }
        }

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname === h) {

                desiredEmail2 = response[i].email;
                sendAnEmail(desiredEmail2, contents + d);

            }
        }

    }

    )
}

const seasonStart = new Date("2020/02/20");


const formatTime = ( dateTimeStr: string ) => {
    const dateAndTimeSplit = dateTimeStr.includes('T') ?  dateTimeStr.split('T') : dateTimeStr.split(' ');

    const formatDate = ( dateStr: string ) => {
        const dateSplit = dateStr.split('-');

        const monthName = ( moNo: string ) => {
            if ( moNo === "01" ) { return "Jan"; }
            else if ( moNo === "02" ) { return "Feb"; }
            else if ( moNo === "03" ) { return "Mar"; }
            else if ( moNo === "04" ) { return "Apr"; }
            else if ( moNo === "05" ) { return "May"; }
            else if ( moNo === "06" ) { return "Jun"; }
            else if ( moNo === "07" ) { return "Jul"; }
            else if ( moNo === "08" ) { return "Aug"; }
            else if ( moNo === "09" ) { return "Sep"; }
            else if ( moNo === "10" ) { return "Oct"; }
            else if ( moNo === "11" ) { return "Nov"; } 
            else { return "Dec"; }
        }

        const formattedDate = monthName( dateSplit[1] ) + ' ' + dateSplit[2] + ', ' + dateSplit[0];
        return formattedDate;
    }

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

    const formattedTime = formatDate( dateAndTimeSplit[0] ) + ' ' + hr12( dateAndTimeSplit[1] );

    return formattedTime;

}

const GameCard = (props: Props) => {

    const [color, setColor] = useState("white")

    const [counter, setCounter] = useState(0)
    const dispatch = useDispatch();

    const handleEdit = (game: any) => {

        dispatch({ type: 'EDIT_GAME', payload: [game.title, game.start, game.location, game.teamLevel, game.gender, game.home, game.away, game.status, game.id] });
    }

    const handleConfirm = (game: any) => {

        let addMessage = "Games successfully Scheduled";

        let update = {
            id: game.id,
            status: "assignorPending",
            location: game.location,
            teamLevel: game.teamLevel,
            gender: game.gender,
            date: game.start

        }

        if (props.role !== "ROLE_USER") {
            update.status = "scheduled"
        }
        else {

            //Calculating the number of days between the game date and the season start
            let gameDate: Date = new Date(update.date);
            let difference = seasonStart.getTime() - gameDate.getTime()
            let numofDays = difference / (1000 * 3600 * 24);

            //if Game is scheduled more than a week away from season start, set status to scheduled, 
            // else send it to the assignor
            if (numofDays >= 7) {
                update.status = "scheduled"
            }
            else {
                update.status = "assignorPending";
                addMessage = "Game Successfully sent to  Assignor";
            }

        }
        if (addMessage === ('Games successfully Scheduled')) {
            grabEmail(game.home, game.away, game.start, emailContents2(game.away, game.start))

        }

        console.log(update)

        apiUpdateGame(update)
            .then((response) => {
                notification.success({
                    message: "Game Confirmed",
                    description: addMessage
                })
                props.onUpdate(props.change + 1)
            })
            .catch((error) => {
                notification.error({
                    message: "Game Was Not Confirmed",
                    description: error.message
                })
            })


    }

    const handleDelete = (game: any) => {

        let update = {
            id: game.id,
            status: "deleted",
            location: game.location,
            teamLevel: game.teamLevel,
            gender: game.gender,
            date: game.start
        }

        apiUpdateGame(update)
            .then((response) => {
                notification.success({
                    message: "Game Deleted",
                    description: "Game was successfully deleted"
                })
            })
            .catch((error) => {
                notification.error({
                    message: "Game Was Not deleted",
                    description: error.message
                })
            })

        props.onUpdate(props.change + 1)
    }

    const handleCancel = (game: any) => {
        let update = {
            id: game.id,
            status: "cancelled",
            location: game.location,
            teamLevel: game.teamLevel,
            gender: game.gender,
            date: game.start


        }

        grabEmail2(game.home, game.away, game.start, "An existing game has now been cancelled.  It was scheduled for ")



        apiUpdateGame(update)
            .then((response) => {
                notification.success({
                    message: "Game Cancelled",
                    description: "Game was successfully cancelled"
                })
            })

            .catch((error) => {
                notification.error({
                    message: "Game Was Not Cancelled",
                    description: error.message
                })
            })

        props.onUpdate(props.change + 1)
    }


    const pendingButtons = (game: any) => {
        return (
            <>
                <Tooltip title="Approve"><Button style={{ background: "#52c41a" }} onClick={() => handleConfirm(game)}><i className="fas fa-check"></i></Button></Tooltip>
                <Tooltip title="Edit"><Button style={{ background: "#1890ff" }} onClick={() => handleEdit(game)}><i className="fas fa-edit"></i></Button></Tooltip>
                <Tooltip title="Cancel"><Button style={{ background: "#f5222d" }} onClick={() => handleCancel(game)}><i className="fas fa-trash-alt"></i></Button></Tooltip>
            </>
        )
    }

    const scheduledButtons = (game: any) => {
        return (
            <>
                <Tooltip title="Edit"><Button style={{ background: "#1890ff" }} onClick={() => handleEdit(game)}><i className="fas fa-edit"></i></Button></Tooltip>
                <Tooltip title="Cancel"><Button style={{ background: "#f5222d" }} onClick={() => handleCancel(game)}><i className="fas fa-times-circle"></i></Button></Tooltip>
            </>
        )
    }


    const cardStyle = {
        margin: '2%',
        background: color,
        borderStyle: 'solid',
        borderColor: 'black'
    }

    const game = props.game


    if (props.index % 2 === 0 && counter === 0) {
        setColor("#A8A8A8")
        setCounter(counter + 1)
    }


    return (
        props.game === undefined ?
            <>THERE ARE NO GAMES </>
            :

            <>
                <Card title={game.home + " vs " + game.away} style={cardStyle} >
                    <Title>Home:</Title> {game.home} <Title>Away:</Title> {game.away} <Title>Level: </Title> {game.teamLevel === 'v' ? <> Varsity</> : <> unior Varsity</>}
                    <Title> Date and Time:</Title> {formatTime(game.start)} <Title>Location:</Title> {game.location} <Title>Gender:</Title> {game.gender === 'b' ? <> Boys</> : <> Girls</>}

                    <Div>
                        {game.status === "coachPending" || game.status.includes('Edit')  || (game.status === "assignorPending" && props.role !== "ROLE_USER") ?
                            <>
                                {pendingButtons(game)}
                            </>
                            : game.status == "scheduled" ?
                                <>
                                    {scheduledButtons(game)}
                                </>
                                : game.status === "assignorPending" ?
                                    <></>
                                    :
                                    <><Button style={{ background: "#f5222d" }} onClick={() => handleDelete(game)}><i className="fas fa-trash-alt"></i></Button></>
                        }
                    </Div>
                </Card>
            </>
    );
}

export default GameCard;