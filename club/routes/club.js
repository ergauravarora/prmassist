const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const { body, validationResult } = require('express-validator');

router.post('/reward', [
    body('iata').isString().notEmpty().trim().escape(),
    body('retailer').isString().notEmpty().trim().escape(),
    body('title').isString().notEmpty().trim().escape(),
    body('description').isString().notEmpty().trim().escape(),
    body('category').isString().notEmpty().trim().escape(),
    body('start').isString().notEmpty().trim().escape(),
    body('end').isString().notEmpty().trim().escape(),
    body('photo').isString().notEmpty().trim().escape()
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, clubController.CreateReward);

router.get('/reward/iata', (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, clubController.GetReward);

router.put('/reward', [
    body('iata').isString().notEmpty().trim().escape(),
    body('retailer').isString().notEmpty().trim().escape(),
    body('title').isString().notEmpty().trim().escape(),
    body('description').isString().notEmpty().trim().escape(),
    body('category').isString().notEmpty().trim().escape(),
    body('start').isString().notEmpty().trim().escape(),
    body('end').isString().notEmpty().trim().escape(),
    body('photo').isString().notEmpty().trim().escape()
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, clubController.UpdateReward);

router.delete('/reward', (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, clubController.DeleteReward);


module.exports = router;
