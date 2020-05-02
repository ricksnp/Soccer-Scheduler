import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, notification } from 'antd';
import { useGlobalState, useDispatch } from './Provider';
import GameForm from './GameForm';
import EventDisplay from './EventDisplay';
import { postGames, apiUpdateGame } from '../../utility/APIGameControl';
import { getCurrentUser } from '../../utility/APIUtility'
import { userInfo } from 'os';
import { sendAnEmail } from '../../common/email/email'
import { getAllUsers } from '../../utility/APIUtility'
import Conflict from './Conflict';

const openNotification = () => {
    notification.open({
        message: 'Not a participant',
        description: 'You cannot edit a game in which your team is not a participant.'
    })
}

const baseGame = {homeTeamName: "null", awayTeamName: "null", teamLevel: "null", gender: "null", location: "null", status: "null", date: "null"}
const CalendarModal = (user: any, school: any, setUpdate: any, onUpdate: any, change: any, setChange: any) => {
    const showAddGame = useGlobalState('showAddGame');
    const showViewGame = useGlobalState('showViewGame');
    const showEditGame = useGlobalState('showEditGame');
    const clickedEvent = useGlobalState('clickedGame');
    const visible = showAddGame || showViewGame || showEditGame ? true : false;
    const dispatch = useDispatch();

    const [conflict, setConflict] = useState(false);
    const [newGame, setNewGame] = useState(baseGame);
    const [gameID, setID] = useState(0)


    const [gameForm, setGameForm] = useState(React.createRef());

    const schoolName = user.user.schoolname;
    const role = user.user.role;

    console.log( clickedEvent )


    const saveForm = (form: any) => {
        setGameForm(form);
    }


    //handles when user cancels game
    const handleCancelGame = (game: any) => {

        //confirmationModal();
        let currentDate;

        const dateTime = getDate(game[1]) + 'T' + getTime(game[1])

        let update = {
            id: game[8],
            status: "cancelled",
            location: game[2],
            level: game[3],
            gender: game[3],
            date: dateTime
        }

        //is this game w/in a week? if yes, display modal saying to contact assignor

        // ** */
        // grabEmail2(game.home, game.away, game.start, "An existing game has now been cancelled.  It was scheduled for ")
        // ** */

        apiUpdateGame(update)
            .then((response) => {
                notification.success({
                    message: "Game Cancelled",
                    description: "Game was successfully cancelled"
                })
            })

            .catch((error) => {
                notification.error({
                    message: "Game Was Not Cancelled",
                    description: error
                })
            })

        dispatch({ type: 'CLOSE_VIEW_GAME' })

    }

    //handles when user closes/clicks outside of modal
    const handleCancelModal = () => { 
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

    const createEditGame = () => {
        if ( showViewGame ) {
            dispatch({ type: 'EDIT_GAME', payload: clickedEvent })
        } 
    }
    
    const handleOk = () => {
        if (showAddGame) {
            // @ts-ignore
            gameForm.validateFields((err: any, values: any) => {
                if (err) {
                    return;
                }


                //@ts-ignore
                const dateObj = gameForm.getFieldValue("time")._d;
                const dateObjSplit = JSON.stringify(dateObj).split('T');
                const timeArraySplit = dateObjSplit[1].split('.')
                const timeArray = timeArraySplit[0].split(':')
                const correctedHour = JSON.stringify(parseInt(timeArray[0], 10) - 5);
                const selectedTime = correctedHour + ":" + timeArray[1];


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
                    date: gameForm.getFieldValue("date") + 'T' + selectedTime,
                }


                setNewGame(game);


                //send to backend
                postGames(game)
                    .then((response) => {
                        if(response.success)
                        {
                            let mess = response.message
                            if(response.message != undefined && mess.includes("arning"))
                            {
                                let splitter = mess.split(" ");
                                setID(splitter[0])
                                setConflict(true);
                            }
                            else{

                                notification.success({
                                    message: "Game Added",
                                    description: response.message
                                })
                            }
                        }
                        else
                        {
                            if(response.message != undefined && response.message.includes("onflict"))
                            {
                                notification.error({
                                    message: "Game Not Added",
                                    description: "There is a scheduling conflict, try chagning the date or time" 
                                })
                            }
                            notification.error({
                                message: "Game was not added",
                                description: response.message
                            })
                        }
                        
                        //  grabEmail(game);
                        //  console.log("RESPONSE: " + JSON.stringify(response))

                    })
                    .catch((error) => {
                        notification.error({
                            message: "Game Add Failed",
                            description: error.message || "Game was not added"
                        })
                    })

                // @ts-ignore
                gameForm.resetFields();
                dispatch({ type: 'CLOSE_ADD_GAME' })
            });
        }

        if (showEditGame) {
            // @ts-ignore
            gameForm.validateFields((err: any, values: any) => {
                if (err) {
                    return;
                }

                //@ts-ignore
                const dateObj = gameForm.getFieldValue("time")._d;
                const dateObjSplit = JSON.stringify(dateObj).split('T');
                const timeArraySplit = dateObjSplit[1].split('.')
                const timeArray = timeArraySplit[0].split(':')
                const correctedHour = JSON.stringify(parseInt(timeArray[0], 10) - 5);
                const selectedTime = correctedHour + ":" + timeArray[1];


                let status = setStatus( schoolName, clickedEvent[5], clickedEvent[6], role );
                // @ts-ignore
                let gender = gameForm.getFieldValue("gender");
                // @ts-ignore
                let level = gameForm.getFieldValue('teamLevel');

                console.log(clickedEvent);

                const game = {
                    // @ts-ignore
                    homeTeamName: gameForm.getFieldValue("homeTeamName"),
                    // @ts-ignore
                    awayTeamName: gameForm.getFieldValue("awayTeamName"),
                    // @ts-ignore
                    teamLevel: level,
                    // @ts-ignore
                    gender: gameForm.getFieldValue('gender'),
                    // @ts-ignore
                    location: gameForm.getFieldValue("location"),
                    // @ts-ignore
                    status: status,
                    // @ts-ignore
                    date: gameForm.getFieldValue('date') + 'T' + selectedTime,
                    // @ts-ignore
                    id: clickedEvent[8]
                }

                //@ts-ignore
                    console.log("level: " + gameForm.getFieldValue("teamLevel") + "gender: " + gameForm.getFieldValue("gender"))
                    console.log(game)

                //send to backend
                apiUpdateGame(game)
                .then((response)=>{
                    notification.success({
                        message: "Game Edited",
                        description: response.message
                    })
                })
                .catch((error)=>{
                    notification.error({
                        message: "Game Edit Failed",
                        description: error.message,
                        duration: 10
                    })
                })


                // @ts-ignore
                gameForm.resetFields();
                dispatch({ type: 'CLOSE_EDIT_GAME' })
            });
        }
    }

    const approveGame = ( role: string, school: string, game: any) => {

        //is this game w/in a week? if yes, display modal saying to contact assignor
        
        let update;

        if ( role === 'ROLE_USER' && ( game[7] === 'awayEdit' && game[5] === school ) || ( ( game[7] === 'homeEdit' || game[7] === 'coachPending' ) && game[6] === school ) ){
            const dateTime = getDate(game[1]) + 'T' + getTime(game[1])

            update = {
                id: game[8],
                status: "assignorPending",
                location: game[2],
                level: game[3],
                gender: game[3],
                date: dateTime
            }

            console.log(update);

            apiUpdateGame(update)
            .then((response) => {
                notification.success({
                    message: "Game Approved",
                    description: "Game has been sent to assignor for approval"
                })
            })
    
            .catch((error) => {
                notification.error({
                    message: "Game not approved",
                    description: error
                })
            })

            // ** */
            // grabEmail2(game.home, game.away, game.start, "An existing game has now been cancelled.  It was scheduled for ")
            // ** */

        } else if ( role !== 'ROLE_USER' ) {
            const dateTime = getDate(game[1]) + 'T' + getTime(game[1])

            update = {
                id: game[8],
                status: "scheduled",
                location: game[2],
                level: game[3],
                gender: game[3],
                date: dateTime
            }
            console.log(update)

            apiUpdateGame(update)
            .then((response) => {
                notification.success({
                    message: "Game Scheduled",
                    description: "Game has been scheduled"
                })
            })
    
            .catch((error) => {
                notification.error({
                    message: "Game not scheduled",
                    description: error
                })
            })

            // ** */
            // grabEmail2(game.home, game.away, game.start, "An existing game has now been cancelled.  It was scheduled for ")
            // ** */
        }

        dispatch({ type: 'CLOSE_VIEW_GAME' })
    }

    return (
        <>
        <Modal
            visible={visible}
            closable
            maskClosable={true}
            onCancel={handleCancelModal}
            onOk={handleOk}
            cancelButtonProps={{ style: { display: 'none' } }}
            footer={[
                <Button 
                    key="confirm" 
                    onClick={ (e) => approveGame( role, schoolName, clickedEvent )}
                    hidden={ confirmHidden( showViewGame, clickedEvent[7], schoolName, clickedEvent[5], clickedEvent[6], role ) } 
                    style={{ color: '#119c21', borderColor: '#1ddb33' }}
                    >
                        Approve Game
                </Button>,
                <Button 
                    key="submit-edit" 
                    onClick={ (e) => {showEditGame || showAddGame ?  handleOk() : createEditGame() }}
                    hidden={ editHidden( schoolName, clickedEvent[5], clickedEvent[6], role, clickedEvent[7] ) }
                    style={{ color: '#0006b0', borderColor: '#383fff' }}
                    > 
                    { editButtonText( showViewGame )} 
                </Button>,
                <Button 
                    key="cancel" 
                    onClick={(e) => handleCancelGame(clickedEvent)} 
                    hidden={cancelHidden( schoolName, clickedEvent[5], clickedEvent[6], role, clickedEvent[7], showViewGame )}
                    style={{ color: '#b80d0d', borderColor: '#fc3f3f'  }}
                    >
                        Cancel Game
                </Button>
            ]}
        >
            {showAddGame && <GameForm ref={saveForm} />}
            {showEditGame && <GameForm ref={saveForm} />}
            {showViewGame && <EventDisplay event={clickedEvent} school={user.user.schoolname} />}
        </Modal>
        <Conflict showConflict={conflict} game={newGame} id={gameID} setConflict={setConflict} role={user.role}/>
        </>
    );
}





