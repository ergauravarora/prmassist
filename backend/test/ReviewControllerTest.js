import chais from 'chai'
const assert = chais.assert
const expects = chais.expect

import chaiHttp from "chai-http";
chais.use(chaiHttp)
// const sinon = require("sinon")
const should = chais.should()

// const auth = require('../src/services/AuthService')
import app from  '../index.js';
// const getUser = require('../src/controllers/UserController')

import  addReview from '../src/controllers/ReviewController.js'


const RefreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzQyNDEzNTEsImV4cCI6MTYzNDI1MzM1MX0.5iEM6w0yCNRpKauwhkJJfKUq_TyVDM_hKiGdlDjy_b8';
const invalidToken = 'abcd'
const ReviewAssistance = {
    "bookingId":"BOOKING00179",
    "age":"24",
    "departureAirport":"DUB",
    "arrivalAirport":"WST",
    "airline":"WX",
    "departure":{
        "quality":1,
        "staff":1,
        "facilities":1
    },
    "arrival":{
        "quality":1, 
        "staff":1, 
        "facilities":1 
    },
    "flight":{
        "boarding":1,
        "onboard":1,
        "disembark":1
    },
    "prmassist":{
        "heard":"heard data",
        "improvement":true,
        "comments":"this is comment"
    }
}
// this is demo test case of index.js
describe('#check if api is working', ()=>{
    it('It should get value from index.js', (done) =>{
        chais.request(app)
        .get('/home')
        .end((err,res)=>{
            expects(res.status).to.be.equal(200)
        done();
        })
    })
})
//it will get all users from user controller
// describe('#api/user/GetAllUser', ()=>{
//     it('It should return 401 without token', (done) =>{
//         chais.request(app)
//         .get('/api/user/GetAllUser')
//         .end((err,res)=>{
//             expects(res.status).to.be.equal(401)
//            // expects(res.body).to.have.all.keys('data')
//         done();
//         })
//     })
//     it('It should return 401 with invalid token', (done) =>{
//         chais.request(app)
//         .get('/api/user/GetAllUser')
//         .set('Authorization', `bearer ${invalidToken}`)
//         .end((err,res)=>{
//             expects(res.status).to.be.equal(401)
//         done();
//         })
//     })
//     it('It should return user List with valid token', (done) =>{
//         chais.request(app)
//         .get('/api/user/GetAllUser')
//         .set('Authorization', `bearer ${RefreshToken}`)
//         .end((err,res)=>{
//             expects(res.status).to.be.equal(200)
//            // expects(res.body).to.have.all.keys('data')
//         done();
//         })
//     })
// })
//it will check the ReviewAssistance
describe("#api/review/ReviewAssistance",() =>{
    it("should return status 401 without token", (done)=>{
        chais.request(app)
        .post('/api/review/ReviewAssistance')
        .send({age:"23"})//pass object here
        .end((err,res)=>{
            expects(res.status).to.equal(401)
            done()
        })
        
    })
    it("should return status 401 with invalid token", (done)=>{
        chais.request(app)
        .post('/api/review/ReviewAssistance')
        .set('Authorization', `bearer ${invalidToken}`)
        .send({"age":"23"})//pass object here
        .end((err,res)=>{
            expects(res.status).to.equal(401)
            done()
        })
        
    })
    it('It should return status 0 if any error is there and data will be 0 error message will be there when having valid token but incomplete data', (done) =>{
        chais.request(app)
        .post('/api/review/ReviewAssistance')
        .send({"age":"23"})//pass object here
        .set('Authorization', `bearer ${RefreshToken}`)
        .end((err,res)=>{
            expects(res.status).to.be.equal(200)
            expects(res.body.status).to.be.equal(0)
            expects(res.body.data.length).to.be.equal(0)
            expects(res.body.msg.length).to.be.greaterThanOrEqual(1)
        done();
        })
    })
    it('valid data and valid token result success', (done) =>{
        chais.request(app)
        .post('/api/review/ReviewAssistance')
        .send(ReviewAssistance)//pass object here
        .set('Authorization', `bearer ${RefreshToken}`)
        .end((err,res)=>{
            expects(res.status).to.be.equal(200)
            expects(res.body.status).to.be.equal(1)
            expects(res.body.msg).to.be.equal("Success")
        done();
        })
    })
})

describe("#api/review/AirportRatings",() =>{
    it("should return status 401 without token", (done)=>{
        chais.request(app)
        .get('/api/review/AirportRatings/as')
        .end((err,res)=>{
            expects(res.status).to.equal(401)
            done()
        })
        
    })
    it("should return status 401 with invalid token", (done)=>{
        chais.request(app)
        .get('/api/review/AirportRatings/as')
        .set('Authorization', `bearer ${invalidToken}`)
        .end((err,res)=>{
            expects(res.status).to.equal(401)
            done()
        })
        
    })
    it('It should return status 1 and data will be null if no matching record is there ', (done) =>{
        chais.request(app)
        .get('/api/review/AirportRatings/abc')
        .set('Authorization', `bearer ${RefreshToken}`)
        .end((err,res)=>{
            expects(res.status).to.be.equal(200)
            expects(res.body.status).to.be.equal(1)
           expects(res.body.data.quality).to.be.equal(0)
            // expects(res.body.msg.length).to.be.greaterThanOrEqual(1)
        done();
        })
    })
    it('valid data and valid token result success', (done) =>{
        chais.request(app)
        .get('/api/review/AirportRatings/DUB')
        .set('Authorization', `bearer ${RefreshToken}`)
        .end((err,res)=>{
            expects(res.status).to.be.equal(200)
            expects(res.body.status).to.be.equal(1)
            expects(res.body.msg).to.be.equal("Success")
        done();
        })
    })
})
describe("#api/review/AirlineRatings",() =>{
    it("should return status 401 without token", (done)=>{
        chais.request(app)
        .get('/api/review/AirlineRatings/WX')
        .end((err,res)=>{
            expects(res.status).to.equal(401)
            done()
        })
        
    })
    it("should return status 401 with invalid token", (done)=>{
        chais.request(app)
        .get('/api/review/AirlineRatings/WX')
        .set('Authorization', `bearer ${invalidToken}`)
        .end((err,res)=>{
            expects(res.status).to.equal(401)
            done()
        })
        
    })
    it('It should return status 1 and data will be null if no matching record is there ', (done) =>{
        chais.request(app)
        .get('/api/review/AirlineRatings/WXD')
        .set('Authorization', `bearer ${RefreshToken}`)
        .end((err,res)=>{
            expects(res.status).to.be.equal(200)
              expects(res.body.status).to.be.equal(1)
             expects(res.body.data.boarding).to.be.equal(0)
            // expects(res.body.msg.length).to.be.greaterThanOrEqual(1)
        done();
        })
    })
    it('valid data and valid token result success', (done) =>{
        chais.request(app)
        .get('/api/review/AirlineRatings/WX')
        .set('Authorization', `bearer ${RefreshToken}`)
        .end((err,res)=>{
            expects(res.status).to.be.equal(200)
            expects(res.body.status).to.be.equal(1)
            expects(res.body.msg).to.be.equal("Success")
        done();
        })
    })
})
