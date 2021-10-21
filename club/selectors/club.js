const clubFields = ["iata", "retailer", "title","description","category","start","end","photo"];

module.exports = {
    byIata: (iata) => {
        return {
            selector : {
                iata : { "$eq" :iata  }
            },
            fields : clubFields
        };
    }
};
