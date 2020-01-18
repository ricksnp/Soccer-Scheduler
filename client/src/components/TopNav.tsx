import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const TopNav = ({}) =>{
    return(

        <Navbar bg="primary" variant="dark" expand="lg">
            <NavLink to="/">
                <Navbar.Brand>NELA Soccer Scheduler</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/" activeStyle={{fontWeight:"bold"}}>
                        <Nav.Link>Home</Nav.Link>
                    </NavLink>
                    <NavLink to="/scheduling" activeStyle={{fontWeight:"bold"}}>
                        <Nav.Link>Scheduling</Nav.Link>
                    </NavLink>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNav;