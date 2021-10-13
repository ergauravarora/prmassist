const chais = require('chai')
const assert = chais.assert
const expects = chais.expect

const chaiHttp = require("chai-http")
chais.use(chaiHttp)
// const sinon = require("sinon")
const should = chais.should()

// const auth = require('../src/services/AuthService')
const app = require('../index')
// const getUser = require('../src/controllers/UserController')

const addReview = require('../src/controllers/ReviewController')

// this is demo test case of index.js
describe('getting demo value from index.js', ()=>{
    it('It should get value from index.js', (done) =>{
        chais.request(app)
        .get('/home')
        .end((err,res)=>{
            expects(res.status).to.be.equal(200)
            expects(res.body).to.have.all.keys('data')
        done();
        })
    })
})

//it will get all users from user controller
describe('getting api/user/GetAllUser', ()=>{
    it('It should get all the users', (done) =>{
        chais.request(app)
        .get('/api/user/GetAllUser')
        .end((err,res)=>{
            expects(res.status).to.be.equal(200)
            expects(res.body).to.have.all.keys('data')
        done();
        })
    })
})


//it will check the ReviewAssistance
describe("post /ReviewAssistance",() =>{

    // beforeEach(()=>{
    //     authInSub = sinon.stub(auth, 'authenticateTokenMiddleWare').callsFake((req, res, next) => {next()})
    //     app = require('../i')
    // })

    it("should return status 200", async (done)=>{
        chais.request(app)
        .post('api/review/ReviewAssistance')
        .send({age:"23"})//pass object here
        .end((err,res)=>{
            expect(res.status).to.equal(200)
            expect(res.data).to.have.all.keys('data')
            done()
        })
    })

    //delete tested object after test is done
    afterEach(async () =>{
        await addReview.deleteOne({age:"23"})
    })
})