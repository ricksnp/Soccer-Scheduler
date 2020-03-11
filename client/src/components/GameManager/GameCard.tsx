import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const Title = styled.span`
font-weight: bold;
`;

interface Props {
    game: any
}

const GameCard = ( props: Props ) => {

    const game = props.game

    return(
        props.game === undefined ?
        <>THERE ARE NO GAMES </>
        :

        <Card title={game.home + " vs " + game.away}>
            <Title>Home:</Title> {game.home} <Title>Away:</Title> {game.away} <Title>Level</Title> {game.level}
            <Title>Date:</Title> {game.date} <Title>Time: </Title> {game.time} <Title>Location:</Title> {game.location}
        </Card>
    );
}

export default GameCard;