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
        res.status(401).json({text : "Merci d'ajouter les informations"})
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
        let token = await jwt.sign({userid :UserModel._id},process.env.TOKEN_KEY,{expiresIn : "900s"})
      
        let refreshToken = jwt.sign({userid : UserModel._id,}, process.env.REFRESH_TOKEN_KEYa , { expiresIn: '900s' });

        // Assigning refresh token in http-only cookie 
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).json({token})
    }

    //return res.json({message:'Access Denied'})
    return res.status(401).json({text: 'Login ou mot de passe incorrect'})
}

const refreshToken = async (req, res) => {
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
                    return res.json({ accessToken });
                }
            })
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
}


const logout = async(req,res)=>{
    try{
        req.user.token

        await req.user.save()
    }catch (e){

    }
}



module.exports = {addUsers,
                  getUsers,
                  login,
                  logout
                 }