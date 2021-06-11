import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import api from '../api'
import './RecipeBook.css';
import {forEach} from "react-bootstrap/ElementChildren";
import Modal from 'react-bootstrap/Modal';
import {CardDeck, CardGroup, Container} from "react-bootstrap";
import Grid from '@material-ui/core/Grid'


var x = localStorage.getItem('ingredients');

function RecipeCard(props){
    /* This function sets layout for a single recipe card */
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [missingList, setMissingList] = React.useState([])
    const [list, setList] = React.useState(() => {
        const localData = localStorage.getItem('missingIngredients');
        return localData ? JSON.parse(localData) : []
    });
    useEffect(() => {
        localStorage.setItem('missingIngredients', JSON.stringify(list))
    }, [list])


    const handleMissingIngredients = () => {
        setMissingList([])
        setList([])
        props.missingIngredients.map(ingredient => {
            missingList.push({ label: ingredient.name, inCart: false})
            //console.log(missingList)
        })
        console.log("Current items in missingList " )
        console.log(missingList)
        setList([...missingList])

        console.log(list)
        //function that adds to Shopping list.
    }

    return(
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={props.img} alt="" />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.prep} Minute Cook Time</Card.Text>
            </Card.Body>
            <Button variant="primary" onClick={handleShow}>
                Go to Recipe
            </Button>
            <Modal size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.name}
                        <img className="thumbnail" src={props.img} width="100px"></img>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Summary</h4>
                    {props.summary}
                    <h4>Ingredients</h4>
                    {props.ingr}
                    <h4>Instructions</h4>
                    {props.instr}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleMissingIngredients}>Add Missing Ingredients</Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}


function RecipeSearchBar(props) {
    /* This function has the logic to handle the recipe search bar */
    const [value, setValue] = React.useState();
    const[responseData, setResponseData] = React.useState([]);

    const handleInput = (e) => {
        /* Passing value to getRecipeSearch allows the api to return the user input as a query and load recipes */
        api.getRecipeSearch(value)
            .then((response) => {
                setResponseData(response.data.json.results)
                console.log(response.data.json.results)
            })
            .catch((error) => {
                console.log(error)
            })
        setValue('')
    }

    const handleChange = event => {
        setValue(event.target.value)
    }

    const getRecipes = (e) => {
        /* This function calls the api to retrieve the recipes */
        //console.log(localStorage.getItem('ingredients'))
        e.preventDefault()
        api.getComplexSearchWithIngredients()
            .then((response) => {
                setResponseData(response.data.json.results)
                //console.log(response.data.json.results)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return(
        <div>
            <input size={60} type='text' placeholder='Search a Recipe' onChange={handleChange}/>
            <Button onClick={handleInput}>Search</Button>
            <Button variant="success"onClick={ (e) => getRecipes(e)} type='button'>Generate Recipes Based on Your Pantry</Button>
            <ul>
                <Grid container className="recipe-space" spacing={2}>
                    <Grid item md={12}>
                        <Grid container justify="center" spacing={.05}>
                            {responseData.map((item, index) =>(
                                <RecipeCard
                                    key={index}
                                    name={item.title}
                                    missingIngredients={item.missedIngredients}
                                    instr={item.analyzedInstructions.map(analyzedInstruction => {
                                        return analyzedInstruction.steps.map(step => {
                                            return step.step + ' '; // This parses the nested array to get the recipe steps!
                                        });
                                    })}
                                    ingr={item.usedIngredients.map(usedIngredient =>{
                                        return usedIngredient.name + ',';
                                    }) + item.missedIngredients.map(missedIngredient => {
                                        return ' '+missedIngredient.name;
                                    })}
                                    summary={[item.summary].map(summary => {
                                        return summary.replace( /(<([^>]+)>)/ig, '');
                                    })}
                                    img={item.image}
                                    prep={item.cookingMinutes}
                                />
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </ul>
        </div>
    );
}

function RecipeBook(){
    /**/
    return (

        <div className="recipe-book-layout">
            <Container>
                <h1 className={"header"}>Recipe Book</h1>
                <RecipeSearchBar/>
            </Container>
        </div>
    );

}

export default RecipeBook;