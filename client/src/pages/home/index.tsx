import React, {useState} from 'react';
import { CalendarController } from '../../components'
import { Header } from '../../style/PageStyles'

const Home = (isAuthenticated: any) => {

    const [loggedin,setLogin] = useState(isAuthenticated)

    return (
        <>
            <CalendarController/>
        </>
    );
}

export default Home;