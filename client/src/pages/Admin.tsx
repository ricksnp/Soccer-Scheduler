import React, {useState} from 'react';
import {Header, SubHeader} from '../style/PageStyles';
import {Card} from 'antd';
import data from '../components/fake.json';


const Admin = () => {

    const [key, setKey] = useState("new");


const editGame = data.needsConfirming.forEach(({home,away,level,date,time,location}) =>
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

      
      function onTabChange({key}:any) {
          setKey(key)
      }


    return(
        <div>
            <Header>Needs Approval</Header>
            <SubHeader>New Games:</SubHeader>

            <Card
                style={{ width: '100%' }}
                title="Needs Approval"
                tabList={tabList}
                activeTabKey={key}
                onTabChange={key => {
                    console.log("KEY" + key)
                    onTabChange(key);
                }}
                >
                {key === "new" ? 
                    <Card></Card>
                : 
                    <Card>
                        {/* {data.needsConfirming.forEach(({home,away,level,date,time,location}) =>
                        
                        <div>
                             Home: {home} Away: {away} level: {level} Date: {date} Time: {time} Location: {location}
                    </div>)*/}

                    </Card>
                }

            </Card>

        </div>
    );
    
}

export default Admin;