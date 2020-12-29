const express = require('express');
const spiritRouter = express.Router();
const SpiritService = require('./spirit-service');

spiritRouter
.route('/')
.get((req, res, next) => {
    SpiritService.getAllSpirits(req.app.get('db'))
    .then(spirits => {
        res.send(spirits);
        res.json();
    })
})

spiritRouter
.route('/name/:spiritName')
.get((req, res, next) => {
    SpiritService.getSpiritId(req.app.get('db'), req.params.spiritName)
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
        return res.status(200).send('Spirit:' + req.params.spiritName + ' successfully updated');
    })
})

spiritRouter
.route('/id/:spiritId')
.get((req, res, next) => {
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
        return res.status(200).send('Spirit ID:' + req.params.spiritId + ' successfully updated');
    })
})