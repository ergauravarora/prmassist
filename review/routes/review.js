const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { body, validationResult,query } = require('express-validator');

router.post('/ReviewAssistance', [
    query('code').isString().notEmpty().trim().escape(),
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

router.get('/AirportAverageDailyAssistance',[
    query('code').isString().notEmpty().trim().escape(),
    query('endDate').isString().notEmpty().trim().escape(),
    query('startDate').isString().notEmpty().trim().escape(),
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},reviewController.AirportAverageDailyAssistance)

router.get('/AirportAverageDailyQuality',[
    query('code').isString().notEmpty().trim().escape(),
    query('endDate').isString().notEmpty().trim().escape(),
    query('startDate').isString().notEmpty().trim().escape(),
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},reviewController.AirportAverageDailyQuality)

router.get('/AirportAverageDailyRating',[
    query('code').isString().notEmpty().trim().escape(),
    query('endDate').isString().notEmpty().trim().escape(),
    query('startDate').isString().notEmpty().trim().escape(),
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},reviewController.AirportAverageDailyRating)

router.get('/AirportThreeMonthData',[
    query('code').isString().notEmpty().trim().escape(),
    query('first').isString().notEmpty().trim().escape(),
    query('third').isString().notEmpty().trim().escape(),
    query('second').isString().notEmpty().trim().escape(),
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}
,reviewController.AirportThreeMonthData)


//GET /AirportAverageDailyAssistance/{startDate, endDate, IATA}
//GET /AirportAverageDailyQuality/{startDate, endDate, IATA}
//GET /AirportAverageDailyRating/{startDate, endDate, IATA}
//GET /AirportThreeMonthData/{months, IATA}

module.exports = router;
