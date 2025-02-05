const UserModel = require ("../models/users")
const bcrypt = require ("bcrypt")
const TOKEN_KEY = require ('dotenv').config
let jwt = require("jsonwebtoken")

const home = async (req,res)=>{
    res.status(200).json({text : "Welcome to the Page"})
}
const getUsers = async (req,res)=>{
    const getData = await UserModel.find({})
    res.status(200).json(getData)
}

const addUsers = async (req,res)=>{
    if (!req.body){
        return res.status(401).json({text : "Merci d'ajouter les informations"})
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
    return res.status(201).json(sendData)
}

const login = async(req,res)=>{
    const {email,password} = req.body
    const result = await UserModel.findOne({email})
    const verifyPassword = await bcrypt.compare(password, result.password)
    //console.log(verifyPassword)
    if (result && verifyPassword){
        //return res.json({message:'Access authorized'})
        let accessToken = await jwt.sign({userid :UserModel._id},process.env.TOKEN_KEY,{expiresIn : "1800s"})
        
        //Stokage du jwt dans un cookie HttpOnly
        res.cookie("token",accessToken,{httpOnly : true, secure: true})
        return res.status(200).json({token})
    }

    //return res.json({message:'Access Denied'})
    return res.status(401).json({text: 'Login ou mot de passe incorrect'})
}

/*const refreshToken = async (req, res) => {
    if (req.cookies?.jwt) {

        // Destructuring refreshToken from cookie
        const refreshToken = req.cookies.jwt;

        // Verifying refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {

                    // Wrong Refesh Token
                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    // Correct token we send a new access token
                    const accessToken = jwt.sign({
                        username: userCredentials.username,
                        email: userCredentials.email
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '10m'
                    });
                    return res.json({ accessToken });zzzzzzzzzzzzzzzz 
                }
            })
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
}*/ 


const logout = async(req,res)=>{
    res.clearCookie('accessToken')
    res.end()
    res.redirect("/home")
}



module.exports = {addUsers,
                  getUsers,
                  login,
                  logout,
                  home
                 }