//reference mongoose
const mongoose =require('mongoose');

//create the car schema
const  carSchema =new mongoose.Schema({
   make:{
       type:String,
       required:'Make is requried'
   },
    makeId:{
        type:String,
    },
   model:{
       type:String,
       required:'Model is requried'

   },
    year:{
       type:Number,
        required:'Year is requried'
    },
    color:{
       type:String
    }
});
//make it public
module.exports=mongoose.model('Car',carSchema);