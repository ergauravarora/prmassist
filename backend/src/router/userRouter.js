
import  express from 'express';
import userController  from '../controllers/UserController.js';

const Route = express.Router()
Route.post('/GetUserById', userController.postGetUserById)
Route.get('/GetAllUser', userController.getAllUser)
Route.post('/RegisterUser', userController.postRegisterUser)
Route.post('/VerifyRegisterUser',userController.postVerifyRegisterUser)
Route.post('/DenyRegisterUser',userController.postDenyRegisterUser)
Route.post('/ReportBug',userController.postReportBug)
Route.post('/FileUpload',userController.FileUpload,userController.postFileUpload)

export default Route;