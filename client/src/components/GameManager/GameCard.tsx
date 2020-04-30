import React, { useState } from 'react';
import { Card, Button, notification } from 'antd';
import styled from 'styled-components';
import { apiUpdateGame } from '../../utility/APIGameControl'
import { useGlobalState, useDispatch } from './GMProvider';
import { sendAnEmail } from '../../common/email/email'
import { getAllUsers } from '../../utility/APIUtility'


const Title = styled.span`
font-weight: bold;
`;

const Div = styled.div`
    padding-top: 2vw;
    text-align: right;
`;

interface Props {
    game: any,
    index: any,
    role: string,
    onUpdate: any,
    change: any
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
            if (response[i].schoolname == a) {

                desiredEmail = response[i].email;
                //sendAnEmail(desiredEmail, contents + d);

            }
        }
        sendAnEmail(desiredEmail, contents + d);

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname == h) {

                for (let j = 0; j < assignorarray.length; j++) {

                    if (response[i].district === assignorarray[j].district) {
                       // desiredEmail2 = response[i].email;
                        //assignorEmail = assignorarray[j].email;
                    }

                }

            }

            // sendAnEmail(desiredEmail2, contents + d);
            // sendAnEmail(assignorEmail, contents + d);
        }
        sendAnEmail(desiredEmail2, contents + d);
        sendAnEmail(assignorEmail, contents + d);

    })
    console.log('-=-=AWAYEMAIL' + desiredEmail)
    console.log('-=-=HOMEEMAIL' + desiredEmail2)
    console.log('-=-=ASSIGNOREMAIL' + assignorEmail)

    sendAnEmail(desiredEmail, contents + d);
    sendAnEmail(desiredEmail2, contents + d);
    sendAnEmail(assignorEmail, contents + d);

}

const grabEmail = (h: any, a: any, d: any, contents: any) => {
    let desiredEmail = "";
    let desiredEmail2 = "";

    getAllUsers().then((response) => {


        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname == a) {

                // desiredEmail = response[i].email;
                // sendAnEmail(desiredEmail, contents + d);

            }
        }

        for (let i = 0; i < response.length; i++) {
            if (response[i].schoolname == h) {

                // desiredEmail = response[i].email;
                // sendAnEmail(desiredEmail, contents + d);

            }
        }

    }

    )
}

const seasonStart = new Date("2020/02/20");


const GameCard = (props: Props) => {

    const [color, setColor] = useState("white")
    const [counter, setCounter] = useState(0)
    const dispatch = useDispatch();

    const handleEdit = (game: any) => {

        dispatch({ type: 'EDIT_GAME', payload: [game.title, game.start, game.location, game.teamLevel, game.gender, game.home, game.away, game.status, game.id] });
        console.log("ID = " + game.id + " HomeTeam = " + game.home + ' start: ' + game.start);
    }

    const handleConfirm = (game: any) => {

        console.log("ID" + game.id)
        let addMessage = "Games successfully Scheduled";

        let update = {
            id: game.id,
            status: "assignorPending",
            location: game.location,
            level: game.teamLevel,
            gender: game.gender,
            date: game.start

        }

        if (props.role != "ROLE_USER") {
            update.status = "scheduled"
        }
        else {

            //Calculating the number of days between the game date and the season start
            let gameDate: Date = new Date(update.date);
            let difference = seasonStart.getTime() - gameDate.getTime()
            let numofDays = difference / (1000 * 3600 * 24);

            //if Game is scheduled more than a week away from season start, set status to scheduled, 
            // else send it to the assignor
            if (numofDays >= 7) {
                update.status = "scheduled"
            }
            else {
                update.status = "assignorPending";
                addMessage = "Game Successfully sent to  Assignor";
            }

        }

        if (addMessage === ('Games successfully Scheduled')) {
            grabEmail(game.home, game.away, game.start, "Your game was approved and will take place on")

        }

        apiUpdateGame(update)
            .then((response) => {
                notification.success({
                    message: "Game Confirmed",
                    description: addMessage
                })
                props.onUpdate(props.change + 1)
            })
            .catch((error) => {
                notification.error({
                    message: "Game Was Not Confirmed",
                    description: error
                })
            })


    }

    const handleDelete = (game: any) => {

        let update = {
            id: game.id,
            status: "deleted",
            location: game.location,
            level: game.teamLevel,
            gender: game.gender,
            date: game.start
        }

        apiUpdateGame(update)
            .then((response) => {
                notification.success({
                    message: "Game Deleted",
                    description: "Game was successfully deleted"
                })
            })
            .catch((error) => {
                notification.error({
                    message: "Game Was Not deleted",
                    description: error
                })
            })

        props.onUpdate(0)
    }

    const handleCancel = (game: any) => {
        let update = {
            id: game.id,
            status: "cancelled",
            location: game.location,
            level: game.teamLevel,
            gender: game.gender,
            date: game.start


        }

        grabEmail2(game.home, game.away, game.start, "An existing game has now been cancelled.  It was scheduled for ")



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

        props.onUpdate(0)
    }


    const pendingButtons = (game: any) => {
        return (
            <>
                <Button style={{ background: "#52c41a" }} onClick={() => handleConfirm(game)}><i className="fas fa-check"></i></Button>
                <Button style={{ background: "#1890ff" }} onClick={() => handleEdit(game)}><i className="fas fa-edit"></i></Button>
                <Button style={{ background: "#f5222d" }} onClick={() => handleDelete(game)}><i className="fas fa-trash-alt"></i></Button>
            </>
        )
    }

    const scheduledButtons = (game: any) => {
        return (
            <>
                <Button style={{ background: "#1890ff" }} onClick={() => handleEdit(game)}><i className="fas fa-edit"></i></Button>
                <Button style={{ background: "#f5222d" }} onClick={() => handleCancel(game)}><i className="fas fa-times-circle"></i></Button>
            </>
        )
    }


    const cardStyle = {
        margin: '2%',
        background: color,
        borderStyle: 'solid',
        borderColor: 'black'
    }

    const game = props.game


    if (props.index % 2 === 0 && counter === 0) {
        setColor("#A8A8A8")
        setCounter(counter + 1)
    }

    return (
        props.game === undefined ?
            <>THERE ARE NO GAMES </>
            :

            <>
                <Card title={game.home + " vs " + game.away} style={cardStyle} >
                    <Title>Home:</Title> {game.home} <Title>Away:</Title> {game.away} <Title>Level: </Title> {game.teamLevel}
                    <Title>Date and Time:</Title> {game.start} <Title>Location:</Title> {game.location} <Title>Gender:</Title> {game.gender}

                    <Div>
                        {game.status == "coachPending" || (game.status == "assignorPending" && props.role != "ROLE_USER") ?
                            <>
                                {pendingButtons(game)}
                            </>
                            : game.status == "scheduled" ?
                                <>
                                    {scheduledButtons(game)}
                                </>
                                : game.status == "assignorPending" ?
                                    <></>
                                    :
                                    <></>
                        }
                    </Div>
                </Card>
            </>
    );
}

export default GameCard;