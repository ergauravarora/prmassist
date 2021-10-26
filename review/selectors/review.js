const testersFields = ["name", "email", "platform"];
const AirportStaffService = ['staff','date'];
const AirportQualityService = ['quality','date'];
const AirportFacilitiesService = ['facilities','date','quality','staff'];

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
                airportCode:code,
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
                airportCode:code,
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
                airportCode:code,
                date:{"$gt":startDate,"$lt":endDate},
            },  
            fields: AirportFacilitiesService,
            limit:100
        };
    },
    byIataAndDateForAvg:(code,startDate,endDate) => {
        return {
            selector: {
                airportCode:code,
                date:{"$gt":startDate,"$lt":endDate},
            },  
            fields: AirportAvgService,
            limit:100
        };
    },
    byIataforExcludeWorda:(airportCode) => {
        return {
            selector:{
                airportCode:airportCode
            },
            fields:['word']
        }
        }
        ,
    byIataforWordsbyKey:(airportCode,key) => {
        return {
                selector: {
                    key:key,
                    airportCode:airportCode
                }, 
                fields: ['key', 'count','_rev','_id'],
        }
        },
        byIataforExcludeWordsAndCount:(airportCode) => {
            return {
                selector:{
                    airportCode:airportCode
                },
                fields:['key', 'count']
            }
            }
        
}
