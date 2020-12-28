const express = require('express');
const recipeRouter = express.Router();
const RecipeService = require('./recipe-service');

recipeRouter
.route('/')
.get((req, res, next) => {
    RecipeService.getAllRecipes(req.app.get('db'))
    .then(recipes => {
        res.send(recipes);
        res.json();
    })
})

recipeRouter
.router('/id/:recipeId')
.get((req, res, next) => {
    RecipeService.getRecipeById(req.app.get('db'), req.params.recipeId)
    .then(recipe => {
        if(!recipe) {
            return res.status(404).json({
                error: {message: 'Recipe does not exist'}
            });
        }
        res.recipe = recipe;
        next();
    })
    .catch(next);
})
.get((req, res, next) => {
    res.json(res.recipe);
})
.put((req, res, next) => {

})

recipeRouter
.router('/name/:name')
.get((req, res, next) => {
    //get recipe by name
})

recipeRouter
.router('/spirit/:spirit')
.get((req, res, next) => {
    //get recipe by spirit
})

recipeRouter
.router('/difficulty/:difficulty')
.get((req, res, next) => {
    //get recipe by level of difficulty
})

recipeRouter
.router('/tag/:tag')
.get((req, res, next) => {
    //get recipe by tag
})




