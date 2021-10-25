const testersFields = ["name", "email", "platform"];
const AirportStaffService = ['staff','date'];
const AirportQualityService = ['quality','date'];
const AirportFacilitiesService = ['facilities','date'];

const AirportAvgService = ['facilities','quality','staff','date'];


module.exports = {
    byEmail: (email) => {
        return {
            selector : {
                email : { "$eq" : email }
            },
            fields : testersFields
        };
    },
    byIataAndDate:(code,startDate,endDate) => {
        return {
            selector: {
                airport:code,
                date:{"$gt":startDate,"$lt":endDate},
            },  
            fields: AirportStaffService,
            limit:100
        };
    }
    ,
    byIataAndDateForQuality:(code,startDate,endDate) => {
        return {
            selector: {
                airport:code,
                date:{"$gt":startDate,"$lt":endDate},
            },  
            fields: AirportQualityService,
            limit:100
        };
    }
    ,
    byIataAndDateForFacilities:(code,startDate,endDate) => {
        return {
            selector: {
                airport:code,
                date:{"$gt":startDate,"$lt":endDate},
            },  
            fields: AirportFacilitiesService,
            limit:100
        };
    },
    byIataAndDateForAvg:(code,startDate,endDate) => {
        return {
            selector: {
                airport:code,
                date:{"$gt":startDate,"$lt":endDate},
            },  
            fields: AirportAvgService,
            limit:100
        };
    }
};
