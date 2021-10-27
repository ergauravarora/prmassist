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
        await utils.addMostRecentWords(review.departure.comments,airportCode)

        var ArrivalAirportsServiceReview =  await reviewCrud.airportsCreate(
            {...review.arrival,
                airport:review.arrivalAirport,
                date:new Date(),
                airportCode:airportCode
            });
            await utils.addMostRecentWords(review.arrival.comments,airportCode)
        var AirlineServiceReview =          await reviewCrud.airlineCreate(
            {...review.flight,
                airline:review.airline,
                date:new Date(),
                airportCode:airportCode
            });
            await utils.addMostRecentWords(review.flight.comments,airportCode)
        var PrmassistReview=                await reviewCrud.prmassistCreate(
            {...review.prmassist,
                bookingId:review.bookingId,
                date:new Date(),
                airportCode:airportCode
            });
            await utils.addMostRecentWords(review.prmassist.comments,airportCode)
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
        else
        {
            res.status(400).json({response, msg: `Something is wrong..`});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};

const AirportAverageDailyAssistance = async (req, res, next) => {
    try {
        var {code,startDate,endDate} = req.query
        var newarray = [];
        var Response  = [];
        var data = await reviewCrud.findAirportsServiceReview(selector.byIataAndDate(code,new Date(startDate+'T00:00:00.000Z').toISOString(),new Date(endDate+'T23:59:59.999Z').toISOString()))
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
                sum+= Number(d.staff) 
            }
        });
        
        var dat = data.filter((v) => (v.date === n.date)).length
        
        var avgForDayIs = (sum /  dat).toFixed(1);
        
          Response.push({date:n.date,avg:avgForDayIs})
    })

        res.status(200).json({Response, msg: `message`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const AirportAverageDailyQuality = async (req, res, next) => {
    try {
        var {code,startDate,endDate} = req.query
        var newarray = [];
        var Response  = [];
        var data = await reviewCrud.findAirportsServiceReview(selector.byIataAndDateForQuality(code,new Date(startDate+'T00:00:00.000Z').toISOString(),new Date(endDate+'T23:59:59.999Z').toISOString()))
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
                sum+= Number(d.quality)
            }
        });
        
        var dat = data.filter((v) => (v.date === n.date)).length
        
        var avgForDayIs = (sum /  dat).toFixed(1);
        
          Response.push({date:n.date,avg:avgForDayIs})
    })

        res.status(200).json({Response, msg: `message`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const AirportAverageDailyRating = async (req, res, next) => {
    try {
        var {code,startDate,endDate} = req.query
        var newarray = [];
        var Response  = [];
        var data = await reviewCrud.findAirportsServiceReview(selector.byIataAndDateForFacilities(code,new Date(startDate+'T00:00:00.000Z').toISOString(),new Date(endDate+'T23:59:59.999Z').toISOString()))
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
                    sum+= Number(d.staff);
                    sum+= Number(d.quality);
                    sum+= Number(d.facilities);
            }
        });
        
        var dat = (data.filter((v) => (v.date === n.date)).length)*3
        
        var avgForDayIs = (sum /  dat).toFixed(1);
        
          Response.push({date:n.date,avg:avgForDayIs})
    })

        res.status(200).json({Response, msg: `message`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};
const AirportThreeMonthData = async (req, res, next) => {
    
    var {first,second,third,code,year} = req.query;

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
            var startDate = year+"-"+ThreeMonthAvg[i].month+"-01T00:00:00.000Z";
            var endDate = year+"-"+ThreeMonthAvg[i].month+"-31T23:59:59.999Z"
            data = await reviewCrud.findAirportsServiceReview(selector.byIataAndDateForAvg(code,new Date(startDate),new Date(endDate) ))
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
                    sum+= Number(d.staff);
                    sum+= Number(d.quality);
                    sum+= Number(d.facilities);
                }
            });
            
            var dat =(data.filter((v) => (v.date === n.date)).length) * 3; 
            
            var avgForDayIs = (sum /  dat).toFixed(1);
            
              Response.push({date:n.date,avg:avgForDayIs})
        })

        ThreeMonthAvg[i].Data = Response;

        }
            
    
            res.status(200).json({ThreeMonthAvg, msg: `message`});
        } 
        
     catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};

const GetMostRecentWords = async(req,res,next) => {
    try {
        var airportCode = req.query.code
        var response =await utils.GetMostRecentWords(airportCode)
        res.status(201).json({response, msg: `List of Most Recent Word Used for ${airportCode}`});
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
    
}

const GetTotalAverageOfMonthByIata = async(req,res,next) => {
    try {
        var {code,month,year} = req.query
        var Response  = [];
        month = Number(month);
        var flag = false;
        if(month >= 1 && month<=12)
        {
            if(month === 1)
            {
                //subtract from year 
                flag = true;
            }
            month = month < 10?'0'+(month):(month);
            year = Number(year);
            var currentMonth = await utils.GetAverageBytheMonth(month,code,year)
            var pMonth = month-1 < 10?'0'+(month -1):(month-1);
            
            if(flag)
            {
                var prevMonth = await utils.GetAverageBytheMonth(12,code,year-1)
            }
            else
            {
                var prevMonth = await utils.GetAverageBytheMonth(pMonth,code,year)
            }
            
           
            var NewNumber = currentMonth;
            var OriginalNumber = prevMonth;
            if(OriginalNumber === NewNumber)
            {
                //equal
                Response.push({CurrentMonthAvg:currentMonth,prevMonth:prevMonth,"Decrease/Increase":0,"PerIncrease/Decrease":"0 %"})
            }
            else if(OriginalNumber >  NewNumber)
            {
                //decrease 
                var Decrease = (OriginalNumber - NewNumber).toFixed(2)
                var PerDecrease = (Decrease / OriginalNumber * 100 ).toFixed(2) + " %"
                Response.push({CurrentMonthAvg:currentMonth,prevMonth:prevMonth,PerDecrease:PerDecrease,Decrease:Decrease})
            }
            else
            {
                //increse
                var Increase = (NewNumber - OriginalNumber).toFixed(2)
                var Perincrease = (Increase / OriginalNumber * 100).toFixed(2) ;
                //check infinity
                if(Perincrease == "Infinity")
                {
                    Perincrease = "Previous Month Avg is 0";
                }
                else
                {
                    Perincrease += " %";
                }
                Response.push({CurrentMonthAvg:currentMonth,prevMonth:prevMonth,PerIncrease:Perincrease,Increase:Increase})
            }
            
            res.status(200).json({Response, msg: `message`});
        }
       else
       {
        res.status(400).json({Response, msg: `It is a Invalid Month`});
       }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
}

module.exports = { GetTotalAverageOfMonthByIata,GetMostRecentWords,addReviewAssistance,AirportAverageDailyAssistance,AirportAverageDailyQuality,AirportAverageDailyRating,AirportThreeMonthData };