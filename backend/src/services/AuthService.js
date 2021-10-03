import jwt from "jsonwebtoken";

function generateAccessToken(user)
{
    console.log(process.env.ACCESS_TOKEN_EXPIRE_TIME)
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME});
}

function authenticateTokenMiddleWare(req,res,next)
{
    const authHeader =  req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token)
    {
        return res.sendStatus(401);
    }
     

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,user)=>{
        if(error)
        {
            res.sendStatus(401);
        } 
        else
        {
            req.user = user;
            next();
        }
    })
}

export default {generateAccessToken,authenticateTokenMiddleWare}