import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

// Handlers
import RemoveModal from './removeModal';
import EditModal from './editModal';

class TableComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showRemoveModal: false,
            showEditModal: false,
            tableData: [
                {
                    name: "test",
                    email: "1212@mail.com",
                    school: "some school",
                    district: "5A",
                },
                {
                    name: "test",
                    email: "1212@mail.com",
                    school: "some school",
                    district: "5A",
                },
                {
                    name: "test",
                    email: "1212@mail.com",
                    school: "some school",
                    district: "5A",
                },
                {
                    name: "test",
                    email: "1212@mail.com",
                    school: "some school",
                    district: "5A",
                }
            ],
        };
    }

    openRemoveModal = () => {
        this.setState({
            showRemoveModal: true,
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

    render() {
        return (
            <>
                <RemoveModal showModal={this.state.showRemoveModal} closeModal={this.closeRemoveModal} />
                <EditModal showModal={this.state.showEditModal} closeModal={this.closeEditModal} />
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Select</TableCell>
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
                                <TableCell padding="checkbox" key="key">
                                    <Checkbox
                                        inputProps={{ 'aria-label': 'select all desserts' }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.email}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.school}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.district}
                                </TableCell>
                                <TableCell component="th" align="right" scope="row">
                                    <Button variant="contained" className="btn-edit" onClick={this.openEditModal} color="primary">
                                        <i class="fas fa-edit"></i>
                                    </Button>
                                    <Button variant="contained" className="btn-delete" onClick={this.openRemoveModal} color="secondary">
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