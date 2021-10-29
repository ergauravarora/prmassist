const nano = require('nano')(process.env.COUCHDB_URL || 'http://admin:admin@127.0.0.1:5984');


var users = nano.use('users');


const create = (usersData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await users.insert(usersData);
            resolve(response);  
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const read = (selector) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await users.find(selector);
            resolve(response.docs);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const update = (usersData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await users.insert(usersData);
            resolve(response);  
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const _delete = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            var record =await users.get(id);
            const response = await users.destroy(record._id,record._rev)
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

module.exports = {
    create, read, update, _delete
};
