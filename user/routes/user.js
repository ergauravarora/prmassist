const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const { body, validationResult,query } = require('express-validator');



router.post('/registerUser', [
    body('personalDetail').exists(), //must have at least one item,
    body('personalDetail.fullName').isString().notEmpty().trim().escape(),
    body('personalDetail.email').isString().notEmpty().trim().escape(),
    body('personalDetail.phoneNumber').isString().notEmpty().trim().escape(),
    body('payments').exists(),
    body('payments.*.cardNumber').isString().notEmpty().trim().escape(),
    body('payments.*.expiry').isString().notEmpty().trim().escape(),
    body('payments.*.ccv').isString().notEmpty().trim().escape(),
    body('payments.*.cardHolderName').isString().notEmpty().trim().escape(),
    body('payments.*.postalCode').isString().notEmpty().trim().escape(),
    body('travelCompanions').exists(),
    body('travelCompanions.*.firstName').isString().notEmpty().trim().escape(),
    body('travelCompanions.*.secondName').isString().notEmpty().trim().escape(),
    body('travelCompanions.*.nickname').isString().notEmpty().trim().escape(),
    body('travelCompanions.*.email').isString().notEmpty().trim().escape(),
    body('travelCompanions.*.phoneNumber').isString().notEmpty().trim().escape(),
    body('travelDocuments').exists(),
    body('travelDocuments.*.fullName').isString().notEmpty().trim().escape(),
    body('travelDocuments.*.passportNumber').isString().notEmpty().trim().escape(),
    body('travelDocuments.*.expiryDate').isString().notEmpty().trim().escape(),
    body('travelDocuments.*.countryOfBirth').isString().notEmpty().trim().escape(),
    body('bookingHistory').exists(),
    body('bookingHistory.*').isString().notEmpty().trim().escape(),
    body('qrCode').exists(),
    body('qrCode.*').isString().notEmpty().trim().escape(),

    
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, userController.RegisterUser);

router.put('/updateUser', [
    query('id').isString().notEmpty().trim().escape(),
    body('personalDetail').exists(), //must have at least one item,
    body('personalDetail.fullName').isString().notEmpty().trim().escape(),
    body('personalDetail.email').isString().notEmpty().trim().escape(),
    body('personalDetail.phoneNumber').isString().notEmpty().trim().escape(),
    body('payments').exists(),
    body('payments.*.cardNumber').isString().notEmpty().trim().escape(),
    body('payments.*.expiry').isString().notEmpty().trim().escape(),
    body('payments.*.ccv').isString().notEmpty().trim().escape(),
    body('payments.*.cardHolderName').isString().notEmpty().trim().escape(),
    body('payments.*.postalCode').isString().notEmpty().trim().escape(),
    body('travelCompanions').exists(),
    body('travelCompanions.*.firstName').isString().notEmpty().trim().escape(),
    body('travelCompanions.*.secondName').isString().notEmpty().trim().escape(),
    body('travelCompanions.*.nickname').isString().notEmpty().trim().escape(),
    body('travelCompanions.*.email').isString().notEmpty().trim().escape(),
    body('travelCompanions.*.phoneNumber').isString().notEmpty().trim().escape(),
    body('travelDocuments').exists(),
    body('travelDocuments.*.fullName').isString().notEmpty().trim().escape(),
    body('travelDocuments.*.passportNumber').isString().notEmpty().trim().escape(),
    body('travelDocuments.*.expiryDate').isString().notEmpty().trim().escape(),
    body('travelDocuments.*.countryOfBirth').isString().notEmpty().trim().escape(),
    body('bookingHistory').exists(),
    body('bookingHistory.*').isString().notEmpty().trim().escape(),
    body('qrCode').exists(),
    body('qrCode.*').isString().notEmpty().trim().escape(),

    
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, userController.UpdateUser);

router.get('/getUser',[
    query('id').isString().notEmpty().trim().escape()
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, userController.GetUser);


module.exports = router;
