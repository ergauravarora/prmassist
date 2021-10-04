import fa from './FirebaseAccess.js'
import helper from '../helper/response.js'
import multer from 'multer'
import fs from 'fs';
import path from "path";
import { fromEmail } from '../config/config.js';
  
const GetUserByIdAsync =async (body) =>{ 
  return fa.GetUserById(body).then((snapshot) => {
    if (snapshot.exists()) {
        return snapshot.val();
    } else { 
        return  "No Data Available"
    }
  })      
}   
const RegisterUserAsync =async (body) =>{ 
  return fa.RegisterUser(body).then(resp=>{
    if (resp) {
      // The write failed...
      return "User Added Failed"
    } else {
      // The write was successful..
      return "User Added Successfull"
    }
    })
        
}  

const VerifyRegisterUserAsync =async (body) =>{ 
  return fa.VerifyRegisterUser(body).then(resp=>{
    if (resp) {
      // The write failed...
      return "Something Went Wrong with Airport Authority"
    } else {
      // The write was successful..
      return "User is Verifed by Airport Authority"
    }
    })
        
}  
const DenyRegisterUserAsync =async (body) =>{ 
  return fa.DenyRegisterUser(body).then(resp=>{
    if (resp) {
      // The write failed...
      return "Something Went Wrong with Airport Authority"
    } else {
      // The write was successful..
      return "User is Denyed by Airport Authority"
    }
    })
        
}  
const GetAllUserAsync =async (body) =>{ 
  return fa.GetAllUser().then((snapshot) => {
    if (snapshot.exists()) {
        return snapshot.val();
    } else { 
        return  "No Data Available"
    }
  })      
} 

const ChangePasswordAsync =async (body) =>{ 
  return fa.GetUserById(body).then((snapshot) => {
    if (snapshot.exists()) {

      let data = snapshot.val();
      if(body.oldPassword !== data.password)
      {
        return  "Old Password is Incorrect"
      }
      else
      {
       return fa.ChangePassword(body).then(resp=>{
          if (resp) {
            // The write failed...
            return "Something Went Wrong Please Contact Admin"
          } else {
            // The write was successful..
            return "Password Changed Successfully"
          }
      })
    }
        
    } else { 
      return  "No Data Available"
    }
  })
        
} 
const ChangeEmailAsync =async (body) =>{ 
  return fa.GetUserById(body).then((snapshot) => {
    if (snapshot.exists()) {

      let data = snapshot.val();
      if(body.oldEmail !== data.email)
      {
        return  "Old Email is Incorrect"
      }
      else
      {
       return fa.ChangeEmail(body).then(resp=>{
          if (resp) {
            // The write failed...
            return "Something Went Wrong Please Contact Admin"
          } else {
            // The write was successful..
            return "Email Changed Successfully"
          }
      })
    }
        
    } else { 
      return  "No Data Available"
    }
  })
        
}  

const ReportBugAsync =async (body) =>{ 
  return fa.GetUserById(body).then((snapshot) => {
    if (snapshot.exists()) {
        var user =  snapshot.val();
       return fa.ReportBug(body).then(async resp=>{
          if (resp) {
            // The write failed...
            return "Report Bug Failed"
          } else {
            // The write was successful..
            var Emailbody = `
            This email is a Bug Reported which is been reported on  <b>${body.DOB}</b> for category <b>${body.Category}</b> .<br/>Find Below the desciption <br/>
            Title :- ${body.Title} <br/>
            Desciption :- ${body.Description}
                        `
            var res =await helper.sendEmail(user.firstName,user.email,Emailbody,body.ScreenShot);
            return res;
          }
          })
    } else { 
        return  "No Data Available"
    }
  })  
  
        
} 

var fileName = "false"
const maxSize = 1 * 1000 * 1000;

const upload = multer({ 
  storage:  multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "Upload")
    },
    filename: function (req, file, cb) {
      fileName =file.originalname + "-" + Date.now()+".jpg" 
      cb(null, fileName)
    }
  }),
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb){
  
      // Set the filetypes, it is optional
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(path.extname(
                  file.originalname).toLowerCase());
      
      if (mimetype && extname) {
          return cb(null, true);
      }
    
      cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes);

    } 
    
// mypic is the name of file attribute
}).single("image"); 

const FileUploadAync = async(req,res)=>{
await upload(req,res,function(err) {
        if(err) {
           return err;
        }
        else {
          return "success";
        }
    })
    return fileName;
   
}

const LoginAsync =async (body) =>{ 
  return fa.Login(body);        
}  
export default {LoginAsync,FileUploadAync,ReportBugAsync,ChangeEmailAsync,ChangePasswordAsync,DenyRegisterUserAsync,GetUserByIdAsync,RegisterUserAsync,VerifyRegisterUserAsync,GetAllUserAsync};