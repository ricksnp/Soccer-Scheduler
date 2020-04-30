import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, notification } from 'antd';
import { useGlobalState, useDispatch } from './Provider';
import GameForm from './GameForm';
import EventDisplay from './EventDisplay';
import { postGames, apiUpdateGame } from '../../utility/APIGameControl';
import {getCurrentUser} from '../../utility/APIUtility'
import { userInfo } from 'os';
import { sendAnEmail } from '../../common/email/email'
import { getAllUsers } from '../../utility/APIUtility'

const openNotification = () => {
    notification.open({
        message: 'Not a participant',
        description: 'You cannot edit a game in which your team is not a participant.'
    })
}

const grabEmail = (game: any) => {
    let desiredEmail = "";
    getAllUsers().then((response) => {

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname == game.awayTeamName) {

                desiredEmail = response[i].email;
                sendAnEmail(desiredEmail, "You have a game request scheduled for " + game.date);

            }
        }

    })

}

const CalendarModal = (user: any, school: any, setUpdate: any, onUpdate: any, change: any, setChange:any) => {
    const showAddGame = useGlobalState('showAddGame');
    const showViewGame = useGlobalState('showViewGame');
    const showEditGame = useGlobalState('showEditGame');
    const clickedEvent = useGlobalState('clickedGame');
    const visible = showAddGame || showViewGame || showEditGame ? true : false;
    const dispatch = useDispatch();

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

                console.log(game)

                //send to backend
                postGames(game)
                    .then((response) => {
                        if(response.success)
                        {
                            notification.success({
                                message: "Game Added",
                                description: "Game was successfully added"
                            })
                        }
                        else
                        {
                            notification.error({
                                message: "Game was not added",
                                description: response.message
                            })
                        }
                        grabEmail(game);

                    })
                    .catch((error) => {
                        notification.error({
                            message: "Game Add Failed",
                            description: error.essage || "Game was not added"
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
            const selectedDate = dateObjSplit[0].substring(1);

            // @ts-ignore
            console.log( gameForm.getFieldValue('date') );

            // @ts-ignore
            let status = clickedEvent[5];

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
                teamLevel: gameForm.getFieldValue("teamLevel"),
                // @ts-ignore
                gender: gameForm.getFieldValue("gender"),
                // @ts-ignore
                location: gameForm.getFieldValue("location"),
                // @ts-ignore
                status: status,
                // @ts-ignore
                date: gameForm.getFieldValue('date') + 'T' + selectedTime,
                // @ts-ignore
                id: clickedEvent[8]
            }

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
    );
}

export default CalendarModal;