const getDate = (date) =>{

    var x = date.split('T')[0];
    var y = date.split('T')[0];
    var month = y.split('-')[1]  > 9 ? y.split('-')[1] : '0'+y.split('-')[1];
    var day = x.split('-')[0]
    var year = x.split('-')[2]
    return day+'-'+month+'-'+year
}

function countOccurrences(str,word)
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

    export default {
        countOccurrences,
        getDate
    }