const reviewCrud = require('../crud/crud-review');
const log = require('debug')(process.env.DEBUG);


const addReviewAssistance = async (req, res, next) => {
    try {
        const response = await reviewCrud.create(req.body);
        // var DepartureAirportsServiceReview = (
        //     {...review.departure,
        //         airport:review.departureAirport,
        //         date:new Date(),
        //         airportCode:airportCode
        //     });
        // var ArrivalAirportsServiceReview =  await addAirportsServiceReviewA(
        //     {...review.arrival,
        //         airport:review.arrivalAirport,
        //         date:new Date(),
        //         airportCode:airportCode
        //     });
        // var AirlineServiceReview =          await addAirlineServiceReview(
        //     {...review.flight,
        //         airline:review.airline,
        //         date:new Date(),
        //         airportCode:airportCode
        //     });
        // var PrmassistReview=                await addPrmassistReview(
        //     {...review.prmassist,
        //         bookingId:review.bookingId,
        //         date:new Date(),
        //         airportCode:airportCode
        //     });
        // if(ArrivalAirportsServiceReview.ok && DepartureAirportsServiceReview.ok && AirlineServiceReview.ok && PrmassistReview.ok)
        // {
        //     var reviewData = {...review};
        //     delete reviewData['departure'];
        //     delete reviewData['arrival'];
        //     delete reviewData['flight'];
        //     delete reviewData['prmassist'];
        //     reviewData = {...reviewData,
        //         departureReviewID:DepartureAirportsServiceReview.id,
        //         arrivalReviewID:ArrivalAirportsServiceReview.id,
        //         flightReviewID:AirlineServiceReview.id,
        //         prmassistReviewID:PrmassistReview.id,
        //         date:new Date(),
        //         airportCode:airportCode
        //     }
            
        //     var resp = await reviewCrud.insert(reviewData, review.bookingId);
        //     if(resp.ok)
        //     {
        //         return "Review Added";
        //     }
            
        // }
        console.log(response);
        // se
        res.status(201).json({response, msg: `Saved successfully`});
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: [{ msg: e.message}]});
    }
};

module.exports = { addReviewAssistance };