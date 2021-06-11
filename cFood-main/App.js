import React, { useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import './App.css';
import {Image, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Routes from "./Routes";
import api from "./api"

const App= () => {
    /* This function handles the persistent nav bar at the top of the app */
    return (
        <div className={"App container py-3"}>
            <Container>
            <Navbar collapseOnSelect bg="light" expand={"md"} className={"mb-3"}>
                <LinkContainer to={"/"}>
                    <Navbar.Brand bg="light" className={"font-weight-bold text-muted"}>
                        <Image
                            src={"/images/cFood_logo_temp50x50.png"}
                            width={"30"}
                            height={"30"}
                            className={"d-inline-block align-top"}
                            alt={"cFood Logo Small"}
                        />{' '}
                        cFood
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav activeKey={window.location.pathname}>
                        <LinkContainer to="/RecipeBook">
                            <Nav.Link>Recipe Book</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/Pantry">
                            <Nav.Link>Pantry</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/ShoppingList">
                            <Nav.Link>Shopping List</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes/>
            </Container>
        </div>
    );
};

export default App;