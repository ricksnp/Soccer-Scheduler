import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, notification } from 'antd';
import { useGlobalState, useDispatch } from './Provider';
import GameForm from './GameForm';
import EventDisplay from './EventDisplay';
import { postGames } from '../../utility/APIGameControl';
import {getCurrentUser} from '../../utility/APIUtility'

const openNotification = () => {
    notification.open({
        message: 'Not a participant',
        description: 'You cannot edit a game in which your team is not a participant.'
    })
}

const CalendarModal = () => {
    const showAddGame = useGlobalState('showAddGame');
    const showViewGame = useGlobalState('showViewGame');
    const showEditGame = useGlobalState('showEditGame');
    const clickedEvent = useGlobalState('clickedGame');
    const visible = showAddGame || showViewGame || showEditGame ? true : false;
    const dispatch = useDispatch();

    const [user, setUser] = useState("Neville")
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
            gameForm.validateFields((err: any, values: object) => {
                if (err) {
                    return;
                }


                const game: object = {
                    // @ts-ignore
                    "homeTeamName": JSON.stringify(gameForm.getFieldValue("homeTeamName")),
                    // @ts-ignore
                    "awayTeamname": JSON.stringify(gameForm.getFieldValue("awayTeamName")),
                    // @ts-ignore
                    "teamLevel": JSON.stringify(gameForm.getFieldValue("teamLevel")),
                    // @ts-ignore
                    "gender": JSON.stringify(gameForm.getFieldValue("gender")),
                    // @ts-ignore
                    "location": JSON.stringify(gameForm.getFieldValue("location")),
                    // @ts-ignore
                    "status": JSON.stringify(gameForm.getFieldValue("status")),
                    // @ts-ignore
                    "date": JSON.stringify(gameForm.getFieldValue("date") + "T" + gameForm.getFieldValue("time")._i),
                }

                console.log(typeof values)
                //send to backend
                postGames(game);
                console.log("VALUES" + JSON.stringify(values));
                //@ts-ignore


                // @ts-ignore
                gameForm.resetFields();
                dispatch({ type: 'CLOSE_ADD_GAME' })
            });
        }

        if (showViewGame) {
            //opens edit modal if user is participant in game
            if(user === clickedEvent[5] || user === clickedEvent[6]){
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
            { showAddGame && <GameForm ref={saveForm} /> }
            { showEditGame && <GameForm ref={saveForm} /> }
            { showViewGame && <EventDisplay event={clickedEvent} /> }
        </Modal>
    );
}

export default CalendarModal;