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
        let spiritId = knex.select('spirit_id').from('spirit').where({name: `${spirit}`});
        if (tags.includes(',')) {
            return knex.select('*').from('recipe').whereRaw('tags = ?', tags.split(',')).orWhere({main_spirit_id: spiritId}).orWhere({level_of_difficulty: `${difficultyLevel}`});
        } else {
            return knex.select('*').from('recipe').where({main_spirit_id: spiritId}).orWhere({level_of_difficulty: `${difficultyLevel}`}).orWhere({tags: `${tags}`});
        }
    },
    updateRecipeById(knex, id, data) {
        return knex('recipe').where({id: id}).update(data);
    },
    createRecipe(knex, data) {
        let recipe = {};
        if(this.verifyRecipe(data)) {
            let spiritId = knex.select('spirit_id').from('spirit').where({name: `${data.spiritName}`});
            recipe.name = data.name;
            recipe.original_creator = data.original_creator || '';
            recipe.add_photo = data.add_photo || false;
            recipe.description = data.description;
            recipe.prep_time = data.prep_time;
            recipe.main_spirit_id = spiritId;
            recipe.ingredients = data.ingredients;
            recipe.garnish = data.garnish || '';
            recipe.instructions = data.instructions;
            recipe.glass_type = data.glass_type;
            recipe.level_of_difficulty = data.level_of_difficulty;
            recipe.tags = data.tags || '';
            recipe.photo_link = data.photo_link || '';
        }
        return knex('recipe').returning('id').insert(recipe);
    },
    verifyRecipe(data) {
        return (data.name && data.description && data.prep_time && data.spiritName && data.ingredients && data.instructions && data.glass_type && data.level_of_difficulty) ? true : false;
    }
}

module.exports = RecipeService