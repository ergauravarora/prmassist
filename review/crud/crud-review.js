const nano = require('nano')(process.env.COUCHDB_URL || 'http://admin:admin@127.0.0.1:5984');


var review = nano.use('review');
var airports_service_review = nano.use('airports_service_review');
var airline_service_review = nano.use('airline_service_review');
var prmassist_review = nano.use('prmassist_review');
var review_for_assistance = nano.use('review_for_assistance');


const findAirportsServiceReview = (selector) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await airports_service_review.find(selector);
            console.log(response)
            resolve(response.docs);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

const airportsCreate = (reviewData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await airports_service_review.insert(reviewData);
            resolve(response);  
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const airlineCreate= (reviewData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await airline_service_review.insert(reviewData);
            resolve(response);  
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const prmassistCreate= (reviewData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await prmassist_review.insert(reviewData);
            resolve(response);  
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
const Create= (reviewData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await review_for_assistance.insert(reviewData);
            resolve(response);  
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
const create = (reviewData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await review.insert(reviewData);
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
            const response = await review.find(selector);
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
    create, read, update, _delete ,findAirportsServiceReview,airportsCreate,airlineCreate,prmassistCreate,Create
};
