import axios from 'axios'

    const complexSearchInstance = axios.create({
        /* Use this api instance to perform a complex search with included ingredients */
        baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
        headers: {
            'x-rapidapi-key': 'Insert key here',
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        },
    });

    const randomSearchInstance = axios.create({
        /* Use this api instance to preform a random recipe search */
        baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
        headers: {
            'x-rapidapi-key': 'Insert key here',
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            "useQueryString": true
        }
    });
    
    const searchRecipeInstance = axios.create({
        /* Use this api instance to preform a complex search with a form filled search query*/
        baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
        headers: {
            'x-rapidapi-key': 'Insert key here',
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    });
    export default {
        getComplexSearchWithIngredients:() =>
            complexSearchInstance({
                /* This api function returns a complex search with ingredients, instructions, summary, and more */
                'method': 'GET',
                'params':{
                    addRecipeInformation: 'true',
                    number: '12',
                    includeIngredients: JSON.stringify(JSON.parse(localStorage.getItem('ingredients')).map(label =>{
                        return label.label; })).replace(/"/g,'').replace('[',"'").replace(']',"'").replace(/,/g,', '),
                    instructionsRequired: 'true',
                    fillIngredients: 'true',
                },
                transformResponse: [function (data){
                    console.log('Transforming data...')
                    const json = JSON.parse(data)
                    console.log(json)
                    data = {
                        json
                    }
                    return data;
                }],

            }),
        getRandomSearch:() => randomSearchInstance({
            /* This api call returns a single random recipe */
            'method': 'GET',
            'params': {
                number:"3"
            },
            transformResponse: [function (data){
                console.log('Transforming randSearch...')
                const json = JSON.parse(data)
                console.log(json)
                data = {
                    json
                }
                return data;
            }]
        }),
        getRecipeSearch:(searchQuery) => searchRecipeInstance({
            /* This api function returns a complex search with the 'query' field as the main search parameter */
            'method' : 'GET',
            'params' : {
                query: searchQuery,
                addRecipeInformation: 'true',
                number: '12',
                instructionsRequired: 'true',
                includeIngredients: '',
                fillIngredients: 'true'
                },
            transformResponse: [function (data){
                console.log('Transforming data...')
                const json = JSON.parse(data)
                console.log(json)
                data = {
                    json
                }
                return data;
        }]
    })
}
/*
*/