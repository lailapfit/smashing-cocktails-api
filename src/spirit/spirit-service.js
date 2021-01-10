const SpiritService = {
    getAllSpirits(knex) {
        return knex.select('*').from('spirit');
    },
    getSpiritIdByName(knex, name) {
        return knex.select('spirit_id').from('spirit').where({name: `${name}`});
    },
    getSpiritNameById(knex, id) {
        return knex.select('name').from('spirit').where({spirit_id: `${id}`});
    },
    updateSpiritById(knex, id, data) {
        return knex('spirit').returning('name').where({spirit_id: id}).update(data);
    },
    updateSpiritByName(knex, name, data) {
        return knex('spirit').returning('name').where({name: `${name}`}).update(data);
    },
    createSpirit(knex, data) {
        let spirit = {};
        if(this.validateSpirit(knex, data)) {
            spirit.name = data.name;
        }
        console.log('spirit toString: ' + JSON.stringify(spirit));
        return knex('spirit').returning('spirit_id').insert(spirit);
    },
    validateSpirit(knex, data) {
        if(data.hasOwnProperty('name')) {
            let spiritId = knex.select('spirit_id').from('spirit').where({name: `${data.spirit}`});
            return spiritId ? true : false;
        } else {
            return false;
        }
    }
}

module.exports = SpiritService