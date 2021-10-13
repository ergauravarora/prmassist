import couch  from "../config/couchdb.js";

var ReviewForAssistance = couch.use('review_for_assistance');
var AirportsServiceReview = couch.use('airports_service_review');
var AirlineServiceReview = couch.use('airline_service_review');
var PrmassistReview = couch.use('prmassist_review');
var MostRecentWords = couch.use('most_recent_words');
const createDB =(dbname)=>
{
    couch.db.create(dbname, function(err) {  
        if (err && err.statusCode != 412) {
            console.error(err);
          }
          else {
            console.log(`database ${dbname} exists`);
          }
      });
}

const createReview =async (review) =>
{
    var DepartureAirportsServiceReview =    await addAirportsServiceReview({...review.departure,airport:review.departureAirport,date:new Date()});
        var ArrivalAirportsServiceReview =  await addAirportsServiceReview({...review.arrival,airport:review.arrivalAirport,date:new Date()});
        var AirlineServiceReview =          await addAirlineServiceReview({...review.flight,airline:review.airline,date:new Date()});
        var PrmassistReview=                await addPrmassistReview({...review.prmassist,bookingId:review.bookingId,date:new Date()});
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
                date:new Date()
            }
            var resp = await ReviewForAssistance.insert(reviewData, review.bookingId);
            if(resp.ok)
            {
                return "Review Added";
            }
            
        }
};

const addAirportsServiceReview=async (data)=>{
    var files =await AirportsServiceReview.insert(data);
    return files;
}
const addAirlineServiceReview=async (data)=>{
    var files =await AirlineServiceReview.insert(data);
    return files;
}

const addPrmassistReview=async (data)=>{
    var files =await PrmassistReview.insert(data);
    return files;
}
const GetAirportsServiceReview =async (code)=>{

    var files =await AirportsServiceReview.find({
        selector: {
            airport:code
        }, // parameters can be added to query specific documents.
        fields: ['airport', 'quality','facilities','staff'],
    })
    return files.docs
}
const GetAirlineServiceReview =async (code)=>{

    var files =await AirlineServiceReview.find({
        selector: {
            airline:code
        }, // parameters can be added to query specific documents.
        fields: ['airline', 'boarding','onboard','disembark'],
    })
    return files.docs
}


const addMostRecentWords=async (data)=>{

    // filter excudeed words
    // add word initially
    //if word exist then update the accourance
    //else add accourcance with respective userid
    var files =await MostRecentWords.insert(data);
    return files;
}

const GetMostRecentWords =async ()=>{

    var files =await MostRecentWords.find({
        selector: {
            
        }, 
        fields: ['word', 'count'],
    })

    // here we need to filter words 
    return files.docs
}

const GetUserQualityRatings = async ()=>{

    var files =await AirportsServiceReview.find({
        selector: {
            
        }, 
        fields: ['quality','date'],
    })

    // here we need to filter words 
    return files.docs
}
      
export default {createReview,GetAirportsServiceReview,GetAirlineServiceReview,GetMostRecentWords,GetUserQualityRatings}
