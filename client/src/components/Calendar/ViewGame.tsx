import React from 'react';
import { Modal } from 'antd';
import { useGlobalState, useDispatch } from './Provider';

const ViewGame = (  ) => {

    const visible = useGlobalState('showViewGame');
    const dispatch = useDispatch();

    return(
        <Modal 
            visible={visible}
            closable
            onCancel={ (e: any) => dispatch({ type: 'CLOSE_VIEW_GAME' }) }
            okText={"Edit"}
        >
            event info
        </Modal>
    );
}

export default ViewGame;

