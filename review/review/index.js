const getDate = (date) =>{

    var x = date.split('T')[0];
    var y = date.split('T')[0];
    var month = y.split('-')[1]  > 9 ? y.split('-')[1] : '0'+y.split('-')[1];
    var day = x.split('-')[0]
    var year = x.split('-')[2]
    return day+'-'+month+'-'+year
}

module.exports = {
    getDate
}