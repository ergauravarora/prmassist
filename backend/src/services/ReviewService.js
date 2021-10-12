import CouchAccess from "./CouchAccess.js"
import helper from '../helper/response.js'

const SetReviewAssistance =async  (value) =>{
    var response = await CouchAccess.createReview(value);
    return response;
}
const GetAirportRating=async (code) =>{
    var allMatchedData =await CouchAccess.GetAirportsServiceReview(code);
    var response = {...allMatchedData[0]}
    response.quality = (allMatchedData.reduce((total, next) => total + next.quality, 0)/allMatchedData.length).toFixed(1);
    response.facilities = (allMatchedData.reduce((total, next) => total + next.facilities, 0)/allMatchedData.length).toFixed(1);
    response.staff = (allMatchedData.reduce((total, next) => total + next.staff, 0)/allMatchedData.length).toFixed(1);
    return response
}

const GetAirlineRating=async (code)=>{
    var allMatchedData =await CouchAccess.GetAirlineServiceReview(code);
    var response = {...allMatchedData[0]}
    response.boarding = (allMatchedData.reduce((total, next) => total + next.boarding, 0)/allMatchedData.length).toFixed(1);
    response.onboard = (allMatchedData.reduce((total, next) => total + next.onboard, 0)/allMatchedData.length).toFixed(1);
    response.disembark = (allMatchedData.reduce((total, next) => total + next.disembark, 0)/allMatchedData.length).toFixed(1);
    return response
}

const GetMostRecentWordsAsync=async (code)=>{
    
    var MostRecentWordsArray =await CouchAccess.GetMostRecentWords();
    return MostRecentWordsArray;
}

export default {
    SetReviewAssistance,
    GetAirportRating,
    GetAirlineRating,
    GetMostRecentWordsAsync
}