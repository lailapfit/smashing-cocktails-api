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

})

spiritRouter
.route('/id/:spiritId')
.get((req, res, next) => {
    SpiritService.getSpiritNameById(req.app.get('db'), req.params.spiritId)
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
    
})