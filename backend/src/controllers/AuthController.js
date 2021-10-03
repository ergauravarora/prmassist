import AuthService from '../services/AuthService.js';
import jwt from 'jsonwebtoken';
let refreshTokenStack  = [];

const GetTokenAgainstUid = (req,res)=>{

    const uid =  req.body.uid;

    const  user = {uid:uid};


    const accesstoke =  AuthService.generateAccessToken(user)

    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)

    refreshTokenStack.push(refreshToken)
    res.json({accessToken:accesstoke,refreshToken:refreshToken});
};
 
const RefreshToken = (req,res)=>{
    const refreshToken = req.body.refreshToken;
    if(!refreshToken)
    {
        return res.sendStatus(401);
    }

    if(!refreshTokenStack.includes(refreshToken))
    {
        return res.sendStatus(401);
    }

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(error,user)=>{
        if(error)
        {
            console.log(error)
            return res.send(401);
        } 

        const accesstoke = AuthService.generateAccessToken({uid:user.uid});

        res.json({accessToken:accesstoke});
      
    })
}

const logoutAndRemoveTokenForRemoveAccess =(req,res)=>{
    refreshToken = refreshTokenStack.filter(token => token !== req.body.refreshToken)
    res.sendStatus(204);
}
export default {GetTokenAgainstUid,RefreshToken,logoutAndRemoveTokenForRemoveAccess}