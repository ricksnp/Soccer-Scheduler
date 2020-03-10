import React, { useState } from 'react';
import { Header, SubHeader } from '../../style/PageStyles';
import { Card } from '../../../node_modules/antd';
import data from '../../components/fake.json';
import { PendingGames } from '../../components'


const Assignor = () => {

    const [key, setKey] = useState("new");


    const editGame = data.needsConfirming.forEach(({ home, away, level, date, time, location }) =>
        <div>
            Home: {home} Away: {away} level: {level} Date: {date} Time: {time} Location: {location}
        </div>);

    const tabList = [
        {
            key: 'new',
            tab: 'New Games',
        },
        {
            key: 'edit',
            tab: 'Edited Games',
        },
    ];

    function onTabChange({ key }: any) {
        setKey(key)
    }

    return (
        <>
            <Header>Assignor Panel</Header>

            <Card
                style={{ width: '90%' }}
                // title="Needs Approval"
                tabList={tabList}
                activeTabKey={key}
                onTabChange={key => {
                    setKey(key);
                }}
            >
                {key === "new" && <PendingGames gameType={key} />}
                {key === "edit" && <PendingGames gameType={key} />}

            </Card>
        </>
    );

}

export default Assignor;