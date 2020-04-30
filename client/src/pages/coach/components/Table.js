import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { getAllUsers } from '../../../utility/APIUtility';
import { apiGetGames } from '../../../utility/APIGameControl';


// Handlers
import RemoveModal from './removeModal';
import EditModal from './editModal';

class TableComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showRemoveModal: false,
            showEditModal: false,
            tableData: [],
            user: ''
        };
    }

    openRemoveModal = (item) => {
        this.setState({
            showRemoveModal: true,
            user: item
        });
    }

    openEditModal = () => {
        this.setState({
            showEditModal: true,
        });
    }

    closeEditModal = () => {
        this.setState({
            showEditModal: false,
        });
    }

    closeRemoveModal = () => {
        this.setState({
            showRemoveModal: false,
        });
    }
    componentDidMount() {
        getAllUsers().then((response) => {
            let userList = []

            for (let i = 0; i < response.length; i++) {
                if (this.props.role == "ROLE_ASSIGNOR") {
                    if (response[i].schoolname != "Assignor" && response[i].schoolname != "assignor" && response[i].schoolname != "admin" && this.props.userDistrict == response[i].district) {
                        userList.push(response[i])
                    }
                }
                else if (this.props.role == "ROLE_ADMIN") {
                    if (response[i].schoolname != "Assignor" && response[i].schoolname != "assignor" && response[i].schoolname != "admin") {
                        userList.push(response[i])
                    }
                }

            }
            this.setState({ tableData: userList })
        })
    }



    render() {
        console.log(this.state.tableData);
        return (

            <>
                <RemoveModal showModal={this.state.showRemoveModal} closeModal={this.closeRemoveModal} user={this.state.user}/>
                <EditModal showModal={this.state.showEditModal} closeModal={this.closeEditModal} />
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>School</TableCell>
                            <TableCell>District</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tableData.map((item, key) => (
                            <TableRow>

                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.email}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.schoolname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.district}
                                </TableCell>
                                <TableCell component="th" align="right" scope="row">
                                    <Button variant="contained" className="btn-edit" onClick={this.openEditModal} color="primary">
                                        <i class="fas fa-edit"></i>
                                    </Button>
                                    <Button variant="contained" className="btn-delete" onClick={()=>this.openRemoveModal(item.id)} color="secondary">
                                        <i class="fas fa-trash-alt"></i>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        )
    }
}

export default TableComp;