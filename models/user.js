//reference
const mongoose= require('mongoose');
const passport= require('passport');
const  plm =require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const  userSchema=new mongoose.Schema({
    phone:String
});

//use plm to automatically define username and password fiels for this model
userSchema.plugin(plm);
userSchema.plugin(findOrCreate);

//make public
module.exports=mongoose.model('User',userSchema);