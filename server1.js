const {animals} = require('./data/animals.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// get() method requires two parameters . The first is a string that describes the route the client will have to fetch from. The second is a callback function that will execute every time that route is accessed with a GET request.
// we are using send() method from the res parameter to send string 'Hello' to our client.
function filterByQuery(query, animalsArray){
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // save personality traits as dedicated array
        //If personality traits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string'){
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            /* Check the trait against each animal in the filteredResults array.
            Initially, it is a copy of the AnimalArray, but we are updating for each 
            trait in the .forEach() loop.
            For each trait being targeted by the filter, the filteredResults array will then contain
            only the entries that contain the trait, so at the end we will have an array of animals
            that have everyone of the traits when the .forEach() loop is finished.
             */
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    
    if (query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}
// this is the route
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query){
        results = filterByQuery(req.query, results);
    }
    console.log(req.query)
    res.json(results);
});
// this is the second route. param route must come after other routes
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (results) {
        res.json(result);
    } else {
        res.send(400);
    }
});
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});