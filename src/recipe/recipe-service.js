const RecipeService = {
    getAllRecipes(knex) {
        return knex.select('*').from('recipe');
    },
    getRecipeById(knex, id) {
        if(id.includes(',')) {
            return knex.select('*').from('recipe').whereRaw('id = ?', id.split(','));
        } else {
            return knex.select('*').from('recipe').where({id: id});
        }
    },
    getRecipeByName(knex, name) {
        return knex.select('*').from('recipe').where({name: `${name}`});
    },
    getRecipeBySpirit(knex, spirit) {
        let spiritId = knex.select('spirit_id').from('spirit').where({name: `${spirit}`});
        return knex.select('*').from('recipe').where({main_spirit_id: spiritId});
    },
    getRecipeByDifficultyLevel(knex, difficultyLevel) {
        return knex.select('*').from('recipe').where({level_of_difficulty: `${difficultyLevel}`});
    },
    getRecipeByTags(knex, tags) {
        if(tags.includes(',')) {
            return knex.select('*').from('recipe').whereRaw('tags = ?', tags.split(','));
        } else {
            return knex.select('*').from('recipe').where({tags: `${tags}`});
        }
    },
    getSimilarRecipes(knex, tags, spirit, difficultyLevel) {
        console.log('getSimilarRecipes tags: ' + tags);
        let tagsToArrayOrString = this.formatArray(tags);
        let spiritId = knex.select('spirit_id').from('spirit').where({name: spirit});

        if (tagsToArrayOrString && spirit && difficultyLevel) {
            return knex.select('*').from('recipe').whereRaw('tags = ?', tagsToArrayOrString).orWhere({main_spirit_id: spiritId}).orWhere({level_of_difficulty: `${difficultyLevel}`});
        } else if (tagsToArrayOrString && spirit && !difficultyLevel) {
            return knex.select('*').from('recipe').whereRaw('tags = ?', tagsToArrayOrString).orWhere({main_spirit_id: spiritId});
        } else if (tagsToArrayOrString && difficultyLevel && !spirit) {
            return knex.select('*').from('recipe').whereRaw('tags = ?', tagsToArrayOrString).orWhere({level_of_difficulty: `${difficultyLevel}`});
        } else if (spirit && difficultyLevel && tagsToArrayOrString === '') {
            return knex.select('*').from('recipe').orWhere({main_spirit_id: spiritId}).orWhere({level_of_difficulty: `${difficultyLevel}`});
        } else if (spirit && !difficultyLevel && tagsToArrayOrString === '') {
            return knex.select('*').from('recipe').Where({main_spirit_id: spiritId});
        } else if (difficultyLevel && !spirit && tagsToArrayOrString === '') {
            return knex.select('*').from('recipe').where({level_of_difficulty: `${difficultyLevel}`});
        } else if (tagsToArrayOrString && !difficultyLevel && !spirit) {
            return knex.select('*').from('recipe').whereRaw('tags = ?', tagsToArrayOrString);
        }
    },
    updateRecipeById(knex, id, data) {
        return knex('recipe').returning('*').where({id: id}).update(data);
    },
    getRecipeByIngredient(knex, ingredient) {
        console.log('getRecipeByIngredient ingredient: ' + ingredient);
        return knex.raw("select DISTINCT ON(id) id, * from recipe,jsonb_array_elements_text(recipe.ingredients) as ingredient where ingredient like '%" + ingredient + "%'");
    },
    getRecipeByIngredients(knex, ingredients) {
        let ingredientsFormatted = this.formatArrayToOr(ingredients);
        console.log('getRecipeByIngredients ingredientsFormatted: ' + ingredientsFormatted);
        return knex.raw("select DISTINCT ON(id) id, * from recipe,jsonb_array_elements_text(recipe.ingredients) as ingredient where " + ingredientsFormatted);
    },
    createRecipe(knex, data, spiritId) {
        let recipe = {};
        console.log('createRecipe data: ' + JSON.stringify(data));
        if(this.validateRecipe(data)) {
            recipe.name = data.name;
            recipe.original_creator = data.original_creator || null;
            recipe.add_photo = data.add_photo || false;
            recipe.description = data.description;
            recipe.prep_time = data.prep_time;
            recipe.main_spirit_id = spiritId;
            recipe.ingredients = JSON.stringify(data.ingredients);
            recipe.garnish = data.garnish || null;
            recipe.instructions = JSON.stringify(data.instructions);
            recipe.glass_type = data.glass_type;
            recipe.level_of_difficulty = data.level_of_difficulty;
            recipe.tags = Array.isArray(data.tags) ? JSON.stringify(data.tags) : null;
            recipe.photo_link = data.photo_link || null;
            console.log('createRecipe Stringify: ' + JSON.stringify(recipe));
        }
        return knex('recipe').returning('id').insert(recipe);
    },
    validateRecipe(data) {
        return (data.name && data.description && data.prep_time && data.spiritName && data.ingredients && data.instructions && data.glass_type && data.level_of_difficulty) ? true : false;
    },
    formatArrayToOr(arr) {
        let formated = arr.map(ar => {
            return "ingredient like '%" + ar + "%'" 
        });
        return formated.join(' OR ');
    }
}

module.exports = RecipeService;