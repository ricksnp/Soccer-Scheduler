import React, { useState, useEffect } from 'react';
import { CategoryCard } from '../../components/GameManager';
import { Header, SubHeader } from '../../style/PageStyles';
import { apiGetGames } from '../../utility/APIGameControl';
import { getGames } from '../../components/Calendar/Provider';
import { getCoachPending, getCoachSchedule, getTeamSchedule } from '../../components/Games';
import {Form, Select} from 'antd';

async function getNewGames(setNew: any) {

    await apiGetGames().then(response => {
        setNew(response);
    })
}

const NewAdmin = (userInfo: any) => {


    const initialResponse: any = [{
        status: "null",
        homeTeamName: "null",
        awayTeamName: "null",
        matchid: "null",
        date: "null",
        location: "null",
        teamLevel: "null",
        gender: "null"
    }]

    //holds list of json file fames
    const [user, setUser] = useState("coach");
    const [counter, setCounter] = useState(0);
    const [newResponse, setNew] = useState(initialResponse);
    const [newPending, setPending] = useState(initialResponse);
    const [newSchedulued, setScheduled] = useState(initialResponse);
    const [userSchool, setSchool] = useState(userInfo.user.schoolname)
 

    /*
    *   Used for testing, can be removed when schools are implemented in user accounts
    */
   const Option = Select.Option
   const teams: Array<string> = ["Neville", "West Monroe", "Ouachita" ]
   const teamOptions = teams.map((team, i) => {
       return (
           <Option value={team} key={i}>
               {team}
           </Option>
       );
   });
    const handleChange = (value:any) => {
        setCounter(counter-1)
       setSchool(value);

   }
   /***************************************************************************/


   console.log("NEWADMIN USERINFO: " + JSON.stringify(userInfo))

    if (counter === 0) {
        getNewGames(setNew);
        setCounter(counter + 1);
        setUser(userInfo.user.role)
    }


    //list of categories to display
    const categories = ['Pending Approval', 'Scheduled Games'];

    //store list of pending games based on user role
    const pendingGames = () => 
    {
        //if user is coach, get games where (status == coachpending || away edit) AND where "my" team is a part of game
        if (user === "ROLE_USER") 
        {
           
    
            if(newResponse[0].status !== 'null' && counter < 2)
            {
                getCoachPending(newResponse, setPending, userSchool)
                setCounter(counter + 1)
                console.log("Current" + JSON.stringify(newPending))
            }
        }
        // if user isn't coach, find games where status == assignorPending || assignoredit
        else {


        }

        console.log(JSON.stringify("NEWPENDING " + JSON.stringify(newPending)))
        return newPending
    }

    //store list of scheduled games based on user roll -- same as pending, different status requirements
    const scheduledGames = () => {

        if (user === "ROLE_USER") {
            
            console.log("COUNTER1:" + counter + " RES= " + newResponse[0].status);

            if(newResponse[0].status !== 'null' && counter < 2)
            {
                getTeamSchedule(newResponse, setScheduled, userSchool)
                setCounter(counter + 1)
                console.log("Scheduled" + JSON.stringify(newSchedulued))
            }
        }
        else
        {
            
        }

        return newSchedulued
    }


    //map game categories to be displayed (pending games v scheduled games)
    const displayCards = categories.map((categoryName, i) => {

        return (
            <>
                {newResponse.status === "null" ?

                    <div>There Are No Games</div>
                    :
                    <>
                    {console.log("INPENDING" + newPending) }
                        {categoryName === 'Pending Approval' &&
                            <CategoryCard 
                                category={categoryName} 
                                editGames={pendingGames()} 
                                scheduledGames={scheduledGames()}
                            />}
                    </>
                }
            </>
        );
    });


    return (
        <div>
            {console.log("USER ROLE: " + user)}

            <Form>
                <Form.Item label="Filter">
                    <Select showSearch onChange={handleChange} placeholder={"Your Games"}>
                        {teamOptions}
                    </Select>
                </Form.Item>
            </Form>
    <div>You are signed in as {userInfo.user.schoolname}</div>
            {displayCards}
        </div>
    );
}

export default NewAdmin;