import  express from 'express';
import AuthController from '../controllers/AuthController.js';

const AuthRoute = express.Router();

AuthRoute.post('/GetTokenAgainstUid',AuthController.GetTokenAgainstUid)
AuthRoute.post('/RefreshToken',AuthController.RefreshToken)
AuthRoute.post('/logoutAndRemoveTokenForRemoveAccess',AuthController.logoutAndRemoveTokenForRemoveAccess)


export default AuthRoute