import fa from './FirebaseAccess.js'
import helper from '../helper/response.js'
import multer from 'multer'
import fs from 'fs';
import path from "path";
  
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
      helper.throwError("User Added Failed")
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
      helper.throwError("Something Went Wrong with Airport Authority")
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
      helper.throwError( "Something Went Wrong with Airport Authority")
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
const ReportBugAsync =async (body) =>{ 
  
  return fa.GetUserById(body).then((snapshot) => {
    if (snapshot.exists()) {
        var user =  snapshot.val();
       return fa.ReportBug(body).then(async resp=>{
          if (resp) {
            // The write failed...
            helper.throwError("Report Bug Failed")
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
      helper.throwError("No Data Available")
    }
  })  
  
        
} 
const upload = multer({ 
  storage:  multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "Upload")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + "-" + Date.now()+".jpg")
    }
  }),
  limits: { fileSize: 20 * 1000 * 1000 },
  fileFilter: function (req, file, cb){
  
      // Set the filetypes, it is optional
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(path.extname(
                  file.originalname).toLowerCase());
      
      if (mimetype && extname) {
          return cb(null, true);
      }
    
      helper.throwError("Error: File upload only supports the "
      + "following filetypes - " + filetypes)
      cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes);

    } 
    
// mypic is the name of file attribute
}).single("image"); 


const FileUploadAync = async(req,res)=>{
  if(!req.file.filename)
  {
    helper.throwError("File Upload Failed");
  }
  return req.file.filename 
}

export default {upload,FileUploadAync,ReportBugAsync,DenyRegisterUserAsync,GetUserByIdAsync,RegisterUserAsync,VerifyRegisterUserAsync,GetAllUserAsync};