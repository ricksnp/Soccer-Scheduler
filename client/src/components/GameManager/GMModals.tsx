import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, notification } from 'antd';
import { useGlobalState, useDispatch } from './GMProvider';
import GMGameForm from './GMGameForm';
import { postGames, apiUpdateGame } from '../../utility/APIGameControl';
import { getCurrentUser } from '../../utility/APIUtility';
import GameForm from '../Calendar/GameForm'

const openNotification = () => {
    notification.open({
        message: 'Not a participant',
        description: 'You cannot edit a game in which your team is not a participant.'
    })
}


const GMModals = (home: any) => {
    const showEditGame = useGlobalState('showEditGame');
    const clickedGame = useGlobalState('clickedGame')
    const visible = showEditGame ? true : false;
    const dispatch = useDispatch();

    const [gameForm, setGameForm] = useState(React.createRef());

    const currentTeam = home.home;
    const currentRole = home.role;
    
    console.log(clickedGame)

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

                
                let status = clickedGame[7];
                const title = clickedGame[0];

                //@ts-ignore
                const homeAwayTeams = title.split(' vs ');
                const homeTeam = homeAwayTeams[0];
                const awayTeam = homeAwayTeams[1];
                
        
                //home team edited game
                if( homeTeam === currentTeam ) {
                    // @ts-ignore
                    status = "homeEdit";
                } 
                //away team edited game
                else if ( awayTeam === currentTeam ) {
                    // @ts-ignore
                    status = "awayEdit";
                } 
                //set to scheduled if assignor edits
                else if ( currentRole === "ROLE_ASSIGNOR" ) {
                    // @ts-ignore
                    status = "scheduled";
                }
                //if creating new game (doesn't happen here?? just a catch in case all else fails)
                else {
                    // @ts-ignore
                    status = "coachPending";
                }

                //@ts-ignore
                const dateObj = gameForm.getFieldValue("time")._d;
                const dateObjSplit = JSON.stringify(dateObj).split('T');
                const timeArraySplit = dateObjSplit[1].split('.')
                const timeArray = timeArraySplit[0].split(':')
                const correctedHour = JSON.stringify(parseInt(timeArray[0], 10) - 5);
                const selectedTime = correctedHour + ":" + timeArray[1] + ":00";
                const selectedDate = dateObjSplit[0].substring(1);

                // @ts-ignore
                console.log(gameForm.getFieldValue('date'));


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
                    id: clickedGame[8]
                }
                
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