const mongoose = require ("mongoose")

const connectDB = async () =>{
    try{
        mongoose.set('strictQuery',false);
        mongoose.connect(process.env.dbURI)
        .then(()=> 
            console.log("MongoDB est connecté")) 
    }catch(err){
        console.log(err);
        process.exit();
    }
}

module.exports = connectDB