const express = require('express');
const router = express.Router();
//auth references
const passport=require('passport');
const User=require('../models/user');
const nodemailer=require('nodemailer');

