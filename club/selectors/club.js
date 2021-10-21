const clubFields = ["iata", "retailer", "title","description","category","start","end","photo","_rev","_id"];

module.exports = {
    byIata: (iata) => {
        return {
            selector : {
                iata : { "$eq" :iata  }
            },
            fields : clubFields
        };
    },
    byId: (id) => {
        return {
            selector : {
                _id : { "$eq" :id  }
            },
            fields : clubFields
        };
    }

};
