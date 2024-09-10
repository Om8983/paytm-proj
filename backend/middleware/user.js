const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config');
const {User } = require('../db')

async function userSignupMiddleware(req, res, next) {
    console.log(req.body);
    
    const {email} = req.body;

    const userEmail = await User.findOne({
        email
    })
    if(userEmail){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    next();
}

async function userSigninMiddleware(req, res, next) {
    const { email } = req.body;
    const userExist = await User.findOne({
        email
    })
    if(!userExist){
        return res.status(404).json({error : "User Not Found "})
    }
    next();
}


async function authMiddleware(req, res, next) {
    
    try{
        const authHeader = req.headers.authorization

    if(!authHeader  || !authHeader.startsWith("Bearer")){
        return res.status(403).json({error : "invalid bearer token"})
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    const {userId } = decoded;
    if(!userId){
        return res.status(403).json({err: "user id not found "})
    }
    req.userId = userId
    next();
    }catch(e){
        console.log("error occured auth");
        
    }
}
module.exports = {userSignupMiddleware, userSigninMiddleware, authMiddleware}