const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const { body, validationResult,query} = require('express-validator');
const {FileUpload} =  require('../user/user');



router.post('/registerUser', [
    body('personalDetail').exists(), //must have at least one item,
    body('personalDetail.fullName').isString().notEmpty().trim().escape(),
    body('personalDetail.email').isString().notEmpty().trim().escape(),
    body('personalDetail.phoneNumber').isString().notEmpty().trim().escape(),
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


router.post('/AddUserToTravelCompanionList',[
    query('firebaseid').isString().notEmpty().trim().escape(),
    body('firstName').isString().notEmpty().trim().escape(),
    body('secondName').isString().notEmpty().trim().escape(),
    body('nickname').isString().notEmpty().trim().escape(),
    body('email').isString().notEmpty().trim().escape(),
    body('phoneNumber').isString().notEmpty().trim().escape(),
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.AddUserToTravelCompanionList);

router.get('/GetTravelCompanionList',[
    query('firebaseid').isString().notEmpty().trim().escape()
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.GetTravelCompanionList)
router.delete('/DeleteTravelCompanionEntry',[
    query('firebaseid').isString().notEmpty().trim().escape(),
    query('email').isString().notEmpty().trim().escape()
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.DeleteTravelCompanionEntry)


router.post('/AddPayementMethod',[
    query('firebaseid').isString().notEmpty().trim().escape(),
     body('cardNumber').isString().notEmpty().trim().escape(),
     body('expiry').isString().notEmpty().trim().escape(),
     body('ccv').isString().notEmpty().trim().escape(),
     body('cardHolderName').isString().notEmpty().trim().escape(),
     body('postalCode').isString().notEmpty().trim().escape(),
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.AddPayementMethod);

router.get('/GetPayementMethods',[
    query('firebaseid').isString().notEmpty().trim().escape()
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.GetPayementMethods)

router.delete('/DeletePayementMethod',[
    query('firebaseid').isString().notEmpty().trim().escape(),
    query('id').isString().notEmpty().trim().escape()
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.DeletePayementMethod)



router.post('/AddTravelDocument',[
    query('firebaseid').isString().notEmpty().trim().escape(),
    body('fullName').isString().notEmpty().trim().escape(),
    body('passportNumber').isString().notEmpty().trim().escape(),
    body('expiryDate').isString().notEmpty().trim().escape(),
    body('countryOfBirth').isString().notEmpty().trim().escape()
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.AddTravelDocument);

router.get('/GetTravelDocuments',[
    query('firebaseid').isString().notEmpty().trim().escape()
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.GetTravelDocuments)

router.delete('/DeleteTravelDocument',[
    query('firebaseid').isString().notEmpty().trim().escape(),
    query('id').isString().notEmpty().trim().escape()
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.DeleteTravelDocument)


router.post('/AddQrData',[
    query('firebaseid').isString().notEmpty().trim().escape(),
    //body('flightNumber').isString().notEmpty().trim().escape(),
    FileUpload
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.AddQrData);

router.get('/GetQrDatas',[
    query('firebaseid').isString().notEmpty().trim().escape()
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.GetQrDatas)

router.delete('/DeleteQrData',[
    query('firebaseid').isString().notEmpty().trim().escape(),
    query('id').isString().notEmpty().trim().escape()
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
},userController.DeleteQrData)


module.exports = router;
