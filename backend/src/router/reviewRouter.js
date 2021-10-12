import  express from 'express';
import ReviewController from '../controllers/ReviewController.js';
import AuthService from '../services/AuthService.js';

const ReviewRoute = express.Router();

ReviewRoute.post('/ReviewAssistance',AuthService.authenticateTokenMiddleWare,ReviewController.ReviewAssistance)
ReviewRoute.get('/AirportRatings/:code',AuthService.authenticateTokenMiddleWare,ReviewController.AirportRatings)
ReviewRoute.get('/AirlineRatings/:code',AuthService.authenticateTokenMiddleWare,ReviewController.AirlineRatings)
ReviewRoute.get('/GetMostRecentWords/:code',ReviewController.GetMostRecentWords)

export default ReviewRoute