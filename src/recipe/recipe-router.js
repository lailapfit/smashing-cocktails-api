const express = require('express');
const recipeRouter = express.Router();
const RecipeService = require('./recipe-service');
const SpiritService = require('../spirit/spirit-service');

recipeRouter
.route('/')
.all((req, res, next) => {
    RecipeService.getAllRecipes(req.app.get('db'))
    .then(recipes => {
        if(!recipes) {
            return res.status(404).json({
                error: {message: 'Recipes unavailable'}
            });
        }
        res.recipes = recipes;
        next();
    })
    .catch(next);
})
.get((req, res, next) => {
    res.json(res.recipes);
})
.post((req, res, next) => {
    SpiritService.getSpiritIdByName(req.app.get('db'), req.body.spiritName)
    .then(spiritId => {
        console.log('post spirit id: ' + spiritId);
        if(spiritId[0].spirit_id) {
            console.log('post spirit id[0]: ' + spiritId[0].spirit_id);
            RecipeService.createRecipe(req.app.get('db'), req.body, spiritId[0].spirit_id)
            .then(recipeId => {
                console.log('post recipe id: ' + recipeId);
                if(!recipeId) {
                    return res.status(404).json({
                        error: {message: 'Recipe was not created'}
                    });
                } else {
                    return res.status(200).send('Recipe was successfully created using ID:' + recipeId);
                }
            })
            .catch(err => { 
                return res.status(404).json({error: {message: err, function: 'createRecipe'}
                });
            })
        }
    })
    .catch(err => { 
        return res.status(404).json({error: {message: err, function: 'getSpiritIdByName'}
        });
    })
})

recipeRouter
.route('/id/:recipeId')
.all((req, res, next) => {
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
        return res.status(200).send('Recipe:' + JSON.stringify(recipe) + ' successfully updated');
    })
    .catch(err => { 
        return res.status(404).json({error: {message: err}
        });
    })
})

recipeRouter
.route('/name/:name')
.all((req, res, next) => {
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
.route('/spirit/:spirit')
.all((req, res, next) => {
    RecipeService.getRecipeBySpirit(req.app.get('db'), req.params.spirit)
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
.route('/difficulty/:difficulty')
.all((req, res, next) => {
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
.route('/tag/:tag')
.all((req, res, next) => {
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
.route('/similarity/:spirit/:difficulty/:tags')
.all((req, res, next) => {
    console.log('similarity spirit: ' + req.params.spirit);
    console.log('similarity difficulty: ' + req.params.difficulty);
    console.log('similarity tags: ' + req.params.tags);
    RecipeService.getSimilarRecipes(req.app.get('db'), req.params.tags, req.params.spirit, req.params.difficulty)
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
.route('/ingredients/:ingredients')
.all((req, res, next) => {
    let ingredients = req.params.ingredients.includes(',') ? req.params.ingredients.split(',') : req.params.ingredients;
    console.log('/ingredients : ' + ingredients);
    if (Array.isArray(ingredients)) {
        RecipeService.getRecipeByIngredients(req.app.get('db'), ingredients)
        .then(recipes => {
            if(!recipes.rowCount > 0) {
                return res.status(404).json({
                    error: {message: 'Recipe not found'}
                });
            }
            console.log('getRecipeByIngredient ingredients: ' + ingredients);
            res.recipes = recipes.rows;
            next();
        })
        .catch(next);
    } else {
        RecipeService.getRecipeByIngredient(req.app.get('db'), ingredients)
        .then(recipes => {
            if(!recipes.rowCount > 0) {
                return res.status(404).json({
                    error: {message: 'Recipe not found'}
                });
            }
            console.log('getRecipeByIngredient ingredients: ' + ingredients);
            res.recipes = recipes.rows;
            next();
        })
        .catch(next);
        }
})
.get((req, res, next) => {
    res.json(res.recipes);
})

module.exports = recipeRouter;


