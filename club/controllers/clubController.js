const clubCrud = require('../crud/crud-club');
const log = require('debug')(process.env.DEBUG);
const selector = require('../selectors/club');


const CreateReward = async (req, res, next) => {
    try {
        const response = await clubCrud.create(req.body);
        console.log(response);
        // se
        res.status(201).json({response, msg: `Saved successfully`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const GetReward = async (req, res, next) => {
    try {
        const response = await clubCrud.read(selector.byIata(req.param.iata));
        console.log(response);
        // se
        res.status(201).json({response, msg: `Saved successfully`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const UpdateReward = async (req, res, next) => {
    try {
        const response = await clubCrud.update(req.body);
        console.log(response);
        // se
        res.status(201).json({response, msg: `Saved successfully`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const DeleteReward = async (req, res, next) => {
    try {
        const response = await clubCrud.create(req.body);
        console.log(response);
        // se
        res.status(201).json({response, msg: `Saved successfully`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};

module.exports = { CreateReward,GetReward,UpdateReward,DeleteReward };