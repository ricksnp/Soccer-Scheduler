import React, { Component } from 'react'
import XLSX from 'xlsx';
import { addMultipleGames } from '../../utility/APIGameControl'
import { notification } from 'antd'

export default class CSVReader1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            csvfile: undefined,
            jsonData: undefined,
            userHome: this.props.userHome,
            userRole: this.props.role
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
        const { userRole } = this.state;
        const { userHome } = this.state;
        var dataParse = undefined
        var myStatus = "coachPending"

        const reader = new FileReader();
        reader.onload = function (e) {

            var data = e.target.result;
            let readedData = XLSX.read(data, { type: 'array' });
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];

            /* Convert array to json*/
            dataParse = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1, blankRows: false });
            console.log('---------------');
            console.log(dataParse);
            console.log('---------------');

            const convertTime12to24 = (time12h) => {
                if (time12h != undefined) {
                    var [time, modifier] = time12h.split(' ');
                    var [time, modifier] = time12h.split(' ');

                    let [hours, minutes] = time.split(':');

                    if (hours === '12') {
                        hours = '00';
                    }

                    if (modifier === 'PM') {
                        hours = parseInt(hours, 10) + 12;
                    }

                    return `${hours}:${minutes}` + ':00';

                }

            }

            if (userRole != "ROLE_USER") {
                myStatus = "Scheduled";
            }

            console.log(dataParse.length)
            if (dataParse != undefined) {
                let addGamesArray = []
                var counter = 0;

                for (let i = 1; i < dataParse.length; i++) {
                    var time12h = dataParse[i][1];
                    if (dataParse[i].length == 6) {
                        counter++;
                        addGamesArray.push({
                            homeTeamName: userHome,
                            date: dataParse[i][0] + "T" + convertTime12to24(time12h),
                            location: dataParse[i][2],
                            awayTeamName: dataParse[i][3],
                            gender: dataParse[i][4],
                            teamLevel: dataParse[i][5],
                            status: myStatus
                        })


                    }

                }
                console.log(addGamesArray);
                addMultipleGames(addGamesArray)
                    .then((response) => {
                        notification.success({
                            message: "Added Games",
                            description: "Successfully added " + counter + " games"
                        })
                    })
                    .catch((error) => {
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
        console.log("gg" + this.props.userHome);
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
