const mongoose = require('mongoose')
require('dotenv').config()

const {MONGO_URI} = process.env

module.exports.getDbconnection = function(req,res){

    mongoose.connect(MONGO_URI).then(()=>console.log("DB Connected")).catch((err)=>{
        console.log(err);
    })
}