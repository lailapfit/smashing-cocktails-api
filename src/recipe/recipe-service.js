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
        return knex.select('*').from('recipe').where({main_spirit_id: `${spiritId}`});
    },
    getRecipeByDifficultyLevel(knex, difficultyLevel) {
        return knex.select('*').from('recipe').where({difficulty_level: `${difficultyLevel}`});
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
            return knex.select('*').from('recipe').whereRaw('tags = ?', tags.split(',')).orWhere({main_spirit_id: `${spiritId}`}).orWhere({difficulty_level: `${difficultyLevel}`});
        } else {
            return knex.select('*').from('recipe').where({main_spirit_id: `${spiritId}`}).orWhere({difficulty_level: `${difficultyLevel}`}).orWhere({tags: `${tags}`});
        }
    }
    // createWhereQuery(key, values) {
    //     let params = values.split(',');
    //     return params.map(p => {
            
    //     });
    // } 
}