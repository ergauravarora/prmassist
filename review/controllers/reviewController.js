const reviewCrud = require('../crud/crud-review');
const log = require('debug')(process.env.DEBUG);
const selector = require('../selectors/review');
const utils = require('../review/index');


const addReviewAssistance = async (req, res, next) => {
    try {
        var review = req.body
        var airportCode = req.query.code
        
        const DepartureAirportsServiceReview = await reviewCrud.airportsCreate({...review.departure,
            airport:review.departureAirport,
            date:new Date(),
            airportCode:airportCode
        });        
        var ArrivalAirportsServiceReview =  await reviewCrud.airportsCreate(
            {...review.arrival,
                airport:review.arrivalAirport,
                date:new Date(),
                airportCode:airportCode
            });
        var AirlineServiceReview =          await reviewCrud.airlineCreate(
            {...review.flight,
                airline:review.airline,
                date:new Date(),
                airportCode:airportCode
            });
        var PrmassistReview=                await reviewCrud.prmassistCreate(
            {...review.prmassist,
                bookingId:review.bookingId,
                date:new Date(),
                airportCode:airportCode
            });
        if(ArrivalAirportsServiceReview.ok && DepartureAirportsServiceReview.ok && AirlineServiceReview.ok && PrmassistReview.ok)
        {
            var reviewData = {...review};
            delete reviewData['departure'];
            delete reviewData['arrival'];
            delete reviewData['flight'];
            delete reviewData['prmassist'];
            reviewData = {...reviewData,
                departureReviewID:DepartureAirportsServiceReview.id,
                arrivalReviewID:ArrivalAirportsServiceReview.id,
                flightReviewID:AirlineServiceReview.id,
                prmassistReviewID:PrmassistReview.id,
                date:new Date(),
                airportCode:airportCode
            }
            
             var response = await reviewCrud.Create(reviewData, review.bookingId);
            if(response.ok)
            {
                console.log(response);
                res.status(201).json({response, msg: `Saved successfully`});
            }        
        }
        res.status(400).json({response, msg: `Something is wrong..`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};

const AirportAverageDailyAssistance = async (req, res, next) => {
    try {
        var newarray = [];
        var Response  = [];
        var data = await reviewCrud.findAirportsServiceReview(selector.byIataAndDate('DUB',"2021-10-18T00:00:00.000Z","2021-10-21T00:00:00.000Z"))
        var resp = data.map(d => { d.date = utils.getDate(d.date);
            return d
         })
         
         //array of unique dates
         resp.map(d => 
        {
            var alreadyHave = false;
            if(newarray.length > 0)
            {
                newarray.map(e => {
                    if(e.date === d.date)
                    {
                        alreadyHave = true
                    }
            })
            if(!alreadyHave)
            {
                newarray.push(d) 
            }
            }
            else
            {
                newarray.push(d)
            }
             
         }
    )
    //aarray of data with daily average 
    
    newarray.forEach(n => {
    
        var sum = 0;
        data.filter(d => {
            if(d.date === n.date)
            {
                sum+= d.staff
            }
        });
        
        var dat = data.filter((v) => (v.date === n.date)).length
        
        var avgForDayIs = (sum /  dat).toFixed(1);
        
          Response.push({date:n.date,avg:avgForDayIs})
    })

        res.status(201).json({Response, msg: `message`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const AirportAverageDailyQuality = async (req, res, next) => {
    try {
        var newarray = [];
        var Response  = [];
        var data = await reviewCrud.findAirportsServiceReview(selector.byIataAndDateForQuality('DUB',"2021-10-18T00:00:00.000Z","2021-10-21T00:00:00.000Z"))
        var resp = data.map(d => { d.date = utils.getDate(d.date);
            return d
         })
         
         //array of unique dates
         resp.map(d => 
        {
            var alreadyHave = false;
            if(newarray.length > 0)
            {
                newarray.map(e => {
                    if(e.date === d.date)
                    {
                        alreadyHave = true
                    }
            })
            if(!alreadyHave)
            {
                newarray.push(d) 
            }
            }
            else
            {
                newarray.push(d)
            }
             
         }
    )
    //aarray of data with daily average 
    
    newarray.forEach(n => {
    
        var sum = 0;
        data.filter(d => {
            if(d.date === n.date)
            {
                sum+= d.quality
            }
        });
        
        var dat = data.filter((v) => (v.date === n.date)).length
        
        var avgForDayIs = (sum /  dat).toFixed(1);
        
          Response.push({date:n.date,avg:avgForDayIs})
    })

        res.status(201).json({Response, msg: `message`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const AirportAverageDailyRating = async (req, res, next) => {
    try {
        var newarray = [];
        var Response  = [];
        var data = await reviewCrud.findAirportsServiceReview(selector.byIataAndDateForFacilities('DUB',"2021-10-18T00:00:00.000Z","2021-10-21T00:00:00.000Z"))
        var resp = data.map(d => { d.date = utils.getDate(d.date);
            return d
         })
         
         //array of unique dates
         resp.map(d => 
        {
            var alreadyHave = false;
            if(newarray.length > 0)
            {
                newarray.map(e => {
                    if(e.date === d.date)
                    {
                        alreadyHave = true
                    }
            })
            if(!alreadyHave)
            {
                newarray.push(d) 
            }
            }
            else
            {
                newarray.push(d)
            }
             
         }
    )
    //aarray of data with daily average 
    
    newarray.forEach(n => {
    
        var sum = 0;
        data.filter(d => {
            if(d.date === n.date)
            {
                sum+= d.facilities
            }
        });
        
        var dat = data.filter((v) => (v.date === n.date)).length
        
        var avgForDayIs = (sum /  dat).toFixed(1);
        
          Response.push({date:n.date,avg:avgForDayIs})
    })

        res.status(201).json({Response, msg: `message`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const AirportThreeMonthData = async (req, res, next) => {
    
    var {first,second,third} = req.query;

        try {
            var ThreeMonthAvg = [
                {month:first,Data:[]},
                {month:second,Data:[]},
                {month:third,Data:[]}
            ]

            for(i=0;i<3;i++)
            {
            
                var newarray = [];
                var data = [];
            var Response  = [];
            var startDate = "2021-"+ThreeMonthAvg[i].month+"-01T00:00:00.000Z";
            var endDate = "2021-"+ThreeMonthAvg[i].month+"-31T00:00:00.000Z"
            data = await reviewCrud.findAirportsServiceReview(selector.byIataAndDateForAvg('DUB',new Date(startDate),new Date(endDate) ))
            var resp = data.map(d => { d.date = utils.getDate(d.date);
                return d
             })
             
             //array of unique dates
             resp.map(d => 
            {
                var alreadyHave = false;
                if(newarray.length > 0)
                {
                    newarray.map(e => {
                        if(e.date === d.date)
                        {
                            alreadyHave = true
                        }
                })
                if(!alreadyHave)
                {
                    newarray.push(d) 
                }
                }
                else
                {
                    newarray.push(d)
                }
                 
             }
        )
        //aarray of data with daily average 
        
        newarray.forEach(n => {
        
            var sum = 0;
            data.filter(d => {
                if(d.date === n.date)
                {
                    sum+= d.staff;
                    sum+= d.quality;
                    sum+= d.facilities;
                }
            });
            
            var dat =(data.filter((v) => (v.date === n.date)).length) * 3; 
            
            var avgForDayIs = (sum /  dat).toFixed(1);
            
              Response.push({date:n.date,avg:avgForDayIs})
        })

        ThreeMonthAvg[i].Data = Response;

        }
            
    
            res.status(201).json({ThreeMonthAvg, msg: `message`});
        } 
        
     catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};

module.exports = { addReviewAssistance,AirportAverageDailyAssistance,AirportAverageDailyQuality,AirportAverageDailyRating,AirportThreeMonthData };