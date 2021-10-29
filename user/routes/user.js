const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const { body, validationResult } = require('express-validator');



router.post('/registerUser', [
    // body('userId').isString().notEmpty().trim().escape(),
    // body('fullName').isString().notEmpty().trim().escape(),
    // body('email').isString().notEmpty().trim().escape(),
    // body('phoneNumber').isString().notEmpty().trim().escape(),
    // body('profilePic').isString().notEmpty().trim().escape(),
    // body('start').isString().notEmpty().trim().escape(),
    // body('end').isString().notEmpty().trim().escape(),
    // body('photo').isString().notEmpty().trim().escape()
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, userController.RegisterUser);

router.get('/getUser', (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, userController.GetUser);


module.exports = router;
