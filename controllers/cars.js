//references
const express=require('express');
const router=express.Router();
const Car= require('../models/car');
const Make= require('../models/make');



//access auth check method in our global functions file
const functions=require('../config/functions');

//get:/cars
router.get('/',(req,res,next)=>{
    //get car documents form db
    Car.find((err,cars)=> {
     if(err){

         console.log(err);

     }
     else{
         res.render('cars/index',{
             title:'Car List',
             cars: cars,
             user:req.user
         })
     }

    });

});
//get:/ cars/add
router.get('/add',functions.isLoggedIn,(req,res,next)=>{
    Make.find((err, makes) => {
        if (err) {

            res.render('cars/add',{
                err:err})
        }
        else {
            res.render('cars/add', {
                title: 'Manufacturer List',
                makes: makes,
                user: req.user
            });
        }
    });

  /*  res.render('cars/add',{
        title:'Add a New Car',
        user:req.user

    });*/

});

//post: /cars/add
router.post('/add',functions.isLoggedIn,(req,res,next)=>{
   //use the car model to save the new cart
   Car.create({
       make:req.body.make,
       makeId:req.body.makeId,
       model:req.body.model,
       year:req.body.year,
       color:req.body.color
   },(err,car)=>{
       if(err){
           console.log(err);
       }
       else{
           res.redirect('/cars');
       }

   }) ;
});
//GET: /CARS/DELETE/ABC123
router.get('/delete/:_id',functions.isLoggedIn,(req,res,next)=>{
    //get the _id parameter from the url and store in a local variable
    let _id=req.params._id;

    //use the car model to delete the document with this id
    Car.remove({_id:_id},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/cars');
        }
    });
});
//GET:/CARS/EDIT/ABC123
router.get('/edit/:_id',functions.isLoggedIn,(req,res,next)=>{
   //get _id param from url
   let _id=req.params._id;

   //use the car model to find the selected document
    Car.findById(_id,(err,car)=>{
       if(err){
           console.log(err);

       }
       else{
           res.render('cars/edit',{
               title:'Car Details',
               car:car,
               user:req.user

           });
       }
    });
});
//post: cars/edit/abc123
router.post('/edit/:_id',functions.isLoggedIn,(req,res,next)=>{
   //get the _id from the url
   let _id=req.params._id;
  //use the Mongoose update method to set al  the new value
   Car.update({_id:_id},
       {$set:{
           make:req.body.make,
           model:req.body.model,
           year:req.body.year,
           color:req.body.color
       }},null,(err)=> {
       if(err){
           console.log(err);
       }
       else{
           res.redirect('/cars');
       }


       });
});
module.exports=router;