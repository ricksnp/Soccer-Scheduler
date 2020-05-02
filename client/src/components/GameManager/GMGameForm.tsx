import React, {useState} from 'react'
import { Form, Select, Radio, Input, DatePicker, TimePicker } from 'antd';
import { useGlobalState } from './GMProvider';
import {getAllUsers, getCurrentUser} from '../../utility/APIUtility';
import moment from 'moment'

interface Props {
    form: any
}



function updateOptions(setter:any)
{
    console.log("here");
    

    let list:any = []

    let set = new Set()

    list[0] = "Outside of District";

    getAllUsers().then((response)=>
    {
        for(let i=0;i<response.length;i++)
        {
            if(!set.has(response[i].schoolname))
            {
                list[i+2] = response[i].schoolname
                set.add(response[i].schoolname)
        
            }
        }

        setter(list)
    })
}

function getUserInfo(setter: any, roleSetter: any, setSchool: any, setStatus:any, title:any, school: any)
{
    let status = "coachPending";
    let role = "";

    getCurrentUser()
        .then((response)=>{
            setter(response);
            roleSetter(response.role);
            setSchool(response.schoolname)
            role = response.role;

        })

    setStatus(status)

}

//if "other", school is not in disctrict, make new field appear to type in school


const getTime = ( dateVar: any ) => {
    const dateTime = dateVar.split(' ');
    const time = dateTime[1];
    return moment( time, "hh:mm" );

}

const getDate = ( dateVar: any ) => {
    const dateTime = dateVar.split(' ');
    const date = dateTime[0];
    return ( moment( date, "YYYY/MM/DD" ) )
}



const CreateEditGame = ( props: Props ) => {
    const Option = Select.Option
    const clickedGame = useGlobalState('clickedGame');
    const showEditGame = useGlobalState('showEditGame');

    //for home/away team Select element
    const teams: Array<string> = [ "Outside of District"]

    const [teamList, setTeamList] = useState(teams)
    const [counter, setCounter] = useState(0);
    const [dateValue, setValue] = useState(new Date)

    const [user, setUser] = useState(undefined)
    const [role, setRole] = useState("");
    const [school, setSchool] = useState("");
    const [status, setStatus] = useState(clickedGame[7]);

    const date = new Date;

    function setHomeName(value: any)
    {
        setSchool(value)
    }

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
    

    const { form } = props;
    const { getFieldDecorator } = form;

    
    if(counter === 0)
    {

        updateOptions(setTeamList);
        getUserInfo(setUser, setRole,setSchool, setStatus, clickedGame[0], school)

        setCounter(counter +1)
    }

    const handleDate = (temp: any) => {
        let split = temp.split("T");
        setValue(split[0])

        return split[0]
    }

    return (

        <Form layout="vertical">
            {/*showAddGame && addGameDate*/} 
            <Form.Item label={role === "ROLE_USER" ? "" : "Select Home Team:"}>
                {getFieldDecorator('homeTeamName', {
                    rules: [{ required: true, message: 'Select Home Team' }],
                    initialValue: showEditGame === true? clickedGame[5] : school
                })(
                    <>
                    {role != "ROLE_USER" ? 
                    
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
                    initialValue: status,
                })(
                    <Input />
                )}
            </Form.Item>


            <Form.Item label="Date">
                {getFieldDecorator('date', {
                    rules: [{ required: true, message: 'Select Date' }],
                    initialValue: showEditGame ? moment(getDate(clickedGame[1]), 'YYYY/MM/DD') : moment(dateValue,'YYYY/MM/DD')
                })(  
                    <DatePicker  style={{width:"50%"}} />
                )}
            </Form.Item>
            
            <Form.Item label="Time">
                    { getFieldDecorator('time', { 
                        rules: [{ required: true, message: 'Select Time' }],
                        initialValue: showEditGame === true? moment(getTime(clickedGame[1]), "hh:mm") : moment( '00:00', 'HH:mm a' )
                     })(
                         <TimePicker 
                            use12Hours 
                            format="hh:mm"
                            minuteStep={15}
                            />
                     ) }
            </Form.Item>
        </Form>
      );
};

const GameForm = Form.create({ name: "add_game" })(CreateEditGame);
export default GameForm;
