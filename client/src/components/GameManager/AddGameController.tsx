import React, {useState} from 'react';
import {Button, Radio, Form} from 'antd';
import AddGames from './AddGames'



const AddGameController = () =>{
    const initialArray = [1]

    const [controllArray, setArray] = useState(initialArray);
    const [cardCount,setCount] = useState(0)

    function addCard()
    {

        let tempArray = controllArray;

        tempArray.push(controllArray[controllArray.length - 1] + 1)

        setCount(cardCount + 1)

        setArray(tempArray);
    }


    function removeCard(index:any){

        let tempArray =[];

        //removing the selected card 
           for(let i=0; i < controllArray.length; i++)
           {
                if(i != index)
                {
                    tempArray.push(controllArray[i])
                }
           }
           setArray(tempArray)
           console.log(tempArray)


    }

    const onFinish = ({values}:any) =>{
        console.log("Success: " +  values)
    }


    return (
        <Form onSubmit={onFinish}>

        {cardCount == 0 ? 
        
            <AddGames/>
        :

        controllArray.map((controllArray, i) =>{
            console.log(controllArray + "in map")
            return (
                <>
                    <AddGames key={i} />
                    <Button onClick={() => removeCard(i)}>Remove</Button>
                </>
                )
        })
        
        }
        <div>
            <Button type="primary" onClick={()=>addCard()}>Add Another Game</Button>
        </div>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form>
    )
}


export default AddGameController