
const  chais = require('chai')
const assert = chais.assert
const expects = chais.expect
const chaiHttp =  require("chai-http")
const app = require('../app.js');

chais.use(chaiHttp)

var review = {
    "bookingId":"BOOKING00"+Math.floor(Math.random() * 100),
    "age":"56",
    "departureAirport":"DUB",
    "arrivalAirport":"WST",
    "airline":"WX",
    "departure":{
        "quality":5,
        "staff":4,
        "facilities":2,
        "comments":"test dub abcd"
    },
    "arrival":{
        "quality":4,
        "staff":2,
        "facilities":5,
        "comments":"test wst efgh"
    },
    "flight":{
        "boarding":4,
        "onboard":5,
        "disembark":4,
        "comments":"this is flight rating overall good"
    },
    "prmassist":{
        "heard":"heard data",
        "improvement":true,
        "comments":"this is prm assist rating"
    }
}
describe("#review/ReviewAssistance",() =>{
    it("should return status 500 with Update Conflict", (done)=>{
        chais.request(app)
        .post('/review/ReviewAssistance?code=DUB')
        .send({...review,bookingId:"BOOKING001"})//pass object here
        .end((err,res)=>{
            expects(res.status).to.equal(500)
            done()
        })
        
    })
})
describe("#review/ReviewAssistance",() =>{
    it("should return status 201 with success data save", (done)=>{
        chais.request(app)
        .post('/review/ReviewAssistance?code=DUB')
        .send(review)//pass object here
        .end((err,res)=>{
            expects(res.status).to.equal(201)
            done()
        })
        
    })
})
describe("#review/AirportAverageDailyAssistance",() =>{
    it("should return status 200 with success data save", (done)=>{
        chais.request(app)
        .get('/review/AirportAverageDailyAssistance?code=DUB&endDate=2021-10-31&startDate=2021-10-01')
        .end((err,res)=>{
            expects(res.status).to.equal(200)
            expects(res.body.Response.length).to.greaterThan(0)
            //expects(res.Response.lenght).to.equal(200)
            done()
        })
        
    })
})
describe("#review/AirportAverageDailyQuality",() =>{
    it("should return status 200 with success data save", (done)=>{
        chais.request(app)
        .get('/review/AirportAverageDailyQuality?code=WST&endDate=2021-10-31&startDate=2021-10-01')
        .end((err,res)=>{
            expects(res.status).to.equal(200)
            done()
        })
        
    })
})
describe("#review/AirportAverageDailyRating",() =>{
    it("should return status 200 with success data save", (done)=>{
        chais.request(app)
        .get('/review/AirportAverageDailyRating?code=WST&endDate=2021-10-31&startDate=2021-10-01')
        .end((err,res)=>{
            expects(res.status).to.equal(200)
            done()
        })
        
    })
})
describe("#review/AirportThreeMonthData",() =>{
    it("should return status 200 with success data save", (done)=>{
        chais.request(app)
        .get('/review/AirportThreeMonthData?code=WST&first=09&second=11&third=10')
        .end((err,res)=>{
            expects(res.status).to.equal(200)
            done()
        })
        
    })
})