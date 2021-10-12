
import  express from 'express';
import userController  from '../controllers/UserController.js';
import AuthService from '../services/AuthService.js';


const UserRoute = express.Router()

UserRoute.post('/GetUserById',AuthService.authenticateTokenMiddleWare, userController.postGetUserById)
UserRoute.get('/GetAllUser',AuthService.authenticateTokenMiddleWare, userController.getAllUser)
UserRoute.post('/ReportBug',AuthService.authenticateTokenMiddleWare,userController.postReportBug)
UserRoute.post('/FileUpload',[AuthService.authenticateTokenMiddleWare,userController.FileUpload],userController.postFileUpload)

UserRoute.post('/RegisterUser', userController.postRegisterUser)
UserRoute.post('/VerifyRegisterUser',userController.postVerifyRegisterUser)
UserRoute.post('/DenyRegisterUser',userController.postDenyRegisterUser)

export default UserRoute;