import React from 'react';
import { Calendar, CalendarFilter } from '../components'

const Home = () => {
    return(
        <div>
            <CalendarFilter />
            <Calendar/>
        </div>
    );
}

export default Home;