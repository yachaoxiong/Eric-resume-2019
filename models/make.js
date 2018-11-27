//reference mongoose
const mongoose =require('mongoose');

//create the car schema
const  makeSchema =new mongoose.Schema({
    name:{
        type:String,
        required:'Make is requried'
    },
    country:{
        type:String,
        required:'Model is requried'

    },
    year:{
        type:Number,
        required:'Year is req uried'
    }
});
//make it public
module.exports=mongoose.model('Make',makeSchema);