/** 
 * Modal Buttons
*/
//is viewGame modal open? if yes, don't hide confirm button. is the game sched? hide it. am i a participant? show it
const confirmHidden = ( viewGame: boolean , status: string, school: string, home: string, away: string, role: string ) => {

    let viewClosed;
    let scheduled;
    let pendingAssignor;
    let participant;
    

    if ( role === 'ROLE_USER' ) {
        let cancelled = status !== 'cancelled' ? false : true;
        viewClosed = viewGame === true ? false : true;
        scheduled = status !== 'scheduled' ? false : true;
        participant = school === home || school === away ? false : true;
        let myTurn = ( status: string, home: string, away: string, school: string ) => {
            let myPending = status === 'coachPending' && school === away ? false : true;
            let myEdit = (status === 'awayEdit' && school === home) || (status === 'homeEdit' && school === away) ? false : true;

            return ( myPending && myEdit )
        }

        return ( cancelled || viewClosed || scheduled || participant || myTurn(status, home, away, school) )

    } else {
        viewClosed = viewGame === true ? false : true;
        scheduled = status !== 'scheduled' ? false : true;
        pendingAssignor = status === 'assignorPending' ? false : true;

        return (viewClosed || scheduled || pendingAssignor)
    }
}

//if i am not a part of the game or i am a coach, hide cancel game button
const cancelHidden = ( school: string, home: string, away: string, role: string, status: string, viewGame: boolean ) => {

    let cancelled;
    let participant;
    let viewClosed;

    if ( role === 'ROLE_USER' ) {
        cancelled = status !== 'cancelled' ? false : true;
        viewClosed = viewGame === true ? false : true;
        participant = school === home || school === away ? false : true;

        return ( cancelled || viewClosed || participant )

    } else {
        cancelled = status !== 'cancelled' ? false : true;
        viewClosed = viewGame === true ? false : true;

        return ( cancelled || viewClosed )
    }
}

