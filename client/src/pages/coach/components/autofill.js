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
    { schoolname: 'Vidalia High School' },









];