import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'
import Papa from 'papaparse';
import XLSX from 'xlsx';

const buttonRef = React.createRef()

export default class CSVReader1 extends Component {
    constructor() {
        super();
        this.state = {
            csvfile: undefined
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
            const dataParse = XLSX.utils.sheet_to_json(ws, { raw: false });
            console.log('---------------');
            console.log(dataParse);
            console.log('---------------');



        }
        reader.readAsArrayBuffer(csvfile);

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
