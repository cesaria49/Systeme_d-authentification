const express = require("express")
const port = 5000
const connectDB = require ("./config/db")
const dotenv = require ("dotenv").config()

//connexion à la DB
connectDB()

const app = express()

//Middleware qui permet de traiter les données de la Request
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/users",require("./routers/users"))

app.listen(port,()=>console.log(`Le serveur a démarré au 
port`,port))