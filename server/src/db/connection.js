const mongoose = require('mongoose');
 
const connection = async()=> {
    try{
        const isConnected = await mongoose.connect('mongodb://127.0.0.1:27017/parcelDb');
        if(isConnected){
            console.log("Connected to mongodb")
        } 
    }catch(err){
        console.log(err)
    }
 
}
module.exports = connection
