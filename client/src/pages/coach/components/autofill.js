import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function ComboBox() {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={schoolNames}
            getOptionLabel={(option) => option.schoolname}
            style={{ width: 250 }}
            renderInput={(params) => <TextField {...params} />}
        />
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
export const schoolNames = [
    { schoolname: 'Acadiana HomeSchool' },
    { schoolname: 'Adams County Christian School' },
    { schoolname: 'Airline High School' },
    { schoolname: 'Alexandria High School' },
    { schoolname: 'Bastrop High School' },
    { schoolname: 'Beau Chene High School' },
    { schoolname: 'Benton High School' },
    { schoolname: 'Bolton High School' },
    { schoolname: 'Bossier High School' },
    { schoolname: 'Buckeye High School' },
    { schoolname: 'C E Byrd High School' },
    { schoolname: 'Caddo Parish Magnet School' },
    { schoolname: 'Calvary Baptist Academy' },
    { schoolname: 'Canton Academy' },
    { schoolname: 'Captain Shreve High School' },
    { schoolname: 'Carencro High School' },
    { schoolname: 'Cathedral High School' },
    { schoolname: 'Central Hinds Academy' },
    { schoolname: 'Christian Home Educators Fellowship' },
    { schoolname: 'Crossett High School' },
    { schoolname: 'De Ridder High School' },
    { schoolname: 'Delhi High School' },
    { schoolname: 'Delta Charter School' },
    { schoolname: 'Denham' },
    { schoolname: 'Denham Springs High School' },
    { schoolname: 'Dunham School' },
    { schoolname: 'Dutchtown High School' },
    { schoolname: 'Episcopal Collegiate' },
    { schoolname: 'Episcopal High School' },
    { schoolname: 'Episcopal School Of Acadiana' },
    { schoolname: 'Evangel Academy High School' },
    { schoolname: 'Farmerville High School' },
    { schoolname: 'Franklin Parish High School' },
    { schoolname: 'Glenmora High School' },
    { schoolname: 'Grace Christian High School' },
    { schoolname: 'Hamburg High School' },
    { schoolname: 'Haughton High School' },
    { schoolname: 'Hillcrest Christian School' },
    { schoolname: 'Holy Savior Menard Central High' },
    { schoolname: 'Huntington High School' },
    { schoolname: 'Lafayette Christian Academy' },
    { schoolname: 'Leesville High School' },
    { schoolname: 'Live Oak High School' },
    { schoolname: 'Livonia High School' },
    { schoolname: 'Loyola College Prep' },
    { schoolname: 'Madison Ridgeland Academy' },
    { schoolname: 'Mandeville High School' },
    { schoolname: 'McClellan' },
    { schoolname: 'Minden High School' },
    { schoolname: 'Monticello' },
    { schoolname: 'Natchez High School' },
    { schoolname: 'Natchitoches Central High School' },
    { schoolname: 'Neville High Schooll' },
    { schoolname: 'New Iberia HS' },
    { schoolname: 'North De Soto High School' },
    { schoolname: 'Northwood High School' },
    { schoolname: 'Ouachita Christian' },
    { schoolname: 'Ouachita Parish High School' },
    { schoolname: 'Park Place Christian Academy' },
    { schoolname: 'Parkview' },
    { schoolname: 'Parkview Baptist School' },
    { schoolname: 'Parkway High School' },
    { schoolname: 'Peabody Magnet High School' },
    { schoolname: 'Pineville High School' },
    { schoolname: 'Ponchatoula High School' },
    { schoolname: 'Pope John Paul I I School' },
    { schoolname: 'Porters Chapel Academy' },
    { schoolname: 'Rapides High School' },
    { schoolname: 'River Oaks High School' },
    { schoolname: 'Ruston High School' },
    { schoolname: 'Sam Houston High School' },
    { schoolname: 'Southwest Louisiana HomeSchool' },
    { schoolname: 'Southwood High School' },
    { schoolname: 'St. Aloysius High School' },
    { schoolname: 'St. Frederick High School' },
    { schoolname: 'Star City High School' },
    { schoolname: 'Sterlington High School' },
    { schoolname: 'Stuttgart High School' },
    { schoolname: 'Sulphur High School' },
    { schoolname: 'Tioga High School' },
    { schoolname: 'Union Parish High School' },
    { schoolname: 'Vidalia High School' },
    { schoolname: 'Walker High School' },
    { schoolname: 'West Monroe High School' },
    { schoolname: 'West Ouachita High School' },
    { schoolname: 'Woodlawn High School' },
    { schoolname: 'Wossman High School' },
    { schoolname: 'TBA' },











];