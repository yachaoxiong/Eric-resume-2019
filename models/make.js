//reference mongoose
const mongoose =require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//create the car schema
const  makeSchema =new mongoose.Schema({
    name:{
        type:String,
        required:'Make is requried',
        unique:true
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
makeSchema.plugin(uniqueValidator,{massage:'Name has to be unique!!'});
//make it public
module.exports=mongoose.model('Make',makeSchema);