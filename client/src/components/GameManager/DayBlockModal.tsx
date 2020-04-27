import React, {useState} from 'react';
import styled from 'styled-components';
import {addBlockedDay, editBlockedDay} from '../../utility/APIGameControl';
import {Modal, Form, DatePicker, notification} from 'antd';

interface Props
{
    show: any,
    close: any
    type: string,
    delete: any,
    blockedDays: any
}

const Div = styled.div`
    text-align: center
`;

const DayBlockModal = (props: Props) => {

    const [addDay, setDay] = useState("");
    
    function onChange(date:any, dateString:any)
    {
        let add = true;

        if(props.blockedDays != undefined)
        {
            for(let i = 0; i < props.blockedDays.length; i++)
            {
                if(props.blockedDays[i].date == dateString && props.blockedDays[i].name == "blocked day")
                {
                    notification.error({
                        message: "Cannot Block selected day",
                        description: "Day is already blocked"
                    })

                    add = false;
                }
            }
        }

        if(add)
        {
            setDay(dateString);
        }

        console.log("date: " + date + " " + dateString)
    }

    function closeModal()
    {
        props.close()
    }

    function myOkay(){

        if(props.type == "add" && addDay != "")
        {

            let request = {
                date: addDay,
                name: "blocked day"
            }

            addBlockedDay(request)
                .then((response) =>{
                    notification.success({
                        message: "Day Successfully Blocked",
                        description: addDay + " was blocked from scheduling"
                    });
            })
            .catch((error)=>{
                notification.error({
                    message: "Day was not Blocked",
                    description: error.message || "Something went wrong!"
                })
            })
        }
        else if(props.type == "remove")
        {

            console.log("To be delete" + JSON.stringify(props.delete));

            if(props.delete != undefined)
            {

                for(let i =0; i < props.delete.length; i++)
                {

                    let request = {
                        date: props.delete[i].date,
                        id: props.delete[i].id,
                        name: "null"
                    }


                    editBlockedDay(request)
                    .then((response)=>{
                        notification.success({
                            message: "Successfully unblocked days",
                            description: request.date + " was blocked"
                        })
                    })
                        notification.error({
                            message: "Could not unblock days",
                            description: props.delete[i].date + " Could not be deleted"
                        })
                }

            }

            closeModal()
        }
    }


    return(
        <>
            <Modal 
                visible={props.show} 
                onCancel={closeModal}
                onOk={()=>myOkay()}
                closable
            >
                {props.type === "remove" ?
                    <>Are you sure you want to unblock the selected {props.delete.length} days?</>
                : props.type === "add" ?
                    <Div>
                        <div style={{marginBottom: "2%"}}>Select the day to be blocked:</div>
                        <div><DatePicker onChange={onChange}/></div>
                    </Div>
                :
                    <></>
                }
            </Modal>    
        </>
    )
}

export default DayBlockModal;