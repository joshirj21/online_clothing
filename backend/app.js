const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const sessions = require("client-sessions");

mongoose.connect('mongodb://localhost:27017/greendeck',{ useUnifiedTopology: true, useNewUrlParser: true});

var schema = new mongoose.Schema();

var data = mongoose.model('data',schema,'data');
 
var userSchema = new mongoose.Schema({
    email:{type:String,unique:true},
    password:String
})

var user = mongoose.model('User',userSchema);

var jsonParser = bodyParser.json()

app.use(sessions({
    cookieName: 'session', // cookie name dictates the key name added to the request object
    secret: 'blargadeeblargblarg', // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    cookie: {
      path: 'http://localhost:3000/', // cookie will only be sent to requests under '/api'
      maxAge: 60000, // duration of the cookie in milliseconds, defaults to duration above
      ephemeral: false, // when true, cookie expires when the browser closes
      httpOnly: false,// when true, cookie is not accessible from javascript
      secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
    }
  }))

const isAuth = (req,res,next)=>{
    if(!(req.session && req.session.userId)){
        throw(new Error('User is not authenticated'))
    }  
    user.findById(req.session.userId,(err,found)=>{
        if(err){
            throw(err)
        }
        else if(!found){
            throw(new Error('User is not authenticated'))
        }
        req.email = found.email;
        next();
    })
}

app.get('/isAuth',isAuth,(err,req,res,next)=>{
    if(err){
    res.send(err)
    }
    else
    next()
},(req,res)=>{
    res.send({email:req.email})
})

app.post('/search',jsonParser,function(req,res,next){
            data.aggregate([
            {$project:{
                similar_products:0
            }},
            {$addFields:{
                data:{$split:["$name"," "]},
                search:req.body.search,
                discount: {$divide:[{$multiply:[ {$subtract:["$price.regular_price.value", "$price.offer_price.value" ]}, 100]},"$price.regular_price.value"]},
            }},
            {$match:{$expr:{$in:["$search","$data"]}}}
        ])
        .then(data=>res.send(data))
        .catch(err=>console.log(err))
})

app.post('/register',jsonParser,function(req,res){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            user.create({email:req.body.email,password:hash},(err,created)=>{
                if(err)
                res.send(err)
                else
                res.send('User is created')
            })
        });
})
})

app.post('/login',jsonParser,function(req,res){
user.findOne({email:req.body.email},async (err,found)=>{
    if(err)
    res.send(err)
    else{
    let match = await bcrypt.compare(req.body.password, found.password);
    if(match){
    req.session.userId = found._id;
    res.send({email:req.body.email});
    }
    else
    res.status(400).send({
        message:'this is an error'
    })
}
})
})

app.get('/logout',function(req,res){
    req.session.reset();
    console.log(req.session)
    res.status(200).send('User is logged Out');
})

app.listen(process.env.PORT || 5000,function(err){
    if(err)
    console.log('Server cannot be started')
    else
    console.log('Server is Starting......')
})