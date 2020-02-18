import React from 'react';
import {Card} from 'antd';
import data from '../components/fake.json';
import styled from 'styled-components';

const Title = styled.span`
font-weight: bold;
`;



const editGame = data.pendingGames.map(({home,away,level,date,time,location}) =>
                    <Card title={home + " vs " + away}>
                        <Title>Home:</Title> {home} <Title>Away:</Title> {away} <Title>Level</Title> {level} 
                        <Title>Date:</Title> {date} <Title>Time: </Title> {time} <Title>Location:</Title> {location}
                    </Card>);

                    

const newGames = data.needsConfirming.map(({home,away,level,date,time,location}) =>
                    <Card title={home + " vs " + away}>
                        <Title>Home:</Title> {home} <Title>Away:</Title> {away} <Title>Level</Title> {level} 
                        <Title>Date:</Title> {date} <Title>Time: </Title> {time} <Title>Location:</Title> {location}
                    </Card>);


const PendingGames = ({gameType}:any )=>{

    return(
        <div>
            {
            gameType == "new" ?
            newGames
            :
            editGame
            } 
        </div>
    );

}

export default PendingGames;