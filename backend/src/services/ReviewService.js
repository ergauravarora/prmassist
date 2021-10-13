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

const UserQualityAsync =async ({StartDate,EndDate,Duration})=>{
   
    
    var Difference_In_Time = EndDate.getTime() - StartDate.getTime();
  
// To calculate the no. of days between two dates
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
var slots = Difference_In_Days / (Duration || 7)

var re =await CouchAccess.GetUserQualityRatings();

    var resp = {
        timeRatings: [
            {
                Month:"Aug 21",
                Rating:[
                    {
                    day:"Aug 1",
                    rating:1
                },
                {
                    day:"Aug 2",
                    rating:5
                },
                {
                    day:"Aug 3",
                    rating:4.2
                },
                {
                    day:"Aug 4",
                    rating:1.6
                },
                {
                    day:"Aug 5",
                    rating:3.8
                }]
            },
            {
                Month:"sept 21",
                Rating:[
                    {
                    day:"sept 1",
                    rating:1
                },
                {
                    day:"sept 2",
                    rating:5
                },
                {
                    day:"sept 3",
                    rating:4.2
                },
                {
                    day:"sept 4",
                    rating:1.6
                },
                {
                    day:"sept 5",
                    rating:3.8
                }]
            },
            {
                Month:"Oct 21",
                Rating:[
                    {
                    day:"Oct 1",
                    rating:1
                },
                {
                    day:"Oct 2",
                    rating:5
                },
                {
                    day:"Oct 3",
                    rating:4.2
                },
                {
                    day:"Oct 4",
                    rating:1.6
                },
                {
                    day:"Oct 5",
                    rating:3.8
                }]
            }
            ],
        sevenDaysAvg:{
            color:'blue',
            rating:3.8
        },
        fourteenDaysAvg:{
            color:'purple',
            rating:4.3
        },
        twentyeightDaysAvg:{
            color:'green',
            rating:3.8
        }    
    }
    
    return resp;
}
export default {
    UserQualityAsync,
    SetReviewAssistance,
    GetAirportRating,
    GetAirlineRating,
    GetMostRecentWordsAsync
}