const editHidden = ( school: string, home: string, away: string, role: string, status: string ) => {

    let cancelled;

    if ( home === undefined ) {
        return ( false );
    } else if ( role === 'ROLE_USER' ) {
        cancelled = status !== 'cancelled' ? false : true;
        let participant = school === home || school === away ? false : true;

        return ( cancelled || participant );

    } else {
        cancelled = status !== 'cancelled' ? false : true;
        let assignorEdit = status === 'scheduled' || status === 'assignorPending' ? false : true;

        return ( cancelled || assignorEdit );
    }
}

//is viewGame modal open? if yes, edit game. otherwise submit game
const editButtonText = ( viewGame: boolean ) => {
    return viewGame === true ? 'Edit Game' : 'Submit Game';
}

//are you sure you want to cancel this game modal
const confirmationModal = () => {
    return (
        <Modal />
    );
}

/**
 * Setters
 */
const setStatus = ( mySchool: string, home: string, away: string, role: string ) => {
    
    let status;

    //home team edited game
    if( home === mySchool ) {
        status = "homeEdit"
    } 
    //away team edited game
    else if ( away === mySchool ) {
        status = "awayEdit"
    }
    else if ( role !== 'ROLE_USER' ) {
        status = "scheduled"
    }
    
    return status;
}


