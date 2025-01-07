let jwt = require ("jsonwebtoken")
const TOKEN_KEY = require ("dotenv").config
const UserModel = require("../models/users")

const test = async (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        req.token =  jwt.verify(token,process.env.TOKEN_KEY)
        console.log(req.token)
        await res.status(200).json({text :"Vous êtes bien authentifiés avec l'id : " })
        next()
    }
    catch{
        await res.status(401).json({message : "Token d'authentification invalide "})
    }
}

module.exports = test