let jwt = require ("jsonwebtoken")
const TOKEN_KEY = require ("dotenv").config
const UserModel = require("../models/users")

const test = async (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        req.token =  jwt.verify(token,process.env.TOKEN_KEY)
        await res.status(200).json({text :"Vous êtes bien authentifiés avec l'id : " })
        next()
    }
    catch{
        await res.status(401).json({message : "Token d'authentification invalide "})
    }
}

const protect = async(req,res,next)=>{
    if(req.headers.authorizqtion && 
        req.headers.authorization.startWith('Bearer')   
    ){
        token = req.headers.authorization.split(' ')[1]
    }
    else if (req.cookies.token){
        token = req.cookies.token
    }

    //Etre sur que le token existe
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route'))
    }
    try {
        //Verification du token
        const decoded = jwt.verify(token,process.env.TOKEN_KEY)

        next()
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route'))
    }
}

module.exports = test
                