import Joi from "joi";
import globalResponse from '../helper/response.js'
import ReviewService from "../services/ReviewService.js";

const {handleError,handleSuccess} = globalResponse

const ReviewAssistance =async (req,res,next) =>{
    const {body,params} = req;
    
  
    const schemaForAirportCode = Joi.object().options({ abortEarly: false }).keys({
        code: Joi.string().optional(),
    });
  
    

    const schema = Joi.object().options({ abortEarly: false }).keys({
        bookingId: Joi.string().required(),
        age: Joi.string().required(),
        departureAirport: Joi.string().required(),
        arrivalAirport: Joi.string().required(),
        airline: Joi.string().required(),
        departure: Joi.object().keys({ 
            quality: Joi.number().integer().min(1).max(5).required(),
            staff: Joi.number().integer().min(1).max(5).required(),
            facilities: Joi.number().integer().min(1).max(5).required(),
            comments: Joi.string().optional()
        }).required(),
        arrival: Joi.object().keys({ 
            quality: Joi.number().integer().min(1).max(5).required(),
            staff: Joi.number().integer().min(1).max(5).required(),
            facilities: Joi.number().integer().min(1).max(5).required(),
            comments: Joi.string().optional()
        }).required(),
        flight: Joi.object().keys({ 
            boarding: Joi.number().integer().min(1).max(5).required(),
            onboard: Joi.number().integer().min(1).max(5).required(),
            disembark: Joi.number().integer().min(1).max(5).required(),
            comments: Joi.string().optional()
        }).required(),
        prmassist: Joi.object().keys({ 
            heard: Joi.string().required(),
            improvement: Joi.boolean().required(),
            comments: Joi.string().optional()
        }).required()
    });
   
    let {error, value} = schema.validate(body)
    
    if(error)
    {
        
        return handleError(res,next,error.details)
    }

    let {AirportCodeError, AirportCodevalue} = schemaForAirportCode.validate(params)
    
    if(AirportCodeError)
    {
        return handleError(res,next,error.details)
    }
  
    try {
        var data =await ReviewService.SetReviewAssistance(value,AirportCodevalue);
        handleSuccess(res,data,next);
      } catch(e) {
        console.log(e.message)
        handleError(res,next,e.message)
      }

}

const AirportRatings = async (req,res,next) =>{
    const {params} = req;
  
    const schema = Joi.object().options({ abortEarly: false }).keys({
        code: Joi.string().required(),
    });
  
    let {error, value} = schema.validate(params)
    
    if(error)
    {
        return handleError(res,next,error.details)
    }

    try {
        var {code} = value;
        var data = await ReviewService.GetAirportRating(code);
        handleSuccess(res,data,next);
      } catch(e) {
        console.log(e.message)
        handleError(res,next,e.message)
      }

}

const AirlineRatings =async (req,res,next) =>{
    const {params} = req;
  
    const schema = Joi.object().options({ abortEarly: false }).keys({
        code: Joi.string().required(),
    });
  
    let {error, value} = schema.validate(params)
    
    if(error)
    {
        return handleError(res,next,error.details)
    }

    try {
        var {code} = value;
        var data = await ReviewService.GetAirlineRating(code);
        handleSuccess(res,data,next);
      } catch(e) {
        console.log(e.message)
        handleError(res,next,e.message)
      }

}

const GetMostRecentWords =async (req,res,next) =>{
    const {params} = req;
  
    const schema = Joi.object().options({ abortEarly: false }).keys({
        code: Joi.string().optional(),
    });
  
    let {error, value} = schema.validate(params)
    
    if(error)
    {
        return handleError(res,next,error.details)
    }

    try {
        var {code} = value;
        var data = await ReviewService.GetMostRecentWordsAsync(code);
        handleSuccess(res,data,next);
      } catch(e) {
        console.log(e.message)
        handleError(res,next,e.message)
      }

}

const UserQuality  =async (req,res,next) =>{
    const {params} = req;
  
    const schema = Joi.object().options({ abortEarly: false }).keys({
        code: Joi.string().required(),
    });
  
    let {error, value} = schema.validate(params)
    
    if(error)
    {
        return handleError(res,next,error.details)
    }

    try {
        var data =await ReviewService.UserQualityAsync(value);
        handleSuccess(res,data,next);
      } catch(e) {
        console.log(e.message)
        handleError(res,next,e.message)
      }

}
const UserAssistanceAverage  =async (req,res,next) =>{
    const {params} = req;
  
    const schema = Joi.object().options({ abortEarly: false }).keys({
        code: Joi.string().required(),
    });
  
    let {error, value} = schema.validate(params)
    
    if(error)
    {
        return handleError(res,next,error.details)
    }

    try {
        var data =await ReviewService.UserAssistanceAverageAsync(value);
        handleSuccess(res,data,next);
      } catch(e) {
        console.log(e.message)
        handleError(res,next,e.message)
      }

}


export default {
ReviewAssistance,
AirportRatings,
AirlineRatings,
UserQuality,
GetMostRecentWords,
UserAssistanceAverage
}