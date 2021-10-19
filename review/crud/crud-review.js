const review = require('nano')('http://localhost:5984/_utils/#database/review_for_assistance/');




const create = (reviewData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await review.insert(reviewData);
            resolve(response);
        } catch (e) {
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
            reject(e);
        }
    });
};

const update = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve();
        } catch (e) {
        }
    });
};

const _delete = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve();
        } catch (e) {
        }
    });
};

module.exports = {
    create, read, update, _delete
};
