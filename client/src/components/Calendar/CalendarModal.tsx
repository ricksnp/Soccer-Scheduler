import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useGlobalState, useDispatch } from './Provider';
import NewGameForm from './NewGameForm';


const CalendarModal = (  ) => {
    const showAddGame = useGlobalState('showAddGame');
    const showViewGame = useGlobalState('showViewGame');
    const showEditGame = useGlobalState('showEditGame');
    const visible = showAddGame || showViewGame || showEditGame ? true : false;
    const dispatch = useDispatch();

    const [ gameForm, setGameForm ] = useState(React.createRef());

    const saveForm = (form: any) => {
        setGameForm(form);
    }

    const handleCancel = (  ) => {
        if(showAddGame) {
            // @ts-ignore
            gameForm.resetFields();
            dispatch({ type: 'CLOSE_ADD_GAME' });
        }

        if(showViewGame) {
            dispatch({ type: 'CLOSE_VIEW_GAME' });
        }

        if(showEditGame) {
            dispatch({ type: 'CLOSE_VIEW_GAME' });
        }
        
    }

    const handleOk = (  ) => {
        if(showAddGame) {
            // @ts-ignore
            gameForm.validateFields((err: any, values: any) => {
                if (err) {
                    return;
            }

            console.log("Received values of form: ", values);

            // @ts-ignore
            gameForm.resetFields();
            dispatch({ type: 'CLOSE_ADD_GAME' })
            });
        }

        if(showViewGame) {
            dispatch({ type: 'CLOSE_VIEW_GAME' });
        }
        
    }

    return(
        <Modal 
            visible={visible} 
            closable 
            onCancel={ handleCancel }
            onOk={ handleOk }
            okText={ showViewGame? 'Edit' : 'OK' }
        >
            { showAddGame && <NewGameForm ref={ saveForm } /> }
            { showViewGame && <div>event info</div> }
            { showEditGame && <div>edit game</div> }
        </Modal>
    );
}

export default CalendarModal;