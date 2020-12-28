const SpiritService = {
    getAllSpirits(knex) {
        return knex.select('*').from('spirit');
    },
    getSpiritId(knex, name) {
        return knex.select('spirit_id').where({name: `${name}`});
    },
    getSpiritNameById(knex, id) {
        return knex.select('name').where({spirit_id: `${id}`});
    }
}