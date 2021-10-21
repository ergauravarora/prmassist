const clubCrud = require('../crud/crud-club');
const log = require('debug')(process.env.DEBUG);
const selector = require('../selectors/club');


const CreateReward = async (req, res, next) => {
    try {
        //Each airport is allowed a max of 8 rewards.

        var ExisitingRewards = await clubCrud.read(selector.byIata(req.body.iata))

        if(ExisitingRewards && ExisitingRewards.length < 8)
        {
            const response = await clubCrud.create(req.body);
            console.log(response);
            res.status(201).json({response, msg: `Saved successfully`});
        }
        else
        {
            res.status(403).json({ msg: `There are more then 8 records for this iata`});
        }
        
        // se
       
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const GetReward = async (req, res, next) => {
    try {
        console.log(JSON.stringify(req.params.iata))
        const response = await clubCrud.read(selector.byIata(req.params.iata));
        console.log(response);
        // se
        res.status(201).json({response, msg: `msg`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const UpdateReward = async (req, res, next) => {
    try {
        console.log(req.query)

        
        var data = await clubCrud.read(selector.byId(req.query.id))
        console.log(data)
        if(data && data.length > 0)
        {
            const response = await clubCrud.update({...data , ...req.body});
            console.log(response);
            res.status(201).json({response, msg: `Updated successfully`});
        }
        else
        {
            res.status(404).json({msg: `No Data`});
        }
        // se
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const DeleteReward = async (req, res, next) => {
    try {
        const response = await clubCrud._delete(req.query.id);
        console.log(response);
        // se
        res.status(201).json({response, msg: `Deleted successfully`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};

module.exports = { CreateReward,GetReward,UpdateReward,DeleteReward };