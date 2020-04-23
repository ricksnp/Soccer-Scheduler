import React from 'react';
import {Modal, Form, DatePicker} from 'antd';

interface Props
{
    show: any,
    setModal: any,
    type: string,
    delete: any
}
const DayBlockModal = (props: Props) => {
    
    function onChange(date:any, dateString:any)
    {
        console.log("date: " + date + " " + dateString)
    }
    return(
        <>
            <Modal 
                visible={props.show} 
                onCancel={props.setModal(false)}
                closable
            >
                {props.type === "remove" ?
                    <>Are you sure you want to delete {props.delete.length} blocked days?</>
                : props.type === "add" ?
                    <DatePicker onChange={onChange}/>
                :
                    <></>
                }
            </Modal>    
        </>
    )
}

export default DayBlockModal;