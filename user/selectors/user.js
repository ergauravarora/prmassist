const userFields = ["fcmToken","personalDetail","payments","travelCompanions","travelDocuments","bookingHistory","qrCode","_rev","_id"]
module.exports = {
    byId: (id) => {
        return {
            selector : {
                _id : { "$eq" :id  }
            },
            fields : userFields
        };
    }

};
