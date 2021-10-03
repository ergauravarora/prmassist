import UserService from "../services/userService.js";
import globalResponse from '../helper/response.js';
import  Joi from 'joi';

const {handleError,handleSuccess} = globalResponse



const postGetUserById = async (req, res, next) => {
  const {body} = req;
  
  const schema = Joi.object().keys({
    uid: Joi.string().required()
  });

  let {error, value} = schema.validate(body)
  
  if(error)
  {
   return handleError(res,next,error.details[0].message)
  }
    try {
      var data = await UserService.GetUserByIdAsync(value);
      handleSuccess(res,data,next);
    } catch(e) {
      console.log(e.message)
      handleError(res,next,e.message)
    }
  }
  const getAllUser = async (req, res, next) => {
  
      try {
        var data = await UserService.GetAllUserAsync();
        handleSuccess(res,data,next);
      } catch(e) {
        console.log(e.message)
        handleError(res,next,e.message)
      }
    }
  const postRegisterUser = async (req, res, next) => {
    const {body} = req;
    
    const schema = Joi.object().keys({
      uid: Joi.string().required(),
      firstName:Joi.string().required(),
      lastName:Joi.string().required()
    });
  
    let {error, value} = schema.validate(body)
    
    if(error)
    {
     return handleError(res,next,error.details[0].message)
    }
      try {
        var data = await UserService.RegisterUserAsync(value);
        handleSuccess(res,data,next);
      } catch(e) {
        console.log(e.message)
        handleError(res,next,e.message)
      }
    }
    const postVerifyRegisterUser = async (req, res, next) => {
      const {body} = req;
      
      const schema = Joi.object().keys({
        uid: Joi.string().required()
      });
    
      let {error, value} = schema.validate(body)
      
      if(error)
      {
       return handleError(res,next,error.details[0].message)
      }
        try {
          var data = await UserService.VerifyRegisterUserAsync(value);
          handleSuccess(res,data,next);
        } catch(e) {
          console.log(e.message)
          handleError(res,next,e.message)
        }
      }
      const postDenyRegisterUser = async (req, res, next) => {
        const {body} = req;
        
        const schema = Joi.object().keys({
          uid: Joi.string().required()
        });
      
        let {error, value} = schema.validate(body)
        
        if(error)
        {
         return handleError(res,next,error.details[0].message)
        }
          try {
            var data = await UserService.DenyRegisterUserAsync(value);
            handleSuccess(res,data,next);
          } catch(e) {
            console.log(e.message)
            handleError(res,next,e.message)
          }
        }
            const postReportBug= async (req, res, next) => {
              const {body} = req;
              
              const schema = Joi.object().keys({
                uid: Joi.string().required(),
                Title: Joi.string().required(),
                DOB: Joi.string().required(),
                Category: Joi.string().required(),
                Description: Joi.string().required(),
                ScreenShot: Joi.string().optional(),
                Email: Joi.string().required()
              });
            
              let {error, value} = schema.validate(body)
              
              if(error)
              {
               return handleError(res,next,error.details[0].message)
              }
                try {
                  var data = await UserService.ReportBugAsync(value);
                  handleSuccess(res,data,next);
                } catch(e) {
                  console.log(e.message)
                  handleError(res,next,e.message)
                }
              }
         const postFileUpload   = async (req, res, next) => {
          const {body} = req;
                   
            try {
              var data = await UserService.FileUploadAync(req);
              handleSuccess(res,data,next);
            } catch(e) {
              console.log(e.message)
              handleError(res,next,e.message)
            }
          } 
          const FileUpload =  UserService.upload

export default {FileUpload,postFileUpload,postReportBug,postGetUserById,postRegisterUser,postVerifyRegisterUser,getAllUser,postDenyRegisterUser}