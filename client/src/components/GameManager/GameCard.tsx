import React, {useState} from 'react';
import { Card, Button} from 'antd';
import styled from 'styled-components';
import {apiUpdateGame} from '../../utility/APIGameControl'
import { useGlobalState, useDispatch } from './GMProvider';


const Title = styled.span`
font-weight: bold;
`;

const Div = styled.div`
    padding-top: 2vw;
    text-align: right;
`;

interface Props {
    game: any,
    index: any
}


const handleConfirm = (game: any) =>{

    let update = {
        id: game.id,
        status: "scheduled",
        location: game.location,
        level: game.teamLevel,
        gender: game.gender,
        date: game.start

    }

    console.log(update);
    apiUpdateGame(update)


}

const handleDelete = (game: any) =>{

    let update = {
        id: game.id,
        status: "deleted",
        location: game.location,
        level: game.teamLevel,
        gender: game.gender,
        date: game.start

    }

    apiUpdateGame(update)
}

const handleCancel = (game: any)=>{
    let update = {
        id: game.id,
        status: "canceled",
        location: game.location,
        level: game.teamLevel,
        gender: game.gender,
        date: game.start

    }

    apiUpdateGame(update)
}

const GameCard = ( props: Props ) => {

    const [color, setColor] = useState("#484848")
    const [counter, setCounter] = useState(0)
    const dispatch = useDispatch();

    const handleEdit = (game: any) =>{

        dispatch({ type: 'EDIT_GAME', payload: [game.title, game.start, game.location, game.teamLevel, game.gender, game.home, game.away, game.status, game.id] });
        console.log("ID = " + game.id +" HomeTeam = " + game.home);
    }

    const pendingButtons =(game:any)=>{ 
        return( 
            <>
                <Button style={{background:"#52c41a"}} onClick={()=>handleConfirm(game)}><i className="fas fa-check"></i></Button>
                <Button style={{background:"#1890ff"}} onClick={()=>handleEdit(game)}><i className="fas fa-edit"></i></Button>
                <Button style={{background:"#f5222d"}} onClick={()=>handleDelete(game)}><i className="fas fa-trash-alt"></i></Button>
            </>
        )}
    
    const scheduledButtons =(game:any)=>{ 
        return( 
            <>
            <Button style={{background:"#1890ff"}} onClick={()=>handleEdit(game)}><i className="fas fa-edit"></i></Button>
            <Button style={{background:"#f5222d"}} onClick={()=>handleCancel(game)}><i className="fas fa-times-circle"></i></Button>
            </>
        )}

    const game = props.game

    console.log("INDEX: " + props.index)

    if(props.index % 2 == 0 && counter == 0)
    {
        setColor("#A8A8A8")
        setCounter(counter+1)
    }

    return(
        props.game === undefined ?
        <>THERE ARE NO GAMES </>
        :

        <>
            <Card title={game.home + " vs " + game.away} style={{margin: '2%', background: color}} >
                <Title>Home:</Title> {game.home} <Title>Away:</Title> {game.away} <Title>Level: </Title> {game.teamLevel}
                 <Title>Date and Time:</Title> {game.start} <Title>Location:</Title> {game.location}
                
                <Div>
                {game.status =="coachPending" ? 
                  <>
                  {pendingButtons(game)}
                  </>
                : game.status == "scheduled" ?
                <>
                   {scheduledButtons(game)}
                </>
                :
                <></>
                }
                </Div>
            </Card>
        </>
    );
}

export default GameCard;