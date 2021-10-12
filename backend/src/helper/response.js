import nodemailer from 'nodemailer'
import { password, username } from '../config/config.js';


const sendEmail =async (name,to,body,ScreenShot)=>{
    var smtpTransport = nodemailer.createTransport({
      secure: false, // use SSL
      port: 25, // port for secure SMTP
        service: "Gmail",
        auth: {
            user: username,
            pass: password
        },
        tls: {
          rejectUnauthorized: false
      }
    });
    var mailOptions;
    if(ScreenShot)
    {
      mailOptions = {
        to: to, 
        subject: name+' | new Bug Report !',
        text: "Hello" + name,
        html: body, // html body
        attachments:[
          {
          path:ScreenShot
          }
        ]
      }
    }
    else
    {
      mailOptions = {
        to: to, 
        subject: name+' | new Bug Report !',
        text: "Hello" + name,
        html: body, // html body
      }
    }
    
    var a =await smtpTransport.sendMail(mailOptions);
    return a
}
const handleError = (res,next,msg) => {
  console.log("error handler")
  
  if(typeof(msg) === "object")
  {
    
    var message = [];
    msg.forEach(m => {
      message.push(m.message);
    });
    return res.status(200).json({
      status: 0,
      msg : message || "Failed",
      data : []
    })
    &&
    next();
  }
  else
  {
    return res.status(200).json({
      status: 0,
      msg : msg || "Failed",
      data : []
    })
    &&
    next();
  }
    
  };

  const handleSuccess = (res,data,next,msg) => {
   return res.status(200).json({
      status: 1,
      msg : msg || "Success",
      data : data
    }) &&
    next();
  };
 
    
  const throwError =(msg)=>{
   throw {message:msg}
  }
      

  export default { throwError,handleError,handleSuccess,sendEmail}