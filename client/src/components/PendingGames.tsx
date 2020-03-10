import React from 'react';
import { Card } from 'antd';
import data from '../components/fake.json';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const Title = styled.span`
font-weight: bold;
`;

const test = (e: any) => {
    console.log(e.currentTarget.getAttribute('data-id'));
}

const editGame = data.pendingGames.map(({ id, home, away, level, date, time, location }) =>
    <Card title={home + " vs " + away}>
        <Title>Home:</Title> {home}
        <Title>Away:</Title> {away}
        <Title>Level</Title> {level}
        <Title>Date:</Title> {date}
        <Title>Time: </Title> {time}
        <Title>Location:</Title> {location}
        <span className="btns-aprove">
            <Button onClick={test} data-id={id} variant="contained" color="primary">
                <i className="far fa-edit"></i>
            </Button>
            <Button onClick={test} data-id={id} variant="contained" color="secondary">
                <i className="fas fa-ban"></i>
            </Button>
            <Button onClick={test} data-id={id} variant="contained" color="primary">
                <i className="fas fa-check"></i>
            </Button>
        </span>

    </Card>);

const newGames = data.needsConfirming.map(({ id, home, away, level, date, time, location }) =>
    <Card title={home + " vs " + away}>
        <Title>Home:</Title> {home}
        <Title>Away:</Title> {away}
        <Title>Level</Title> {level}
        <Title>Date:</Title> {date}
        <Title>Time: </Title> {time}
        <Title>Location:</Title> {location}
        <span className="btns-aprove">
            <Button onClick={test} data-id={id} variant="contained" color="primary">
                <i className="far fa-edit"></i>
            </Button>
            <Button onClick={test} data-id={id} variant="contained" color="secondary">
                <i className="fas fa-ban"></i>
            </Button>
            <Button onClick={test} data-id={id} variant="contained" color="primary">
                <i className="fas fa-check"></i>
            </Button>
        </span>
    </Card >);

const PendingGames = ({ gameType }: any) => {

    return (
        <>
            {
                gameType == "new" ?
                    newGames
                    :
                    editGame
            }
        </>
    );

}

export default PendingGames;