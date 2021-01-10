const express = require('express');
const spiritRouter = express.Router();
const SpiritService = require('./spirit-service');

spiritRouter
.route('/')
.all((req, res, next) => {
    SpiritService.getAllSpirits(req.app.get('db'))
    .then(spirits => {
        if(!spirits) {
            return res.status(404).json({
                error: {message: 'Spirits unavailable'}
            });
        }
        res.spirits = spirits;
        next();
    })
    .catch(next);
})
.get((req, res, next) => {
    res.json(res.spirits);
})
.post((req, res, next) => {
    console.log('request: ' + req.body.name);
    SpiritService.createSpirit(req.app.get('db'), req.body)
    .then(spiritId => {
        if(!spiritId) {
            return res.status(404).json({
                error: {message: 'Spirit was not created'}
            });
        } else {
            return res.status(200).send('Spirit was successfully created using ID:' + spiritId);
        }
    })
    .catch(err => { 
            return res.status(404).json({error: {message: err}
        });
    })
})

spiritRouter
.route('/name/:spiritName')
.all((req, res, next) => {
    SpiritService.getSpiritIdByName(req.app.get('db'), req.params.spiritName)
    .then(spirit => {
        if(!spirit) {
            return res.status(404).json({
                error: {message: 'Spirit does not exist'}
            });
        }
        res.spirit = spirit;
        next();
    })
    .catch(next);
})
.get((req, res, next) => {
    res.json(res.spirit);
})
.put((req, res, next) => {
    SpiritService.updateSpiritByName(req.app.get('db'), req.params.spiritName, req.body)
    .then(spirit => {
        if (!spirit) {
            return res.status(404).json({
                error: {message: 'Spirit cannot be updated'}
            });
        }
        return res.status(200).send('Spirit:' + spirit + ' successfully updated');
    })
    .catch(err => { 
        return res.status(404).json({error: {message: err}
        });
    })
})

spiritRouter
.route('/id/:spiritId')
.all((req, res, next) => {
    SpiritService.getSpiritNameById(req.app.get('db'), req.params.spiritId)
    .then(spirit => {
        if (!spirit) {
            return res.status(404).json({
                error: {message: 'Spirit does not exist'}
            });
        }
        res.spirit = spirit;
        next();
    })
    .catch(next);
})
.get((req, res, next) => {
    res.json(res.spirit);
})
.put((req, res, next) => {
    SpiritService.updateSpiritById(req.app.get('db'), req.params.spiritId, req.body)
    .then(spirit => {
        if (!spirit) {
            return res.status(404).json({
                error: {message: 'Spirit cannot be updated'}
            });
        }
        return res.status(200).send('Spirit ID:' + spirit + ' successfully updated');
    })
    .catch(err => { 
        return res.status(404).json({error: {message: err}
        });
    })
})

module.exports = spiritRouter