import React, { useState, createRef } from 'react';
import GameCalendar from './GameCalendar';
import AddGame from './AddGame';
import { Provider, useDispatch } from './Provider';

const CalendarController = () => {

    const dispatch = useDispatch();

    const [formRef, setFormRef] = useState(createRef());

    const saveFormRef = ( node: any ) => {
        if (node !== null) {
          setFormRef(node);
        }
      }

    /**  
    const handleCreate = () => {
        formRef.validateFields((err: any, values: any) => {
            if (err) {
                return;
        }

        console.log("Received values of form: ", values);
        formRef.resetFields();
        //set modal visibility false
        });
    }; 
     */

    return(
        <div>
            <Provider>
                <GameCalendar  />
                <AddGame  ref={saveFormRef} />
            </Provider>
        </div>
    );
}

export default CalendarController;