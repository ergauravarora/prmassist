import  express from 'express';
import ReviewController from '../controllers/ReviewController.js';
import AuthService from '../services/AuthService.js';

const ReviewRoute = express.Router();

ReviewRoute.post('/ReviewAssistance/:code',ReviewController.ReviewAssistance)//for airport
ReviewRoute.get('/AirportRatings/:code',AuthService.authenticateTokenMiddleWare,ReviewController.AirportRatings)
ReviewRoute.get('/AirlineRatings/:code',AuthService.authenticateTokenMiddleWare,ReviewController.AirlineRatings)


//this is for dashboard admin

//api for most  popular keyword 
ReviewRoute.get('/GetMostRecentWords/:code',ReviewController.GetMostRecentWords)

//api for User Quality Report with time duration average rating 
//Daily average rating will be stored in DB 
ReviewRoute.get('/UserQuality/:code',ReviewController.UserQuality)//for airport

ReviewRoute.get('/UserAssistance/:code',ReviewController.UserAssistanceAverage)//for airport


export default ReviewRoute