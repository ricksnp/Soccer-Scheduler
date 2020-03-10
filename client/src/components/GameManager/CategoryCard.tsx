import React, { useState } from 'react';
import { Card } from 'antd';
import { Header, SubHeader } from '../../style/PageStyles';
import GameCard from './GameCard';


//sorts pending games based on status
function sortGames (games: any) {
    let edit = [];
    let newGames: any = [];
    for ( let i = 0; i < games.length; i++ ) {
    
         edit.push(games[i]);
         console.log("GAMES: " + games[i]);

    }

    return { "edited": edit, "new": newGames }
}

interface Props {
    category: string,
    games: any
}

const CategoryCard = ( props: Props ) => {

    //depending on category of curret card, gamesList is assigned list(s) of games
    const gamesList = props.category === 'Pending Approval' ?
         sortGames(props.games)
    :
        props.games;
    

    const [key, setKey] = useState("new");
    const handleTabChange = () => {
        key === "new"? 
            setKey('edit')
        :
            setKey("new");
    }


    //if current category is pending approval, add tabs to category card
    const tabList = props.category === "Pending Approval" ?
        [
            {
                key: 'new',
                tab: 'New Games',
            },
            {
                key: 'edit',
                tab: 'Edited Games',
            },
        ]
    :
        [];

    //contains list of new games or message
    const listNew = gamesList.new === undefined?
        "No new games have been created"
    :
        gamesList.new.map((game: any, i: any) => {
            return(
                <GameCard game={game} />
            );
        })
    
    //contains list of edited games or message
    const listEdit = gamesList.edited === undefined?
        "No games have been edited"
    :
        gamesList.edited.map((game: any, i: any) => {
            return(
                <GameCard game={game} />
            );
        })

    //contains list of scheduled games
    const listScheduled = gamesList === undefined?
        "No games have been scheduled"
    :
        props.games.map((game: any, i: any) => {
            return(
                <GameCard game={game} />
            );
        })

    return(
        <Card
            style={{ width: '90%' }}
            title={props.category}
            tabList={tabList}
            activeTabKey={key}
            onTabChange={handleTabChange}
        >
            { props.category === 'Pending Approval'? 
                key === "new" ? 
                    listNew
                :
                    listEdit
            :
                listScheduled               
        } 
            
        </Card>
    );

}

export default CategoryCard;