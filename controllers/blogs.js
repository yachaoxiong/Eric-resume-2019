const express=require('express');
const router=express.Router();
const Blog= require('../models/blog');
let date = require('date-and-time');

var multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function(req, file, cb) {
        cb(null,  file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
//access auth check method in our global functions file
const functions=require('../config/functions');
//get:/blog
router.get('/',(req,res,next)=>{

    //get blog documents form db
    Blog.find((err,blogs)=> {
        //creat a variable and empty array
        let months = new Date();
        let uptime= new Date();
        let cds=[];
        let uds=[];

       //get the date format
      for(let i=0; i< blogs.length;i++){
          //date == create time
          months= blogs[i].createAt;
          uptime=blogs[i].updateAt;

          cds[i]=date.format(months,'YYYY/MM/DD HH:mm:ss');
          cds.push(cds[i]);
          uds[i]=date.format(uptime,'YYYY/MM/DD HH:mm:ss');
          uds.push(uds[i]);

        }
        if(err){

            console.log(err);
        }
        else{
            res.render('blogs/index',{
                title:'Blog List',

                blogs: blogs,

                user:req.user,

                cds,
                uds
            })
        }

    });

});
//get:/blog/test
router.get('/test',(req,res,next)=>{

    //get blog documents form db
    Blog.find((err,blogs)=> {
        //creat a variable and empty array
        let months = new Date();
        let uptime= new Date();
        let cds=[];
        let uds=[];

        //get the date format
        for(let i=0; i< blogs.length;i++){
            //date == create time
            months= blogs[i].createAt;
            uptime=blogs[i].updateAt;

            cds[i]=date.format(months,'YYYY/MM/DD HH:mm:ss');
            cds.push(cds[i]);
            uds[i]=date.format(uptime,'YYYY/MM/DD HH:mm:ss');
            uds.push(uds[i]);

        }
        if(err){

            console.log(err);
        }
        else{
            res.render('blogs/test',{
                title:'Blog List',

                blogs: blogs,

                user:req.user,

                cds,
                uds
            })
        }

    });

});
//get:/ blogs/add
router.get('/add',(req,res,next)=>{
    res.render('blogs/add',{
        title:'Add a New blogs',
        user:req.user

    });

});

//post: /blogs/add
router.post('/add',upload.single('pic'),(req,res) =>{
    //use the blog model to save the new blogs
    Blog.create({
        blogtitle:req.body.blogtitle,
        subtitle:req.body.subtitle,
        blogcontent:req.body.blogcontent,
        createAt:req.body.createAt,
        updateAt:req.body.updateAt,
        pic:req.file.originalname
    },(err,blog)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/blogs');
        }

    }) ;
});
//GET: /blogs/DELETE/ABC123
router.get('/delete/:_id',functions.isLoggedIn,(req,res,next)=>{
    //get the _id parameter from the url and store in a local variable
    let _id=req.params._id;

    //use the blog model to delete the document with this id
    Blog.remove({_id:_id},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/blogs/test');
        }
    });
});
//GET:/blogs/EDIT/ABC123
router.get('/edit/:_id',(req,res,next)=>{
    //get _id param from url
    let _id=req.params._id;

    //use the blog model to find the selected document
    Blog.findById(_id,(err,blog)=>{

        if(err){
            console.log(err);

        }
        else{
            res.render('blogs/edit',{
                title:'Blog Details',

                blog:blog,
                user:req.user

            });
        }
    });
});
//post: blogs/edit/abc123
router.post('/edit/:_id',functions.isLoggedIn,(req,res,next)=>{
    //get the _id from the url
    let _id=req.params._id;
    let newUpdate=new Date();


    //use the Mongoose update method to set al  the new value
    Blog.update({_id:_id},
        {$set:{
                blogtitle:req.body.blogtitle,
                subtitle:req.body.subtitle,
                blogcontent:req.body.blogcontent,

                createAt:req.body.createAt,
                updateAt:newUpdate,
                pic:req.body.pic
            }},null,(err)=> {
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/blogs');
            }


        });
});
//get:// blogdetails
router.get('/blogdetails/:_id',(req,res,next)=>{
    //get _id param from url
    let _id=req.params._id;
    //convert the date format
    let month1 = new Date();
    let month2=new Date();

    //use the car model to find the selected document
    Blog.findById(_id,(err,blog)=>{
        //convert the date format
        month1= blog.createAt;
        month2= blog.updateAt;
        cds=date.format(month1,'YYYY/MM/DD HH:mm:ss');
        uds=date.format(month2,'YYYY/MM/DD HH:mm:ss');
        if(err){
            console.log(err);

        }
        else{
            res.render('blogs/blogdetails',{
                title:'Blog Details',
                blog:blog,
                cds,
                uds,
                user:req.user

            });
        }
    });
});

module.exports=router;