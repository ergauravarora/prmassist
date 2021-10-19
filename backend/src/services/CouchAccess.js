import couch  from "../config/couchdb.js";
import utils from "../helper/utils.js";
var ReviewForAssistance = couch.use('review_for_assistance');
var AirportsServiceReview = couch.use('airports_service_review');
var AirlineServiceReview = couch.use('airline_service_review');
var PrmassistReview = couch.use('prmassist_review');
var MostRecentWords = couch.use('most_recent_words');
var ExcludedWords = couch.use('excluded_words');
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

const createReview =async (review,airportCode) =>
{
    var DepartureAirportsServiceReview =    await addAirportsServiceReview({...review.departure,airport:review.departureAirport,date:new Date(),airportCode:airportCode});
        var ArrivalAirportsServiceReview =  await addAirportsServiceReview({...review.arrival,airport:review.arrivalAirport,date:new Date(),airportCode:airportCode});
        var AirlineServiceReview =          await addAirlineServiceReview({...review.flight,airline:review.airline,date:new Date(),airportCode:airportCode});
        var PrmassistReview=                await addPrmassistReview({...review.prmassist,bookingId:review.bookingId,date:new Date(),airportCode:airportCode});
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
            
            var resp = await ReviewForAssistance.insert(reviewData, review.bookingId);
            if(resp.ok)
            {
                return "Review Added";
            }
            
        }
};

const addAirportsServiceReview=async (data)=>{
            if(data.comments)
            {
               await addMostRecentWords(data.comments,data.airport)
            }
    var files =await AirportsServiceReview.insert(data);
    return files;
}
const addAirlineServiceReview=async (data)=>{
    if(data.comments)
            {
               await addMostRecentWords(data.comments,data.airport)
            }
    var files =await AirlineServiceReview.insert(data);
    return files;
}

const addPrmassistReview=async (data)=>{
    if(data.comments)
            {
               await addMostRecentWords(data.comments,data.airport)
            }
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




const addMostRecentWords=async (string,airportCode)=>{

    var obj =[]
    var  SplittedStringArrayWithoutExluded= string.split(' ');

    
    var exludedKeywords = []

    var ExcludedWordsListObject = await ExcludedWords.find({
        selector:{
            airportCode:airportCode
        },
        fields:['word']
    });

    ExcludedWordsListObject.docs.forEach(function(obj){
        exludedKeywords.push(obj.word);
    })
    
    var SplittedStringArray = SplittedStringArrayWithoutExluded.filter(item => 
        {
            var flag = 0;
    exludedKeywords.forEach(word => {
        if(item.toLowerCase() === word.toLowerCase())
        {
            flag ++;
        }
            })
           
            return flag === 0
        })
    var UniqueCharArray =SplittedStringArray.filter((v,i) => SplittedStringArray.indexOf(v) == i);
   
    UniqueCharArray.map(el=>{
    var d = { key:el,count:utils.countOccurrences(string,el)};
        obj.push(d);
        return d;
    });

    
    // filter excudeed words
    // add word initially
    //if word exist then update the accourance
    //else add accourcance with respective userid
    obj.forEach(async ob => {
        var data = await MostRecentWords.find({
            selector: {
                key:ob.key,
                airportCode:airportCode
            }, 
            fields: ['key', 'count','_rev','_id'],
        })
        console.log(data.docs)
        if(data.docs.length >0)
        {
            var rev = data.docs[0]._rev;
            var id= data.docs[0]._id;
            let UpdatedCount = data.docs[0].count + ob.count
            let obj = {...ob,_rev:rev,_id: id,count:UpdatedCount}
            
            await MostRecentWords.insert({...obj,airportCode:airportCode})
        }
        else
        {
            await MostRecentWords.insert({...ob,airportCode:airportCode})
        }
        
    })

    console.log(obj)
    return [];
}

const GetMostRecentWords =async (airportCode)=>{

    var files =await MostRecentWords.find({
        selector: {
            airportCode:airportCode
        }, 
        fields: ['key', 'count'],
    })

    var exludedKeywords = []

    var ExcludedWordsListObject = await ExcludedWords.find({
        selector:{
            airportCode:airportCode
        },
        fields:['word']
    });

    ExcludedWordsListObject.docs.forEach(function(obj){
        exludedKeywords.push(obj.word);
    })

    var SplittedStringArray = files.docs.filter(item => 
        {
            var flag = 0;
    exludedKeywords.forEach(word => {
        if(item.key.toLowerCase() === word.toLowerCase())
        {
            flag ++;
        }
            })
           
            return flag === 0
        })

    // here we need to filter words 
    return SplittedStringArray
}



const GetUserQualityRatings = async (code)=>{

    var files =await AirportsServiceReview.find({
        selector: {
            airport:code
        }, 
        fields: ['quality','date'],
        limit:100
    })

    // here we need to filter words 
    var data = files.docs.map(d => { d.date = utils.getDate(d.date);
        return d
     })
    return data
}

const GetUserAssistanceAverage = async (code)=>{

    var files =await AirportsServiceReview.find({
        selector: {
            airport:code
        },  
        fields: ['staff','date'],
        limit:100
    })

    // here we need to filter words 
    var data = files.docs.map(d => { d.date = utils.getDate(d.date);
        return d
     })
    return data
}
      
export default {createReview,GetAirportsServiceReview,GetAirlineServiceReview,GetMostRecentWords,GetUserQualityRatings,GetUserAssistanceAverage}
