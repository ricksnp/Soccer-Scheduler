import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, notification } from 'antd';
import { useGlobalState, useDispatch } from './Provider';
import GameForm from './GameForm';
import EventDisplay from './EventDisplay';
import { postGames } from '../../utility/APIGameControl';
import {getCurrentUser} from '../../utility/APIUtility'
import { userInfo } from 'os';

const openNotification = () => {
    notification.open({
        message: 'Not a participant',
        description: 'You cannot edit a game in which your team is not a participant.'
    })
}

const CalendarModal = (user: any) => {
    const showAddGame = useGlobalState('showAddGame');
    const showViewGame = useGlobalState('showViewGame');
    const showEditGame = useGlobalState('showEditGame');
    const clickedEvent = useGlobalState('clickedGame');
    const visible = showAddGame || showViewGame || showEditGame ? true : false;
    const dispatch = useDispatch();

    const [thisUser, setUser] = useState(user.user)
    const [school, setSchool] = useState(user.schoolname)

    console.log("CalendarModal Role" + JSON.stringify(thisUser))

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

    const handleOk = () => {
        if (showAddGame) {
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
                    status: gameForm.getFieldValue("status"),
                    // @ts-ignore
                    date: gameForm.getFieldValue("date") + 'T' + gameForm.getFieldValue("time")._i,
                }

                console.log("Calendar modal game information" + JSON.stringify(game))

                //game.homeTeamName = userInfo.

                //send to backend
                postGames(game)
                .then((response)=>{
                    console.log(JSON.stringify(response))
                    notification.success({
                        message: "Game Added",
                        description: "Game was successfully added"
                    })
                })
                .catch((error)=>{
                    notification.error({
                        message: "Game Add Failed",

                        description: error.message||"Game was not added"
                    })
                })
                console.log("VALUES" + JSON.stringify(values));
                //console.log("GAMES: " + getGames())


                // @ts-ignore
                gameForm.resetFields();
                dispatch({ type: 'CLOSE_ADD_GAME' })
            });
        }

        if (showViewGame) {
            //opens edit modal if user is participant in game
            if(school === clickedEvent[5] || school === clickedEvent[6] || user.role !== "ROLE_USER" ){
                console.log( school + " " + user.role)
                //save edits
                dispatch({ type: 'EDIT_GAME', payload: clickedEvent });
            } 
            //opens notification if user attempts to edit a game in which they are not participant
            else {
                openNotification();
            }
        }

        if (showEditGame) {
            //Save edits
            dispatch({ type: 'CLOSE_EDIT_GAME' });
        }

    }

    const allowEdit = showViewGame && (user !== clickedEvent[5] || user!== clickedEvent[6]);

    return (
        <Modal
            visible={visible}
            closable
            onCancel={handleCancel}
            onOk={handleOk}
            okText={showViewGame ? 'Edit' : 'Submit'}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            { showAddGame && <GameForm ref={saveForm}/> }
            { showEditGame && <GameForm ref={saveForm} /> }
            { showViewGame && <EventDisplay event={clickedEvent} /> }
        </Modal>
    );
}

export default CalendarModal;