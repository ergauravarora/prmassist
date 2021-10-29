const userCrud = require('../crud/crud-user');
const selector = require('../selectors/user');


const RegisterUser  = async (req, res, next) => {
    try {
            const response = await userCrud.create(req.body);
            console.log(response);
            res.status(201).json({response, msg: `Saved successfully`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};


const GetUser = async (req, res, next) => {
    try {
        //console.log(JSON.stringify(.id))
        var {id } = req.query;
        const response = await userCrud.read(selector.byId(id));
        console.log(response);
        // se
        res.status(201).json({response, msg: `User Data`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};

const UpdateUser =  async (req, res, next) => {
    try {
        //console.log(JSON.stringify(.id))
        var {id } = req.query;
        const user = await userCrud.read(selector.byId(id));
        if(user.length > 0)
        {
            var updatedUser = {...user[0],...req.body};
            
            var response= await userCrud.create(updatedUser);
            
            // se
            res.status(201).json({response, msg: `User Data Updated`});
        }
        else
        {
            res.status(400).json({user, msg: `No Data Found for user id "${id}"`});
        }
        
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}


module.exports = { RegisterUser,GetUser,UpdateUser };