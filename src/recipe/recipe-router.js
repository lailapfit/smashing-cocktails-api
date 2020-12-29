const express = require('express');
const recipeRouter = express.Router();
const RecipeService = require('./recipe-service');

recipeRouter
.route('/')
.get((req, res, next) => {
    RecipeService.getAllRecipes(req.app.get('db'))
    .then(recipes => {
        if(!recipes) {
            return res.status(404).json({
                error: {message: 'Recipes unavailable'}
            });
        }
        res.send(recipes);
        res.json();
    })
})
.post((req, res, next) => {
    RecipeService.createRecipe(req.app.get('db'), req.body)
    .then(recipeId => {
        if(!recipeId) {
            return res.status(404).json({
                error: {message: 'Recipe was not created'}
            });
        } else {
            return res.status(200).send('Recipe was successfully created using ID:' + recipeId);
        }
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
    RecipeService.updateRecipeById(req.app.get('db'), req.params.recipeId, req.body)
    .then(recipe => {
        if(!recipe) {
            return res.status(404).json({
                error: {message: 'Recipe cannot be updated'}
            });
        }
        return res.status(200).send('Recipe ID:' + req.params.recipeId + ' successfully updated');
    })
})

recipeRouter
.router('/name/:name')
.get((req, res, next) => {
    RecipeService.getRecipeByName(req.app.get('db'), req.params.name)
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


recipeRouter
.router('/spirit/:spirit')
.get((req, res, next) => {
    RecipeService.getRecipeBySpirit(req.app.get('db'), req.params.spirits)
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

recipeRouter
.router('/difficulty/:difficulty')
.get((req, res, next) => {
    RecipeService.getRecipeByDifficultyLevel(req.app.get('db'), req.params.difficulty)
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

recipeRouter
.router('/tag/:tag')
.get((req, res, next) => {
    RecipeService.getRecipeByTags(req.app.get('db'), req.params.tag)
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

recipeRouter
.router('/similarity/:similarity')
.get((req, res, next) => {
    RecipeService.getSimilarRecipes(req.app.get('db'), req.params.similarity)
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




