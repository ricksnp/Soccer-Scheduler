import React, {useState} from 'react'
import {Button} from 'antd';
import { CSVLink } from 'react-csv';
import {apiGetGames} from '../../utility/APIGameControl';
import arbiter from '../../components/Arbiter.json';
import { setFlagsFromString } from 'v8';
import {getOnlyScheduledGames} from '../../components/Games';
import { schoolNames } from '../coach/components/autofill';

const header = [
    {label: "Date", key: "date"},
    {label: "Time", key: "time"},
    {label: "Level", key: "level"},
    {label: "Home-Team", key: "home"},
    {label: "Home-Level", key: "hLevel"},
    {label: "Away-Team", key: "away"},
    {label: "Away-Level", key: "aLevel"}
]

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


//FOR WHOEVER IS ABOUT TO EDIT THIS COMPONENT IM SO SORRY AND GOOD LUCK
const AssignorExport = (newData:any) => {

    const [csvData, setCSVData] = useState("");
    const [counter, setCounter] = useState(0);
    const [data, setData] = useState(initialResponse);
    const [scheduled, setScheduled] = useState(newData.newData);
    const [flag, setFlag] = useState(false)

    if(counter == 0)
    {
        console.log("newData: " + JSON.stringify(newData.newData))

        console.log("YEET2: " + JSON.stringify(scheduled))

    
        setCounter(counter + 1)

        let arbiterInfo:any = [];

        if(scheduled[0] != undefined && scheduled[0].status != 'null')
        {
            //arbiter map key = school name not for arbiter
            //value = level, gender, arbiter name
            const arbiterMap = new Map();
            
            for(let i = 0; i< arbiter.school.length; i++)
            {
                var newGen;
                var newL;

                if(arbiter.school[i].level == "varsity")
                {
                    newL = "v"
                }
                else if(arbiter.school[i].level == "any")
                {
                    newL = "a"
                }
                else{
                    newL = "jv"
                }

                if(arbiter.school[i].gender == "boys")
                {
                    newGen = "b"
                }
                else if(arbiter.school[i].gender == "any")
                {
                    newGen = "a"
                }
                else
                {
                    newGen = "g"
                }
                var key = arbiter.school[i].name + " " + newL + " " + newGen;
                var mapData = {level: arbiter.school[i].level, gender: arbiter.school[i].gender, arbiter: arbiter.school[i].arbiter }

                console.log("Key/value pair: " + key + " value: " + JSON.stringify(mapData) )
                arbiterMap.set(key, mapData)
            }

            const iterator = arbiterMap.keys()

            //newmap key = scheduled games home/awayteam name appended with scheduled game gender and level
            //returns => arbiter name
            const newMap = new Map();


            //Reading all keys in arbiterMap, comparing it to the scheduled game hometeam or awayTeam,
            // if the scheduled hometeam/awayteam matches 
            for(let i = 0; i < arbiterMap.size; i++)
            {
                var nextName = iterator.next().value;

                for(let j =0;j < scheduled.length; j++)
                {
                    //basic name in arbiter (not arbiter name)


                    if(scheduled[j] != undefined && nextName != undefined && (nextName.includes(scheduled[j].home)))
                    {
                        var newLevel = "jv";
                        var newgender = "boys"
                        var newObj = arbiterMap.get(nextName);

                        console.log("NewObj" + "key: " + nextName+ " value " + JSON.stringify(newObj))

                        if(scheduled[j].teamLevel == "v")
                        {
                            newLevel = "varsity"
                        }
                        if(scheduled[j].gender == "b")
                        {
                            newgender = "boys"
                        }
                        else if(scheduled[j].gender == "g")
                        {
                            newgender = "girls"
                        }


                        if(newObj.level == newLevel && newObj.gender == newgender)
                        {
                            let ourKey = scheduled[j].home + "" + scheduled[j].gender + "" + scheduled[j].teamLevel
                            console.log("OurKey" + ourKey)
                            newMap.set(ourKey , newObj.arbiter)
                        }
                    }
                    if (scheduled[j] != undefined && nextName != undefined && nextName.includes(scheduled[j].away))
                    {

                        var newLevel = "jv";
                        var newgender = "boys"
                        var newObj = arbiterMap.get(nextName);

                        console.log("NewObj" + "key: " + nextName+ " value " + JSON.stringify(newObj))

                        if(scheduled[j].teamLevel == "v")
                        {
                            newLevel = "varsity"
                        }
                        if(scheduled[j].gender == "b")
                        {
                            newgender = "boys"
                        }
                        else if(scheduled[j].gender == "g")
                        {
                            newgender = "girls"
                        }


                        if(newObj.level == newLevel && newObj.gender == newgender)
                        {

                           
                            let ourKey = scheduled[j].away + "" + scheduled[j].gender + "" + scheduled[j].teamLevel
                            console.log("OurKey" + ourKey)
                            newMap.set(ourKey , newObj.arbiter)
                        }

                    }
                }
            }


            for(let i =0;i < scheduled.length; i++)
            {
                console.log("YEET: " + JSON.stringify(scheduled))
                var temp = scheduled[i].start

                var [date, time] = temp.split('T');
                var [year,month,day] = date.split("-");

                var [h,m,s] = time.split(":");
                var modifier = "AM";

                if(h == "00")
                {
                    h = "12";
                }
                else if(h == "12")
                {
                    h = "12"
                    modifier = "PM"
                }
                else if(h > 12)
                {
                    h = h % 12;
                    modifier = "PM"
                }

                var newLevel = "JV";
                var newgender = "boys"

                if(scheduled[i].teamLevel === "v")
                {
                    newLevel = "Varsity"
                }
                if(scheduled[i].gender === "b")
                {
                    newgender = "boys"
                }
                else if(scheduled[i].gender === "g")
                {
                    newgender = "girls"
                }

                var homeKey = scheduled[i].home + "" + scheduled[i].gender + "" + scheduled[i].teamLevel
                var awayKey = scheduled[i].away + "" + scheduled[i].gender + "" + scheduled[i].teamLevel

                console.log("My New Map: "  + homeKey + " value: " + newMap.get(homeKey))

                console.log("Home Map" + newMap.get(homeKey))
                arbiterInfo.push({
                    date: month +"/"+day+"/"+year.slice(-2),
                    time: h + ":" + m + " " + modifier,
                    level: newLevel,
                    home: newMap.get(homeKey),
                    hLevel: newLevel,
                    away: newMap.get(awayKey),
                    aLevel: newLevel
                })
            }
        }

        setCSVData(arbiterInfo);


    }

    return(
        <>
        {csvData == "" ? 
            <>New Test</>
        :
            <Button><CSVLink data={csvData} headers={header}>Arbiter Export</CSVLink></Button>
        }
        </>
    )
}

export default AssignorExport;
