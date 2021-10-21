const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { body, validationResult } = require('express-validator');

router.post('/ReviewAssistance', [
    body('bookingId').isString().notEmpty().trim().escape(),
    body('age').isString().notEmpty().trim().escape(),
    body('departureAirport').isString().notEmpty().trim().escape(),
    body('arrivalAirport').isString().notEmpty().trim().escape(),
    body('airline').isString().notEmpty().trim().escape(),
    body('departure').notEmpty(),
    body('arrival').notEmpty(),
    body('flight').notEmpty(),
    body('prmassist').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, reviewController.addReviewAssistance);

module.exports = router;
