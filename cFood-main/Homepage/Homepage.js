import React, {useState} from 'react';
import "./Homepage.css";
import Container from "react-bootstrap/Container";
import {Carousel, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import api from "../api";

const VerticalNavBar= () => {
    /* This function handles the display for the vertical navbar on the homepage */
    return (
        <Container>
            <Navbar className={"justify-content-center"}>
                <Nav className={"flex-column"}>
                    <LinkContainer to={"/RecipeBook"}>
                        <Nav.Link>Recipe Book</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={"/Pantry"}>
                        <Nav.Link>Pantry</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={"/ShoppingList"}>
                        <Nav.Link>Shopping List</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar>
        </Container>
  );
};


export default function Homepage() {
    /* This function renders the homepage */
    return (
        <div className={"Homepage"}>
            <div className={"lander"}>
                <Container>
                    <h1>
                        <img src="\images\cFood_logo_temp50x50.png"></img>
                        cFood
                        </h1>
                    <p className={"text-muted"}>Cooking Solutions</p>
                    <h2>Learn About Us!</h2>
                    <p>For our software cFood, we want people to be able to create delicious food with ingredient
scraps in your pantry. We realized how many college students don’t utilize their own kitchen to
create masterpieces because it’s hard, too expensive, or not enough ingredients. With our tool,
we hope to make it possible to create something awesome in the kitchen with little to no
experience in the kitchen.</p>
                    <VerticalNavBar></VerticalNavBar>
                </Container>
            </div>
        </div>
    );
};