import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, notification } from 'antd';
import { useGlobalState, useDispatch } from './Provider';
import GameForm from './GameForm';
import EventDisplay from './EventDisplay';
import { postGames, apiUpdateGame } from '../../utility/APIGameControl';
import { getCurrentUser } from '../../utility/APIUtility'
import { userInfo } from 'os';
import { sendAnEmail } from '../../common/email/email'
import { getAllUsers } from '../../utility/APIUtility'
import Conflict from './Conflict';


const openNotification = () => {
    notification.open({
        message: 'Not a participant',
        description: 'You cannot edit a game in which your team is not a participant.'
    })
}

const emailContents = (away: string, on: string) => {
    return "<h2>PENDING GAME CONFIRMATION:</h2>" +
        "You have a new game to confirm against " +
        away + " on " + on
}

const grabEmail = (game: any) => {
    let desiredEmail = "";
    getAllUsers().then((response) => {

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname == game.awayTeamName) {

                desiredEmail = response[i].email;
                sendAnEmail(desiredEmail, emailContents(game.awayTeamName, game.date));

            }
        }

    })

}
const baseGame = {homeTeamName: "null", awayTeamName: "null", teamLevel: "null", gender: "null", location: "null", status: "null", date: "null"}
const CalendarModal = (user: any, school: any, setUpdate: any, onUpdate: any, change: any, setChange: any) => {
    const showAddGame = useGlobalState('showAddGame');
    const showViewGame = useGlobalState('showViewGame');
    const showEditGame = useGlobalState('showEditGame');
    const clickedEvent = useGlobalState('clickedGame');
    const visible = showAddGame || showViewGame || showEditGame ? true : false;
    const dispatch = useDispatch();

    console.log("CalendarModal Role" + JSON.stringify(user))
    console.log(clickedEvent)

    const [conflict, setConflict] = useState(false);
    const [newGame, setNewGame] = useState(baseGame);
    const [gameID, setID] = useState(0)

    //getCurrentUser().then((response=>{setUser(response)}));


    const [gameForm, setGameForm] = useState(React.createRef());

    const schoolName = user.user.schoolname;
    const role = user.user.role;

    const saveForm = (form: any) => {
        setGameForm(form);
    }

    const handleCancel = () => {
        if (showAddGame) {
            // @ts-ignore
            gameForm.resetFields();
            dispatch({ type: 'CLOSE_ADD_GAME' });
        }

        if (showViewGame) {
            dispatch({ type: 'CLOSE_VIEW_GAME' });
        }

        if (showEditGame) {
            dispatch({ type: 'CLOSE_VIEW_GAME' });
        }

    }

    const handleOk = () => {
        if (showAddGame) {
            // @ts-ignore
            gameForm.validateFields((err: any, values: any) => {
                if (err) {
                    return;
                }


                //@ts-ignore
                const dateObj = gameForm.getFieldValue("time")._d;
                const dateObjSplit = JSON.stringify(dateObj).split('T');
                const timeArraySplit = dateObjSplit[1].split('.')
                const timeArray = timeArraySplit[0].split(':')
                const correctedHour = JSON.stringify(parseInt(timeArray[0], 10) - 5);
                const selectedTime = correctedHour + ":" + timeArray[1];


                const game = {
                    // @ts-ignore
                    homeTeamName: gameForm.getFieldValue("homeTeamName"),
                    // @ts-ignore
                    awayTeamName: gameForm.getFieldValue("awayTeamName"),
                    // @ts-ignore
                    teamLevel: gameForm.getFieldValue("teamLevel"),
                    // @ts-ignore
                    gender: gameForm.getFieldValue("gender"),
                    // @ts-ignore
                    location: gameForm.getFieldValue("location"),
                    // @ts-ignore
                    status: gameForm.getFieldValue("status"),
                    // @ts-ignore
                    date: gameForm.getFieldValue("date") + 'T' + selectedTime,
                }


                setNewGame(game);

                console.log("Calendar modal game information" + JSON.stringify(game))

                //game.homeTeamName = userInfo.

                //send to backend
                postGames(game)
                    .then((response) => {
                        if(response.success)
                        {
                            let mess = response.message
                            if(response.message != undefined && mess.includes("arning"))
                            {
                                console.log("Message: " + response.messsage)
                                let splitter = mess.split(" ");
                                setID(splitter[0])
                                setConflict(true);
                                console.log("HERE")
                            }
                            else{

                                notification.success({
                                    message: "Game Added",
                                    description: response.message
                                })
                            }
                        }
                        else
                        {
                            if(response.message != undefined && response.message.includes("onflict"))
                            {
                                notification.error({
                                    message: "Game Not Added",
                                    description: "There is a scheduling conflict, try chagning the date or time" 
                                })
                            }
                            notification.error({
                                message: "Game was not added",
                                description: response.message
                            })
                        }
                         grabEmail(game);
                         console.log("RESPONSE: " + JSON.stringify(response))

                    })
                    .catch((error) => {
                        notification.error({
                            message: "Game Add Failed",
                            description: error.message || "Game was not added"
                        })
                    })

                // @ts-ignore
                gameForm.resetFields();
                dispatch({ type: 'CLOSE_ADD_GAME' })
            });
        }

        if (showViewGame) {
            //opens edit modal if user is participant in game
            if (school === clickedEvent[5] || school === clickedEvent[6] || user.role !== "ROLE_USER") {
                //save edits
                dispatch({ type: 'EDIT_GAME', payload: clickedEvent });
            }
            //opens notification if user attempts to edit a game in which they are not participant
            else {
                openNotification();
            }
        }

        if (showEditGame) {
            // @ts-ignore
            gameForm.validateFields((err: any, values: any) => {
                if (err) {
                    return;
                }
            console.log(JSON.stringify(values))

            //@ts-ignore
            const dateObj = gameForm.getFieldValue("time")._d;
            const dateObjSplit = JSON.stringify(dateObj).split('T');
            const timeArraySplit = dateObjSplit[1].split('.')
            const timeArray = timeArraySplit[0].split(':')
            const correctedHour = JSON.stringify(parseInt(timeArray[0], 10) - 5);
            const selectedTime = correctedHour + ":" + timeArray[1];

            // @ts-ignore
            let status = clickedEvent[5];
            // @ts-ignore
            let gender = gameForm.getFieldValue("gender");
            // @ts-ignore
            let level = gameForm.getFieldValue('teamLevel');

            //home team edited game
            if( clickedEvent[5] === schoolName ) {
                // @ts-ignore
                status = "homeEdit"
            } 
            //away team edited game
            else if ( clickedEvent[6] === schoolName ) {
                // @ts-ignore
                status = "awayEdit"
            }
            else if ( role !== 'ROLE_USER' ) {
                // @ts-ignore
                status = "scheduled"
            }

            console.log(clickedEvent);

            const game = {
                // @ts-ignore
                homeTeamName: gameForm.getFieldValue("homeTeamName"),
                // @ts-ignore
                awayTeamName: gameForm.getFieldValue("awayTeamName"),
                // @ts-ignore
                teamLevel: level,
                // @ts-ignore
                gender: gender,
                // @ts-ignore
                location: gameForm.getFieldValue("location"),
                // @ts-ignore
                status: status,
                // @ts-ignore
                date: gameForm.getFieldValue('date') + 'T' + selectedTime,
                // @ts-ignore
                id: clickedEvent[8]
            }

            //@ts-ignore
                console.log("level: " + gameForm.getFieldValue("teamLevel") + "gender: " + gameForm.getFieldValue("gender"))
                console.log(game)

            //send to backend
            apiUpdateGame(game)
            .then((response)=>{
                notification.success({
                    message: "Game Edited",
                    description: "Game was successfully edited"
                })
            })
            .catch((error)=>{
                notification.error({
                    message: "Game Edit Failed",
                    description: error.message,
                    duration: 10
                })
            })


            // @ts-ignore
            gameForm.resetFields();
            dispatch({ type: 'CLOSE_EDIT_GAME' })
        });
        }

    }


    return (
        <>
        <Modal
            visible={visible}
            closable
            onCancel={handleCancel}
            onOk={handleOk}
            okText={showViewGame ? 'Edit' : 'Submit'}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            {showAddGame && <GameForm ref={saveForm} />}
            {showEditGame && <GameForm ref={saveForm} />}
            {showViewGame && <EventDisplay event={clickedEvent} />}
        </Modal>
        <Conflict showConflict={conflict} game={newGame} id={gameID} setConflict={setConflict} role={user.role}/>
        </>
    );
}

export default CalendarModal;