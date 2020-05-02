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
        for(let i=0;i<response.length;i++)
        {
            if(!set.has(response[i].schoolname) && response[i].schoolname != "Assignor" && response[i].schoolname != "admin")
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

const teamLevels = ['v', 'jv'];
const teamGender = ['g', 'b'];

const levelOptions = teamLevels.map((level, i) => {
    return(
        <Radio.Button value={level} key={i}>{ level === 'v' ? 'Varsity' : 'Junior Varsity'  }</Radio.Button>
    );
})

const genderOptions = teamGender.map((gender, i) => {
    return(
        <Radio.Button value={gender} key={i}>{ gender === 'g' ? 'Girls' : 'Boys'  }</Radio.Button>
    );
})



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
    const level = clickedGame[3];
    const gender = clickedGame[4];
   

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


    const handleChange = ( key: any, value: any ) => {
        props.form.setFieldsValue({
            [key]: value,
        })
    }
    
    if(counter === 0)
    {

        updateOptions(setTeamList);
        getUserInfo(setUser, setRole,setSchool, setStatus)
        if(role === "ROLE_USER")
        {
            setSchool(user.schoolname)
        }
        else
        {

            setSchool("")
            setLabel("Select Home Team")
            setRequired(true)
            setSchool(user.schoolname)
        }

        setCounter(counter +1)
    }

    return (
        <>
        {user == null  && role == null? 
            
        <></> 
        
        :
            
        <Form layout="vertical">

            {/*showAddGame && addGameDate*/} 
            { role === 'ROLE_ASSIGNOR' && 
            <Form.Item label={"Select Home Team:"}>
                {getFieldDecorator('homeTeamName', {
                    rules: [{ required: required, message: 'Select Home Team' }],
                    initialValue: showEditGame === true? clickedGame[5] : ""
                })(
                    <Select showSearch onChange={setHomeName}>
                        {teamList.length === 1 ? 
                        teamOptions
                        :
                            apiTeamOptions
                        }
                    </Select>
                )}
            </Form.Item>}
            <Form.Item label={role === "ROLE_USER" ? "Select Opposing Team" : "Select Away Team:"}>
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
                    initialValue: showEditGame === true? level : ""
                })(
                    <Radio.Group  buttonStyle="solid">
                            {levelOptions}
                    </Radio.Group>
                ) }
            </Form.Item>
            <Form.Item label="Team">
                    { getFieldDecorator( 'gender', {
                        rules: [{ required: true }],
                        initialValue: showEditGame === true? gender : "",
                    } )(
                        <Radio.Group buttonStyle="solid">
                            {genderOptions}
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
                        initialValue: showEditGame === true? getTime(clickedGame[1]) : moment( '00:00', 'HH:mm a' )
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
