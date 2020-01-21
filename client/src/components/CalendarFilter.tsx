import React from 'react';
import Select from 'react-select';
import '../style/calendarFilter.css';

const CalendarFilter = () => {

    const SelectStyles = {
        
        menu: (provided: any, state: any) => ({
            ...provided,
            width: '100%',
        }),

        control: (provided: any, state: any) => ({
            ...provided,
            width: '100%',
        }),

        option: (provided: any, state: any) => ({
            ...provided,
            color: '#000000', 
            justifyContent: "left",
        })
    }
    

    const schools = [
        { label: "Neville High School", value: "neville high school" },
        { label: "West Monroe High School", value: "west monroe high school" },
        { label: "Ouachita Parish High School", value: "ouachita parish high school" },
        { label: "Sterlington High School", value: "sterlington high school" }
    ];

    return(
        <div className="filter-bar">
            <div className="select-container">
                <Select options={schools} isMulti styles={SelectStyles} placeholder="Select school(s)" />
            </div>
            
        </div>
    );
}

export default CalendarFilter;