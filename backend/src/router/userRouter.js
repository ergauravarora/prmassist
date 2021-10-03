
import  express from 'express';
import userController  from '../controllers/UserController.js';
import AuthController from '../controllers/AuthController.js';
import AuthService from '../services/AuthService.js';


const Route = express.Router()

Route.post('/GetUserById',AuthService.authenticateTokenMiddleWare, userController.postGetUserById)
Route.get('/GetAllUser',AuthService.authenticateTokenMiddleWare, userController.getAllUser)
Route.post('/ReportBug',AuthService.authenticateTokenMiddleWare,userController.postReportBug)
Route.post('/FileUpload',[AuthService.authenticateTokenMiddleWare,userController.FileUpload],userController.postFileUpload)

Route.post('/RegisterUser', userController.postRegisterUser)
Route.post('/VerifyRegisterUser',userController.postVerifyRegisterUser)
Route.post('/DenyRegisterUser',userController.postDenyRegisterUser)


Route.post('/GetTokenAgainstUid',AuthController.GetTokenAgainstUid)
Route.post('/RefreshToken',AuthController.RefreshToken)
Route.post('/logoutAndRemoveTokenForRemoveAccess',AuthController.logoutAndRemoveTokenForRemoveAccess)


export default Route;