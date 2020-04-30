import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, notification } from 'antd';
import { useGlobalState, useDispatch } from './GMProvider';
import GMGameForm from './GMGameForm';
import { postGames, apiUpdateGame } from '../../utility/APIGameControl';
import GameForm from '../Calendar/GameForm'

const openNotification = () => {
    notification.open({
        message: 'Not a participant',
        description: 'You cannot edit a game in which your team is not a participant.'
    })
}


const GMModals = () => {
    const showEditGame = useGlobalState('showEditGame');
    const clickedGame = useGlobalState('clickedGame')
    const visible = showEditGame ? true : false;
    const dispatch = useDispatch();



    const [gameForm, setGameForm] = useState(React.createRef());


    const saveForm = (form: any) => {
        setGameForm(form);
    }

    const handleCancel = () => {
        if (showEditGame) {
            dispatch({ type: 'CLOSE_EDIT_GAME', payload: clickedGame });
        }

    }

    const handleOk = () => {
        if (showEditGame) {
            //@ts-ignore
            gameForm.validateFields((err: any, values: any) => {
                if (err) {
                    return;
                }

                //@ts-ignore
                const dateObj = gameForm.getFieldValue("time")._d.split(' ');
                console.log(dateObj);

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
                
                // @ts-ignore
                console.log( "TIME OBJECT" + gameForm.getFieldValue("time"))

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
                dispatch({ type: 'CLOSE_EDIT_GAME', payload: clickedGame })
            });
        }

    }

    return (
        <Modal
            visible={visible}
            closable
            onCancel={handleCancel}
            onOk={handleOk}
            okText={'Submit'}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <GMGameForm ref={saveForm} />
        </Modal>
    );
}

export default GMModals;