import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import Papa from 'papaparse';
import XLSX from 'xlsx';
import {addMultipleGames} from '../../utility/APIGameControl'
import {notification} from 'antd'

const buttonRef = React.createRef()

export default class CSVReader1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csvfile: undefined,
            jsonData: undefined
        };
        this.updateData = this.updateData.bind(this);
    }

    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };

    importCSV = () => {
        const { csvfile } = this.state;
        var dataParse = undefined
        var myStatus = "assignorPending"
        // Papa.parse(csvfile, {
        //     complete: this.updateData,
        //     header: true,
        //     comments: true
        // });
        const reader = new FileReader();
        reader.onload = function (e) {

            var data = e.target.result;
            let readedData = XLSX.read(data, { type: 'array' });
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];

            /* Convert array to json*/
            dataParse = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1 });
            console.log('---------------');
            console.log(dataParse);
            console.log('---------------');

            if(this.props.role != "ROLE_USER")
            {
                myStatus = "Scheduled";
            }

            if(dataParse != undefined)
            {
                let addGamesArray = []
                var counter;
    
                for(let i = 0; i < dataParse.length;i++)
                {
    
                    //{homeTeamName: "West Monroe", awayTeamName: "Neville", date: "2020-04-28T00:00:00", location: "MultipleTest", status: "Scheduled", teamLevel: "V", gender: "b" },
                    console.log("data " + dataParse[i+1][0])

                    // var time = ""
                    // timeArray = dataParse[i+1][1].split(" ")

                    // if(timeArray[1].toUpper() == "PM")
                    // {
                    //     time = timeArray[0] + 12
                    // }
                    // else
                    // {
                    //     time = "0" + timeArray[0]
                    // }

                        addGamesArray.push({
                            homeTeamName: this.props.userHome,
                            date: dataParse[i+1][0] + "T" + dataParse[i+1][1] + ":00",
                            location: dataParse[i+1][2],
                            awayTeam: dataParse[i+1][3],
                            gender: dataParse[i+1][4],
                            level: dataParse[i+1][5],
                            status: myStatus
                        })

                        counter++;
                }

                addMultipleGames(addGamesArray)
                .then((response) =>{
                    notification.success({
                        message: "Added Games",
                        description: "Successfully added " + counter + " games"
                    })
                })
                .catch((error)=>{
                    notification.error({
                        message: "Could not add games",
                        description: error
                    })
                })

    
    
            }


        }
        console.log("Above reader.read")
        reader.readAsArrayBuffer(csvfile);
        console.log("Below reader.read")

        

    };


    updateData(result) {
        var data = result.data;
        console.log(data);
    }

    render() {
        console.log(this.state.csvfile);
        return (
            <div className="App">
                <h2>Import CSV File!</h2>
                <input
                    className="csv-input"
                    type="file"
                    ref={input => {
                        this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                />
                <p />
                <button onClick={this.importCSV}> Upload now!</button>
            </div>
        );
    }
}
