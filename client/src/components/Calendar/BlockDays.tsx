import React, { useState } from 'react';
import  { DatePicker } from 'antd';

const { RangePicker } = DatePicker;



/**
 * send dates to calendar chosen by assignor
 * 
 * receive dates chosed by assignor
 */

const BlockDays = () => {

    const [ blockedDays, setBlockedDays ] = useState( [{}] );

    const onOk = ( info: any ) => { 

        // const range = {
        //     date,
        //     dateStr
        // }

        // setBlockedDays( blockedDays => [ ...blockedDays, range ] )

        // console.log( typeof date + " " + date + " " + dateStr );
    }

    const timeBlocks = "";

    return (
        <>
        <div>
            <RangePicker 
                onOk = { info => onOk( info ) }
                />


        </div>
        </>
    ); 

}

export default BlockDays;