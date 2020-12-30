const SpiritService = {
    getAllSpirits(knex) {
        return knex.select('*').from('spirit');
    },
    getSpiritId(knex, name) {
        return knex.select('spirit_id').where({name: `${name}`});
    },
    getSpiritNameById(knex, id) {
        return knex.select('name').where({spirit_id: `${id}`});
    },
    updateSpiritById(knex, id, data) {
        return knex('spirit').where({spirit_id: id}).update(data);
    },
    updateSpiritByName(knex, name, data) {
        return knex('spirit').where({name: `${name}`}).update(data);
    },
    createSpirit(knex, data) {
        let spirit = {};
        if(this.verifySpirit(data)) {
            spirit.name = data.name;
        }
        return knex('spirit').returning('id').insert(spirit);
    },
    verifySpirit(data) {
        return data.name ? true : false;
    }
}

module.exports = SpiritService;