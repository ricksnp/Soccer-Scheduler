import React, {useState} from 'react'
import { Form, Select, Radio, Input, TimePicker } from 'antd';
import { useGlobalState } from './Provider';
import {getAllUsers, getCurrentUser} from '../../utility/APIUtility';
import { cpus } from 'os';
import moment from 'moment'

interface Props {
    form: any,
}

//get date of game from clicked game to autofill date when editing
const getDate = ( dateVar: Date ) => {
    const year = dateVar.getFullYear();
    const month = dateVar.getMonth() + 1;
    const day = dateVar.getDate();

    const date = year + '-' + month + '-' + day ;
    console.log(dateVar)
    return date;
}

const getTime = ( dateVar: Date ) => {
    const time = dateVar.getHours() + ':' + dateVar.getMinutes();
    return moment(time, 'HH:mm')
}

function updateOptions(setter:any)
{

    let list:any = []

    let set = new Set()

    list[0] = "Outside of District";

    getAllUsers().then((response)=>
    {

        console.log("res: " + response)
        for(let i=0;i<response.length;i++)
        {
            if(!set.has(response[i].schoolname) && response[i].schoolname != "Assignor")
            {
                list[i+2] = response[i].schoolname
                set.add(response[i].schoolname)
        
            }
        }

        setter(list)
    })
}


function getUserInfo(setter: any, roleSetter: any, setSchool: any, setStatus:any)
{
    let status = "coachPending";
    let role = "";

    getCurrentUser()
        .then((response)=>{
            setter(response);
            roleSetter(response.role);
            setSchool(response.schoolname)
            role = response.role;

            if(response.role != "ROLE_USER")
            {
                setStatus("scheduled")
            }
            else{
                setStatus("coachPending")
            }
        })

    setStatus(status)
    console.log("GAME STATUS" + status)

}
//if "other", school is not in disctrict, make new field appear to type in school
const userTemplate = {
    role: "null",
    schoolname: "null",
    id: "null",
    username: "null",
    name: "null",
    district: "null"

}
const CreateEditGame = ( props: Props ) => {
    const Option = Select.Option
    const showAddGame = useGlobalState('showAddGame');
    const addGameDate = useGlobalState('addGameDate');
    const clickedGame = useGlobalState('clickedGame');
    const showEditGame = useGlobalState('showEditGame');

    const [user, setUser] = useState(userTemplate)
    const [role, setRole] = useState("");
    const [school, setSchool] = useState("");
    const [status, setStatus] = useState("coachPending");
    const [required, setRequired] = useState(false);
    const [time, setTime] = useState(undefined)

    

    //for home/away team Select element
    const teams: Array<string> = [ "Outside of District"]

    const [teamList, setTeamList] = useState(teams)
    const [counter, setCounter] = useState(0);

    const [label, setLabel] = useState("");


    const teamOptions = teams.map((team, i) => {
        return (
            <Option value={team} key={i}>
                {team}
            </Option>
        );
    });

   
    const apiTeamOptions = teamList.map((team, i) => {
        return (
            <Option value={team} key={i}>
                {team}
            </Option>
        );
    });
    
    function setHomeName(value: any)
    {
        setSchool(value)
    }

    const { form } = props;
    const { getFieldDecorator } = form;

    
    if(counter === 0)
    {

        updateOptions(setTeamList);
        getUserInfo(setUser, setRole,setSchool, setStatus)

        console.log("ROLE =" + role)
        if(role === "ROLE_USER")
        {
            setSchool(user.schoolname)
            console.log("Required" + required)
        }
        else
        {

            setSchool("")
            setLabel("Select Home Team")
            setRequired(true)
            console.log("Label: "  + label)
            setSchool(user.schoolname)
            console.log("Required" + required)
        }

        setCounter(counter +1)
    }

    return (
        <>
        {user == null  && role == null? 
            
        <></> 
        
        :
            
        <Form layout="vertical">
            {console.log("role =" + school)}
            {console.log("Game Form User" + JSON.stringify(user))}

            {/*showAddGame && addGameDate*/} 
            <Form.Item label={role == "ROLE_USER" ? "" : "Select Home Team:"}>
                {getFieldDecorator('homeTeamName', {
                    rules: [{ required: required, message: 'Select Home Team' }],
                    initialValue: showEditGame === true? clickedGame[5] : school
                })(
                    <>
                    {user.role != "ROLE_USER" ? 
                    
                        <Select showSearch onChange={setHomeName}>
                            {teamList.length === 1 ? 
                            teamOptions
                            :
                                apiTeamOptions
                            }
                            </Select>
                        : 
                        <></>
                    }
                    </>
                )}
            </Form.Item>
            <Form.Item label={role == "ROLE_USER" ? "Select Opposing Team" : "Select Away Team:"}>
                {getFieldDecorator('awayTeamName', { 
                    rules: [{ required: true, message: 'Select Opposing Team' }],
                    initialValue: showEditGame === true? clickedGame[6] : ""
                })(
                    <Select showSearch >
                         {teamList.length === 1 ? 
                           teamOptions
                        :
                            apiTeamOptions
                        }
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="Level">
                { getFieldDecorator('teamLevel', {
                    rules: [{ required: true }],
                    initialValue: showEditGame === true? clickedGame[3] : ""
                })(
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="v">Varsity</Radio.Button>
                        <Radio.Button value="jv">Junior Varsity</Radio.Button>
                    </Radio.Group>
                ) }
            </Form.Item>
            <Form.Item label="Team">
                    { getFieldDecorator( 'gender', {
                        rules: [{ required: true }],
                        initialValue: showEditGame === true? clickedGame[4] : ""
                    } )(
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value="b">Boys</Radio.Button>
                            <Radio.Button value="g">Girls</Radio.Button>
                        </Radio.Group>
                    ) }
            </Form.Item>
            <Form.Item label="Location">
                {getFieldDecorator('location', {
                    rules: [{ required: true, message: 'Select Location' }],
                    initialValue: showEditGame === true? clickedGame[2] : ""
                })(
                    <Input/>
                )}
            </Form.Item>
            <Form.Item label="Status" style={ {display: "none"} } >
                {getFieldDecorator('status', {
                    rules: [{ required: true, message: 'Select Status' }],
                    initialValue: showEditGame === true? clickedGame[7] : status
                })(
                    <Input/>
                )}
            </Form.Item>


            <Form.Item label="Date">
                {getFieldDecorator('date', {
                    rules: [{ required: true, message: 'Select Date' }],
                    //@ts-ignore
                    initialValue: showAddGame === true? addGameDate : getDate(clickedGame[1])
                })(
                    <Input disabled style={{width:"50%"}} />
                )}
            </Form.Item>
            
            <Form.Item label="Time">
                    { getFieldDecorator('time', { 
                        rules: [{ required: true, message: 'Select Time' }],
                        initialValue: showEditGame === true? getTime(clickedGame[1]) : ""
                     })(
                         <TimePicker 
                            use12Hours 
                            format="hh:mm"
                            minuteStep={15}
                            />
                     ) }
            </Form.Item>
        </Form>
        }
        </>
      );
};

const GameForm = Form.create({ name: "add_game" })(CreateEditGame);
export default GameForm;
