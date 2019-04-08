const express = require('express');
const router = express.Router();
//auth references
const passport=require('passport');
const User=require('../models/user');
const nodemailer=require('nodemailer');


/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', {
    title: 'Car tracker',
    message:'Eric xiong Node.js Mvc app',
      user:req.user
  });
});
/*get: about*/
router.get('/service',(req,res,next)=>{
  res.render('service',{
   title:'About Car Tracker',
   message: 'This app is built with the MEAN Stack.',
      user:req.user
  });

});
router.get('/404', (req, res,next)=> {
    res.send('what???', 404);
});
/*get:contact*/
router.get('/contact',(req,res,next)=>{
  res.render('contact',{
      title:'Contact us',
      message:'',
      user:req.user
  });
});
/***************************/
router.post('/contact',(req,res,next)=> {
    const output = `
    <p style="color:#d1ecf1;">You have a new contact request</p>
    <h3 >Contact Details</h3>
    <ul style="text-decoration: none; list-style: none;"> 
    
      <li>Name:    ${req.body.name}</li>
      <li>Company:   ${req.body.company}</li>
      <li>Email:    ${req.body.email}</li>
      <li>Phone:    ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
    var mailTransport= nodemailer.createTransport({
        service:'gmail',

        host:'smtp.gmail.com',
        auth:{
            type: "OAuth2",
            user:'ericxiongyachao@gmail.com',
            clientId:'188051741598-7lfo42fio89cvcvdvkmh8k46f8ged1c7.apps.googleusercontent.com',
            clientSecret:'ZolN8v3Vqiwn9HySjjvI7Wr4',
            refreshToken:'1/PBMwuSrGxlwrbrw4kKwg8L503G4P18eBV52aA_5Y-B0'

        }
    });

    let mailOptions = {
        from: '"Eric Personal Web" <ericxiongyachao@gmail.com>', // sender address
        to: '200337417@student.georgianc.on.ca', // list of receivers
        subject: 'Contact Info', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
    mailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);

        }
        else {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.render('contact',{
                title:'Contact Me',
                user:req.user,
                message:'Your Message has been sent!'});

        }




    });
});



/*************************/




/*get:register*/
router.get('/register',(req,res,next)=>{
    res.render('register',{
        title:'Register',
       user:req.user
    });
});
router.get('/users',(req,res,next)=>{
    User.find((err,users)=>{
        if(err){

        }
        else{
            res.json(users)
        }
    })
});
//post: /register
router.post('/register',(req,res,next)=>{
  User.register(new User({
      username:req.body.username,
      phone:req.body.phone
  }),req.body.password,(err,user)=>{
    if(err){
console.log(err);
    }
    else{

        res.redirect('/login');

    }
  });
});
// GET: /login
router.get('/login', (req, res, next) => {
    // check for invalid login message in the session object
    let messages = req.session.messages || [];

    // clear the session messages
    req.session.messages = [];

    res.render('login', {
        title: 'Login',
        messages: messages,
        user: req.user
    });
});

// POST: /login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));
// GET: /logout
router.get('/logout', (req, res, next) => {

    // clear out any session messages
    req.session.messages = [];

    // end the user's session
    req.logout();

    // redirect to login or home
    res.redirect('/login');
});
// GET: /google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// GET: /google/callback
router.get('/google/callback', passport.authenticate('google', {
        // failed google auth
        failureRedirect: '/login',
        failureMessage: 'Invalid Login',
        scope: 'email'
    }),
    // successful google auth
    (req, res, next) => {
        res.redirect('/cars');
    }
);

module.exports = router;
