import React, {useState} from 'react'
import { Form, Select, Radio, Input } from 'antd';
import { useGlobalState } from './Provider';
import {getAllUsers} from '../../utility/APIUtility';

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

        console.log("res: " + response)
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

    console.log("list" + list);
}

//if "other", school is not in disctrict, make new field appear to type in school

const CreateEditGame = ( props: Props ) => {
    const Option = Select.Option
    const showAddGame = useGlobalState('showAddGame');
    const addGameDate = useGlobalState('addGameDate');
    const clickedGame = useGlobalState('clickedGame');
    const showEditGame = useGlobalState('showEditGame');

    //for home/away team Select element
    const teams: Array<string> = [ "Outside of District"]

    const [teamList, setTeamList] = useState(teams)
    const [counter, setCounter] = useState(0);


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

    
    if(counter == 0)
    {

        updateOptions(setTeamList);

        setCounter(counter +1)
    }

    return (

        <Form layout="vertical">
            {/*showAddGame && addGameDate*/} 
            <Form.Item label="Home Team">
                {getFieldDecorator('homeTeamName', {
                    rules: [{ required: true, message: 'Select Home Team' }],
                    initialValue: showEditGame === true? clickedGame[5] : ""
                })(
                    <Select showSearch >
                        {teamList.length == 1 ? 
                           teamOptions
                        :
                            apiTeamOptions
                        }
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="Away Team">
                {getFieldDecorator('awayTeamName', { 
                    rules: [{ required: true, message: 'Select Away Team' }],
                    initialValue: showEditGame === true? clickedGame[6] : ""
                })(
                    <Select showSearch >
                         {teamList.length == 1 ? 
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
                    initialValue: showEditGame === true? clickedGame[7] : "coachPending"
                })(
                    <Input/>
                )}
            </Form.Item>


            <Form.Item label="Date">
                {getFieldDecorator('date', {
                    rules: [{ required: true, message: 'Select Status' }],
                    initialValue: addGameDate
                })(
                    <Input disabled style={{width:"50%"}} />
                )}
            </Form.Item>
                <Form.Item/>
        </Form>
      );
};

const GameForm = Form.create({ name: "add_game" })(CreateEditGame);
export default GameForm;
