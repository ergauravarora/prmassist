
import  express from 'express';
import userController  from '../controllers/UserController.js';

const Route = express.Router()
Route.post('/GetUserById', userController.postGetUserById)
Route.get('/GetAllUser', userController.getAllUser)
Route.post('/RegisterUser', userController.postRegisterUser)
Route.post('/VerifyRegisterUser',userController.postVerifyRegisterUser)
Route.post('/DenyRegisterUser',userController.postDenyRegisterUser)
Route.post('/ChangePassword',userController.postChangePassword)
Route.post('/ChangeEmail',userController.postChangeEmail)
Route.post('/ReportBug',userController.postReportBug)
Route.post('/FileUpload',userController.FileUpload,userController.postFileUpload)
Route.post('/Login',userController.postUserLogin)

export default Route;