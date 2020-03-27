import React from 'react';
import { Card, Button} from 'antd';
import styled from 'styled-components';
import {apiUpdateGame} from '../../utility/APIGameControl'

const Wrapper = styled.div`
border:"10px" 
border-color:"black"

`;


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
        id: "42",
        status: "Scheduled"

    }

    apiUpdateGame(update)
    //console.log("ID = " + game.id + " HomeTeam = " + game.home);
}

const handleEdit = (game: any) =>{

    console.log("ID = " + game.id +" HomeTeam = " + game.home);
}

const handleDelete = (game: any) =>{

    console.log("ID = " + game.id + " HomeTeam = " + game.home);
}




const GameCard = ( props: Props ) => {

    const game = props.game

    let color = "white";

    if(props.index % 2 == 0)
    {
        color = "grey"
    }

    return(
        props.game === undefined ?
        <>THERE ARE NO GAMES </>
        :

        <>
            <Card title={game.home + " vs " + game.away}>
                <Title>Home:</Title> {game.home} <Title>Away:</Title> {game.away} <Title>Level</Title> {game.level}
                <Title>Date:</Title> {game.date} <Title>Time: </Title> {game.time} <Title>Location:</Title> {game.location}
                <Div>
                    <Button style={{background:"#52c41a"}} onClick={()=>handleConfirm(game)}><i className="fas fa-check"></i></Button>
                    <Button style={{background:"#1890ff"}} onClick={()=>handleEdit(game)}><i className="fas fa-edit"></i></Button>
                    <Button style={{background:"#f5222d"}} onClick={()=>handleDelete(game)}><i className="fas fa-trash-alt"></i></Button>
                </Div>
            </Card>
        </>
    );
}

export default GameCard;