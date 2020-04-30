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

// const grabEmail = (game: any) => {
//     let desiredEmail = "";
//     getAllUsers().then((response) => {

//         for (let i = 0; i < response.length; i++) {
//             if (response[i].schoolname == game.awayTeamName) {

//                 desiredEmail = response[i].email;
//                 sendAnEmail(desiredEmail, "You have a game request scheduled for " + game.date);

//             }
//         }

//     })

// }

const CalendarModal = (user: any, school: any, setUpdate: any, onUpdate: any, change: any, setChange:any) => {
    const showAddGame = useGlobalState('showAddGame');
    const showViewGame = useGlobalState('showViewGame');
    const showEditGame = useGlobalState('showEditGame');
    const clickedEvent = useGlobalState('clickedGame');
    const visible = showAddGame || showViewGame || showEditGame ? true : false;
    const dispatch = useDispatch();

    console.log("CalendarModal Role" + JSON.stringify(user))
    console.log(clickedEvent)

    //getCurrentUser().then((response=>{setUser(response)}));


    const [gameForm, setGameForm] = useState(React.createRef());

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

    //update game status based on who edited game
    const updateStatusEdit = (  ) => {
        const role = user.role;

        //home team edited game
        if( clickedEvent[5] === school ) {
            return "homeEdit"
        } 
        //away team edited game
        else if ( clickedEvent[6] === school ) {
            return "awayEdit"
        }

        //how to know if team approved edit?
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
                console.log("selectedTime" + selectedTime);


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
                

                console.log("Calendar modal game information" + JSON.stringify(game))

                //game.homeTeamName = userInfo.

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
                         //grabEmail(game);
                         console.log("RESPONSE: " + JSON.stringify(response))

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
                console.log(school + " " + user.role)
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
                    status: updateStatusEdit(),
                    // @ts-ignore
                    date: gameForm.getFieldValue("date") + 'T' + gameForm.getFieldValue("time")._i,
                }
                
                // @ts-ignore
                console.log(gameForm.getFieldValue("time")._i)

                console.log("Calendar modal game information" + JSON.stringify(game))

                //game.homeTeamName = userInfo.

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
                        description: "Game was not edited"
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