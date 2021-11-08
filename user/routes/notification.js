const express = require('express');
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { body, validationResult,query } = require('express-validator');

router.post('/storeToken', [
    body('userId').isString().notEmpty().trim().escape(),
    body('fcmToken').isString().notEmpty().trim().escape(),
    
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, notificationController.StoreToken);

router.post('/sendNotification', [
    body('userId').isString().notEmpty().trim().escape(),
    body('notificationTitle').isString().notEmpty().trim().escape(),
    body('notificationText').isString().notEmpty().trim().escape(),
    
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, notificationController.SendNotification);

module.exports = router;