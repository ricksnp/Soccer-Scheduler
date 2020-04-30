import React from 'react';
import {Modal, notification} from 'antd';
import {apiUpdateGame} from '../../utility/APIGameControl'

interface Props{
    showConflict: any,
    game: any,
    id: any,
    setConflict: any,
    role: any
}
const Conflict = (props: Props) =>{

    const Okay= () =>{

        let newGame ={
            homeTeamName: props.game.homeTeamName,
            awayTeamName: props.game.awayTeamName,
            status: "coachPending",
            id: props.id,
            gender: props.game.gender,
            teamLevel: props.game.teamLevel,
            location: props.game.location,
            date: props.game.date
        }
        if(props.role != "ROLE_USER")
        {
            newGame.status = "scheduled"
        }
        else
        {
            newGame.status = "coachPending"
        }

        apiUpdateGame(newGame).then((response)=>{
            notification.success({
                message: "Game was Scheduled",
                description: response.message
            })
        })
        .catch((error) =>{
            notification.error({
                message: "Could Not schedule game",
                description: error.message
            })
        })
        props.setConflict(false)
    }

    const Cancel = () =>{

        let newGame ={
            homeTeamName: props.game.homeTeamName,
            awayTeamName: props.game.awayTeamName,
            status: "deleted",
            id: props.id,
            gender: props.game.gender,
            teamLevel: props.game.teamLevel,
            location: props.game.location,
            date: props.game.date
        }

        apiUpdateGame(newGame).then((response)=>{
            notification.success({
                message: "Game scheduling was cancelled",
                description: response.message
            })
        })
        .catch((error) =>{
            notification.error({
                message: "Could Not cancel scheduling game",
                description: "Delete the game from game manager on " + newGame.date
            })
        })


        props.setConflict(false)
    }
    return(
        <>
            <Modal 
                visible={props.showConflict}
                onOk={Okay}
                onCancel={Cancel}
            >
                The team you are trying to schedule with has a conflicting game, are you sure you want to schedule? 
            </Modal>
        </>
    )
}

export default Conflict;