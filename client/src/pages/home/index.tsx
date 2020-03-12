import React, {useState} from 'react';
import { CalendarController } from '../../components'
import { Header } from '../../style/PageStyles'

const Home = (isAuthenticated: any) => {


    return (
        <>
            <CalendarController/>
        </>
    );
}

export default Home;