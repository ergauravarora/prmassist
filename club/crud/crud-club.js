const nano = require('nano')(process.env.COUCHDB_URL || 'http://admin:admin@127.0.0.1:5984');


var club = nano.use('club');


const create = (clubData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await club.insert(clubData);
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
            const response = await club.find(selector);
            resolve(response.docs);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const update = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const _delete = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

module.exports = {
    create, read, update, _delete
};
