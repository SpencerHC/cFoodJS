import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import Homepage from "./Homepage/Homepage";
import ShoppingList from "./ShoppingList/ShoppingList";
import RecipeBook from "./RecipeBook/RecipeBook";
import NotFound from "./NotFound/NotFound";
import Pantry from "./Pantry/Pantry"

export default function Routes() {
    /* This function handles the routing for the different pages */
    return (
        <Switch>
            <Route exact path="/App">
                <App />
            </Route>
            <Route exact path="/">
                <Homepage />
            </Route>
            <Route exact path="/ShoppingList">
                <ShoppingList />
            </Route>
            <Route exact path="/RecipeBook">
                <RecipeBook/>
            </Route>
            <Route exact path="/Pantry">
                <Pantry/>
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
