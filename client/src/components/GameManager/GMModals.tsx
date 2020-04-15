import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useGlobalState, useDispatch } from './GMProvider';
import { postGames } from '../../utility/APIGameControl';
import GameForm from './GMGameForm'

const GMModals = () => {
    const showEditGame = useGlobalState('showEditGame');
    const visible = showEditGame ? true : false;
    const dispatch = useDispatch();


    const [gameForm, setGameForm] = useState(React.createRef());

    const saveForm = (form: any) => {
        setGameForm(form);
    }

    const handleCancel = () => {
        if (showEditGame) {
            dispatch({ type: 'CLOSE_EDIT_GAME' });
        }

    }

    const handleOk = () => {
                if (showEditGame) {
            //Save edits
            
            // @ts-ignore
            gameForm.validateFields((err: any, values: any) => {
                if (err) {
                    return;
                }

                //send to backend
                postGames(values);
                console.log("VALUES" + JSON.stringify(values));
                //console.log("GAMES: " + getGames())


                // @ts-ignore
                gameForm.resetFields();
                dispatch({ type: 'CLOSE_EDIT_GAME' });
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
            { showEditGame && <GameForm ref={saveForm} /> }
        </Modal>
    );
}

export default GMModals;