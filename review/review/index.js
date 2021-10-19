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