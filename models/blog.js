//reference mongoose
const mongoose =require('mongoose');

//create the car schema
const  blogSchema = new mongoose.Schema({
    blogtitle: {
        type: String,
        required: 'Make is requried'
    },
    subtitle: {
        type: String,
        required: 'Model is requried'

    },
    blogcontent: {
        type: String,
        required: 'Model is requried'
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    pic:{
      type:String
    }

});



//make it public
module.exports=mongoose.model('Blog',blogSchema);