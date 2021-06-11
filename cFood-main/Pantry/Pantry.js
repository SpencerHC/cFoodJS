import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Pantry.css'
import { useRouteMatch } from 'react-router';
import AsyncSelect from 'react-select/async';
import { Grid } from '@material-ui/core';
import Container from "react-bootstrap/Container";

var ingredients = [];

function AddIngredient(props){
    /**/
    const [list, setList] = React.useState(()=>{
        const localData = localStorage.getItem('ingredients');
        console.log(localData);
        return localData ? JSON.parse(localData) : []
    });
    useEffect(() => {
        /**/
        localStorage.setItem('ingredients',JSON.stringify(list))
    }, [list])

    const addIngr = (newIngr) =>{
        /**/
        setList([...list,{label:newIngr}]);
        }

    const removeIngr = index => event => {
        /**/
        event.stopPropagation();
        setList(list.slice(0, index).concat(list.slice(index+1)));
    }

    return(
        <div >
            <PantryItem onAdd={addIngr}/>
                <ul>
                    <Grid container className="space" spacing={.1}>
                        <Grid container justify="center" spacing ={.1}>
                            {list.map((item, index) =>(
                                <CreateIngredient
                                key={index}
                                name={item.label}
                                remove={removeIngr(index)}
                                onClick={removeIngr(index)}
                                />
                            ))}
                        </Grid>
                    </Grid>
                </ul>
        </div>
    );
}

// function to make item look good
function CreateIngredient(props) {
    /**/
    return(
        <Card onClick={props.onClick} style={{width: '10rem'}}>
            <Card.Img variant={"thumbnail"}/>
            <Card.Title>{props.name}</Card.Title>
            <Button onClick={props.removeIngr}>Remove</Button>
        </Card>
    );
}


function PantryItem(props){
    /**/
    const [value, setValue] = React.useState('');
    const [selectedValue, setSelectedValue] = useState(null)

    const handleInputChange = value => {
        /**/
        setValue(value);
    }

    const handleChange = value => {
        /**/
        setSelectedValue(value);
        props.onAdd(value.name);
        setValue('');
    }


    const loadOptions= (value) => {
        /**/
        return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=${value}`,{
            "method": "GET",
            "headers": {
                'x-rapidapi-key': '27313a471bmshc3088e36130c7d3p1ec584jsndd88e651bc6f',
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        })
        .then(res => res.json());
    }



    return(
        <div>
            <AsyncSelect
                cacheOptions
                defaultOptions
                value = {selectedValue}
                getOptionLabel={e => e.name}
                getOptionValue={e => e.id}
                getOptionImage={e => e.image}
                loadOptions = {loadOptions}
                onInputChange = {handleInputChange}
                onChange = {handleChange}
                placeholder='Add Ingredient'
            />
         </div>
    );
}

function Pantry(){
    /**/
    return(
        <div className={"Pantry"}>
            <Container>
                <h1 className={"header"}>Your Pantry</h1>
                <AddIngredient/>
            </Container>
        </div>
    );
}

export default Pantry;