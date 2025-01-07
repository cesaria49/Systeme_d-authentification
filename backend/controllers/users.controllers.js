const UserModel = require ("../models/users")
const bcrypt = require ("bcrypt")
const TOKEN_KEY = require ('dotenv').config
let jwt = require("jsonwebtoken")


const getUsers = async (req,res)=>{
    const getData = await UserModel.find({})
    res.status(200).json(getData)
}

const addUsers = async (req,res)=>{
    if (!req.body){
        res.json({text : "Merci d'ajouter les informations"})
    }

    const password = req.body.password
    const saltRounds =10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password,salt)
  
    const sendData = await UserModel.create({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email:req.body.email,
        password:hashedPassword
    })
    res.status(201).json(sendData)
}

const login = async(req,res)=>{
    const {email,password} = req.body
    const result = await UserModel.findOne({email})
    const verifyPassword = await bcrypt.compare(password, result.password)
    //console.log(verifyPassword)
    if (result && verifyPassword){
        //return res.json({message:'Access authorized'})
        let token = await jwt.sign({userid :UserModel._id},process.env.TOKEN_KEY)
        return res.status(200).json({token})
    }
    //return res.json({message:'Access Denied'})
    return res.status(401).json({text: 'Login ou mot de passe incorrect'})
}


module.exports = {addUsers,
                  getUsers,
                  login,
                 }