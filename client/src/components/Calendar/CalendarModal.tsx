import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, notification } from 'antd';
import { useGlobalState, useDispatch } from './Provider';
import GameForm from './GameForm';
import EventDisplay from './EventDisplay';
import { postGames } from '../../utility/APIGameControl';

const CalendarModal = () => {
    const showAddGame = useGlobalState('showAddGame');
    const showViewGame = useGlobalState('showViewGame');
    const showEditGame = useGlobalState('showEditGame');
    const clickedEvent = useGlobalState('clickedGame');
    const visible = showAddGame || showViewGame || showEditGame ? true : false;
    const dispatch = useDispatch();


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

                //send to backend
                postGames(values)
                .then((response)=>{
                    notification.success({
                        message: "Game Added",
                        description: "Game was successfully added"
                    })
                })
                .catch((error)=>{
                    notification.error({
                        message: "Game Add Failed",
                        description: "Game was not added"
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
            dispatch({ type: 'EDIT_GAME', payload: clickedEvent });
            console.log(clickedEvent)
        }

        if (showEditGame) {
            //Save edits
            dispatch({ type: 'CLOSE_EDIT_GAME' });
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
            { showAddGame && <GameForm ref={saveForm} /> }
            { showEditGame && <GameForm ref={saveForm} /> }
            { showViewGame && <EventDisplay event={clickedEvent} /> }
        </Modal>
    );
}

export default CalendarModal;