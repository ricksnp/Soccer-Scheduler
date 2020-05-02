import React, {useState} from 'react';
import {Button, Radio} from 'antd'
import styled from 'styled-components'
import { isBrowser, isMobile } from "react-device-detect";
import './SecondFilter.css';

interface Props {
    secondFilter: any,
    setSecond: any,
    secondChange: any
}

const I = styled.span`
    margin: 0% 1%;
    font-weight: bolder;
`

const Div = styled.div`
    margin: 1% 0%;
`


const SecondFilter = (props: Props) =>{

    const [primeVar, setVarColor] = useState(true)
    const [primeJV, setJVColor] = useState(true)
    const [primeGirl, setGirl] = useState(true)
    const [primeBoy, setBoy] = useState(true)
    const [primeSched, setSched] = useState(true)
    const [primePend, setPen] = useState(true)
    const [primeCanc, setCanc] = useState(true)
    const [primeMove, setMove] = useState(true)

    const Scheduled = styled.span`background: #78e388`;
    const Pending = styled.span`background: #fdff87`;
    const Cancelled = styled.span`background: #ff5757`;
    const Moved = styled.span`background: #adadad`;

    const handleClick = (type: string) => {
          

        if(type === "v")
        {
            setVarColor(!primeVar)
        }
        else if(type === "jv")
        {
            setJVColor(!primeJV)
        }
        else if(type === "b")
        {
            setBoy(!primeBoy)
        }
        else if(type === "g")
        {
            setGirl(!primeGirl)
        }
        else if(type === "s")
        {
            setSched(!primeSched)
        }
        else if(type === "p")
        {
            setPen(!primePend);
        }
        else if(type === "c")
        {
            setCanc(!primeCanc);
        }
        else if(type === "m")
        {
            setMove(!primeMove)
        }

        props.secondChange(type)

    }

    return(
        <>
            <Div>
                <I>Filter level:</I> 
                    <Button 
                        size={isMobile ? 'small' : 'default'} 
                        style={{marginRight: ".2%"}} 
                        onClick={()=>handleClick("v")} 
                        type={primeVar ? 'primary' : 'default'}
                        >
                            Varisty
                        </Button>

                    <Button 
                        size={isMobile ? 'small' : 'default'} 
                        onClick={()=>handleClick("jv")} 
                        type={primeJV ? 'primary' : 'default'}
                        >
                            Junior Varsity
                        </Button>
            </Div>
                <I>Filter Gender:</I> 
                    <Button 
                        size={isMobile ? 'small' : 'default'} 
                        style={{marginRight: ".2%"}} 
                        onClick={()=>handleClick("b")} 
                        type={primeBoy ? 'primary' : 'default'}
                        >
                            Boys
                        </Button> 
                    <Button 
                        size={isMobile ? 'small' : 'default'} 
                        onClick={()=>handleClick("g")} 
                        type={primeGirl ? 'primary' : 'default'}
                        >
                            Girls
                        </Button>
            <Div>
                <I>Filter Status:</I>
                <div style={{marginTop: "2%"}} className="inline-bloccc">
                    <span style={primeSched ? {background: "#78e388"} : {background: "white"}} 
                        className="game-status-tab"
                        onClick={()=>handleClick("s")}
                        >
                            Scheduled Game
                    </span>
                    <span style={primePend ? {background: "#fdff87"} : {background: "white"}}
                        className="game-status-tab"
                        onClick={()=>handleClick("p")}
                        >
                        Pending Game
                    </span>
                    <span  style={primeCanc ? {background: "#ff5757"} : {background: "white"}}
                        onClick={()=>handleClick("c")}
                        className="game-status-tab"
                        >
                            Cancelled Game
                        </span>
                    <span 
                        style={primeMove ? {background: "#adadad"} : {background: "white"}}
                        onClick={()=>handleClick("m")}
                        className="game-status-tab"
                        >
                            Moved Game
                        </span>
                </div>
            </Div>
        </>
    )
}

export default SecondFilter