/**
 * Getters
 */
const getDate = ( dateVar: Date ) => {
    const year = dateVar.getFullYear();
    const month = dateVar.getMonth() + 1;
    const day = dateVar.getDate();

    const date = year + '-' + month + '-' + day ;
    return date;
}

const getTime = ( dateVar: Date ) => {
    const time = dateVar.getHours() + ':' + dateVar.getMinutes();
    
    return time
}


/**
 * Email functions
 */

const emailContents = (away: string, on: string) => {
    return "<h2>PENDING GAME CONFIRMATION:</h2>" +
        "You have a new game to confirm against " +
        away + " on " + on
}

const grabEmail = (game: any) => {
    let desiredEmail = "";
    getAllUsers().then((response) => {

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname == game.awayTeamName) {
                desiredEmail = response[i].email;
                sendAnEmail(desiredEmail, emailContents(game.awayTeamName, game.date));
            }
        }
    })
}

const grabEmail2 = (h: any, a: any, d: any, contents: any) => {
    let desiredEmail = "";
    let desiredEmail2 = "";
    let assignorEmail = "";
    let assignorarray: any[] = [];
    getAllUsers().then((response) => {

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname === "Assignor") {
                assignorarray.push(response[i])
            }
        }

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname === a) {
                desiredEmail = response[i].email;
            }
        }
        sendAnEmail(desiredEmail, contents + d);

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname === h) {

                for (let j = 0; j < assignorarray.length; j++) {

                    if (response[i].district === assignorarray[j].district) {
                        desiredEmail2 = response[i].email;
                        assignorEmail = assignorarray[j].email;
                    }
                }
            }
        }
    })
    sendAnEmail(desiredEmail, contents + d);
    sendAnEmail(desiredEmail2, contents + d);
    sendAnEmail(assignorEmail, contents + d);
}




export default CalendarModal;
//confirm button not visible when adding new ame