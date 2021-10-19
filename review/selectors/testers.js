const testersFields = ["name", "email", "platform"];

module.exports = {
    byEmail: (email) => {
        return {
            selector : {
                email : { "$eq" : email }
            },
            fields : testersFields
        };
    }
};
