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
    index: any,
    role: string
}

const seasonStart = new Date("2020/02/20");


const GameCard = ( props: Props ) => {

    const [color, setColor] = useState("#484848")
    const [counter, setCounter] = useState(0)
    const dispatch = useDispatch();

    const handleEdit = (game: any) =>{

        dispatch({ type: 'EDIT_GAME', payload: [game.title, game.start, game.location, game.teamLevel, game.gender, game.home, game.away, game.status, game.id] });
        console.log("ID = " + game.id +" HomeTeam = " + game.home);
    }

    const handleConfirm = (game: any) =>{

        console.log("ID" + game.id)
        let update = {
            id: game.id,
            status: "assignorPending",
            location: game.location,
            level: game.teamLevel,
            gender: game.gender,
            date: game.start
    
        }

        if(props.role != "ROLE_USER")
        {
            update.status = "scheduled"
        }
        else{
            
            //Calculating the number of days between the game date and the season start
            let gameDate:Date = new Date(update.date);
            let difference = seasonStart.getTime() - gameDate.getTime()
            let numofDays = difference / (1000 * 3600 * 24); 

            //if Game is scheduled more than a week away from season start, set status to scheduled, 
            // else send it to the assignor
            if(numofDays >= 7)
            {
                update.status = "scheduled"
            }
            else{
                update.status = "assignorPending"
            }

            console.log("days till season start from game: " + numofDays)
        }

        console.log("UPDATE" + JSON.stringify(update))
    
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
            status: "cancelled",
            location: game.location,
            level: game.teamLevel,
            gender: game.gender,
            date: game.start
    
        }
    
        apiUpdateGame(update)
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
    

    const cardStyle = {
        margin: '2%',
        background: color,
        borderStyle: 'solid',
        borderColor: 'black'
    }

    const game = props.game


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
            <Card title={game.home + " vs " + game.away} style={cardStyle} >
                <Title>Home:</Title> {game.home} <Title>Away:</Title> {game.away} <Title>Level: </Title> {game.teamLevel}
                 <Title>Date and Time:</Title> {game.start} <Title>Location:</Title> {game.location}
                
                <Div>
                {game.status =="coachPending" || game.status == "assignorPending" ? 
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