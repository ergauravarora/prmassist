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

var data =await CouchAccess.GetUserQualityRatings();
var newarray = [];
data.map(d => 
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

var finalResponse  = [];
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
    
      finalResponse.push({date:n.date,avg:avgForDayIs})
})


var months = [];
var array = data;

array.map(d => 
    {
        var alreadyHave = false;
        if(months.length > 0)
        {
            months.map(e => {
                if(e.month === new Date(d.date +"T00:00:00.000Z").getMonth() +1)
                {
                    alreadyHave = true
                }
        })
        if(!alreadyHave)
        {
            months.push({month: new Date(d.date +"T00:00:00.000Z").getMonth() +1}) 
        }
        }
        else
        {
						months.push({month: new Date(d.date +"T00:00:00.000Z").getMonth() +1})
        }
         
     }
)

var MonthSepratedRating = []


months.forEach(selected => {

MonthSepratedRating.push({month:selected.month,data:array.filter(d => new Date(d.date +"T00:00:00.000Z").getMonth() +1 === selected.month)})
})


console.log(MonthSepratedRating)

    var resp = {
        timeRatings: MonthSepratedRating,
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
    
    return MonthSepratedRating;
}
export default {
    UserQualityAsync,
    SetReviewAssistance,
    GetAirportRating,
    GetAirlineRating,
    GetMostRecentWordsAsync
}