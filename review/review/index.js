const crud = require('../crud/crud-review');
const selector = require('../selectors/review');
const reviewCrud = require('../crud/crud-review');
const getDate = (date) =>{

    var x = date.split('T')[0];
    var y = date.split('T')[0];
    var month = y.split('-')[1]  > 9 ? y.split('-')[1] : '0'+y.split('-')[1];
    var day = x.split('-')[0]
    var year = x.split('-')[2]
    return day+'-'+month+'-'+year
}

const countOccurrences=(str,word) =>
    {
        // split the string by spaces in a
    let a = str.split(" ");
  
    // search for pattern in a
    let count = 0;
    for (let i = 0; i < a.length; i++)
    {
    // if match found increase count
    if (word==(a[i]))
        count++;
    }
  
    return count;
    }

const addMostRecentWords=async (string,airportCode)=>{

    var obj =[]
    var  SplittedStringArrayWithoutExluded= string.split(' ');

    
    var exludedKeywords = []

    
    // var ExcludedWordsListObject =  await ExcludedWords.find({
    //     selector:{
    //         airportCode:airportCode
    //     },
    //     fields:['word']
    // });
    var ExcludedWordsListObject =  await crud.excluded_words_find(selector.byIataforExcludeWorda(airportCode)) ;

    ExcludedWordsListObject.forEach(function(obj){
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
    var d = { key:el,count:countOccurrences(string,el)};
        obj.push(d);
        return d;
    });

    
    // filter excudeed words
    // add word initially
    //if word exist then update the accourance
    //else add accourcance with respective userid
    obj.forEach(async ob => {
        var data = await crud.most_recent_words_find(selector.byIataforWordsbyKey(airportCode,ob.key));
        console.log(data)
        if(data.length >0)
        {
            var rev = data[0]._rev;
            var id= data[0]._id;
            let UpdatedCount = data[0].count + ob.count
            let obj = {...ob,_rev:rev,_id: id,count:UpdatedCount}
            
            await crud.most_recent_words_create({...obj,airportCode:airportCode})
        }
        else
        {
            await crud.most_recent_words_create({...ob,airportCode:airportCode})
        }
        
    })

    console.log(obj)
    return [];
}

const GetMostRecentWords =async (airportCode)=>{

    var files =await crud.most_recent_words_find(selector.byIataforExcludeWordsAndCount(airportCode))

    var exludedKeywords = []

    var ExcludedWordsListObject =  await crud.excluded_words_find(selector.byIataforExcludeWorda(airportCode)) ;

    ExcludedWordsListObject.forEach(function(obj){
        exludedKeywords.push(obj.word);
    })

    var SplittedStringArray = files.filter(item => 
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


const GetAverageBytheMonth = async(month,code,year) =>{
    var sum = 0; 
    var dateStart = year+'-'+month+'-01'+'T00:00:00.000Z';
    var dateEnd = year+'-'+month+'-31'+'T23:59:59.999Z';
    var data = await reviewCrud.findAirportsServiceReview(selector.byIataAndDateForFacilities(code,new Date(dateStart).toISOString(),new Date(dateEnd).toISOString()))
   
    if(data.length > 0)
    {
        data.filter(d => sum+= Number(d.staff) +Number(d.quality)+Number(d.facilities));
    
    var dat = (data.length)*3        
    var avgForMonth = (sum /  dat).toFixed(2);
    return avgForMonth ;
    }
    else
    {
        return 0;
    }
    
}
module.exports = {
    getDate,
    addMostRecentWords,
    GetMostRecentWords,
    GetAverageBytheMonth
}