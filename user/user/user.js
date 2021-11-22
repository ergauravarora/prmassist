var  multer = require('multer')
var path  = require("path");

const upload = multer({ 
    storage:  multer.diskStorage({
      destination: function (req, file, cb) {
    
          // Uploads is the Upload_folder_name
          cb(null, "Upload")
      },
      filename: function (req, file, cb) {
        var name = file.originalname.split(".")[0]
        var ext ;
          if(file.mimetype === "image/png")
          {
            ext = ".png"
          }
        cb(null, name + "-" + Date.now()+ext)
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
      
        //  throw "Error: File upload only supports the "
        // + "following filetypes - " + filetypes
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
  
      } 
      
  
  }).single("qrImage"); 

const FileUpload =  upload;
module.exports = { FileUpload } 