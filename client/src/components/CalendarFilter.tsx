import React from 'react';
import Select from 'react-select';
import '../style/calendarFilter.css';

const CalendarFilter = () => {

    const schools = [
        { label: "Neville High School", value: "neville high school" },
        { label: "West Monroe High School", value: "west monroe high school" },
        { label: "Ouachita Parish High School", value: "ouachita parish high school" },
        { label: "Sterlington High School", value: "sterlington high school" }
    ];

    const levels = [
        { label: "Varsity", value: "v" },
        { label: "Junior Varsity", value: "jv" }
    ];

    const teams = [
        { label: "Boys", value: "b" },
        { label: "Girls", value: "g" }
    ];

    return(
        <div className="filter-bar">
            <div className="select-school">
                <Select options={schools} isMulti placeholder="Select school(s)" />
            </div>
            <div className="select-level">
                <Select options={levels} isMulti placeholder="Select level(s)" />
            </div>
            <div className="select-team">
                <Select options={teams} isMulti placeholder="Select team(s)" />
            </div>
        </div>
    );
}

export default CalendarFilter;