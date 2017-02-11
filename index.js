'use strict';
const ejs=require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const deasync = require('deasync');
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const app = express();


app.use("/styles",express.static(__dirname + "/public"));

app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));
mongoose.connect('mongodb://sahil:kush1996@ds149049.mlab.com:49049/heroku_fn48jrgr');
console.log("connected");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var commonSchema = new Schema(
    {
        loc:{
          type:[Number],
          index:'2d'
        },  
        pincode : {type: Number},
        name : {type: String},
        address : {type : String},
        contact : {type: Number},
    }
);

var tabhosp = mongoose.model('hospital_table', commonSchema,'hospital_table');
var tabchem = mongoose.model('chemist_table', commonSchema,'chemist_table');
var tabbank = mongoose.model('bank_table', commonSchema,'bank_table');
console.log("tables created");
app.use(bodyParser.urlencoded({extended: false}));
// Process application/json
app.use(bodyParser.json());

app.get('/', function (req, res)
        {
            res.send('Welcome to index of Click-away backend. Download app to know more.');
        });
app.post('/setup/',function(req,res){
        var result;
        var lat=req.body.lat;
        var long=req.body.long;
        console.log(JSON.stringify(req.body), lat, long);
        var limit =  10;
        var maxDistance = 1000;
        maxDistance /= 6371;
        var coords = [];
        var found=2;
        coords[0]=long;
        coords[1]=lat;
        var m=tabhosp.find({loc:{
          $near: coords,
          $maxDistance: maxDistance}
        });
        m.exec(function(err, result)
        {
        if (err)
            throw err;
        else
            {
               found = result;
            }
        });
        var mytemp = {
          "hospitals":[],
          "bloodbanks":[],
          "chemist":[]
        };
        deasync.loopWhile(function() {return (found === 2);});
        mytemp.hospitals = found;
        found = 2;
        m=tabchem.find({loc:{
          $near: coords,
          $maxDistance: maxDistance}
        });
        m.exec(function(err, result)
        {
        if (err)
            throw err;
        else
            {
               found = result;
            }
        });
        deasync.loopWhile(function() {return (found === 2);});
        mytemp.chemist= found;
        found = 2;
        m=tabbank.find({loc:{
          $near: coords,
          $maxDistance: maxDistance}
        });
        m.exec(function(err, result)
        {
        if (err)
            throw err;
        else
            {
               found = result;
            }
        });
        deasync.loopWhile(function() {return (found === 2);});

        mytemp.bloodbanks = found;
        console.log(JSON.stringify(mytemp),found);
        res.status(200).send(JSON.stringify(mytemp));
});
app.get('/h1/',function(req,res){
        var result;
        var lat=req.query.lat;
        var long=req.query.long;
        var limit =  10;
        var maxDistance = 1000;
        maxDistance /= 6371;
        var found=2;
        var coords = [];
        var found=2;
        coords[0]=long;
        coords[1]=lat;
        var m=tabhosp.find({loc:{
          $near: coords,
          $maxDistance: maxDistance}
        });
        m.exec(function(err, result)
        {
        if (err)
            throw err;
        else
            {
               found = result;
            }
        });
        var type="Hospitals";
        deasync.loopWhile(function() {return (found === 2);});
        res.render(__dirname+'/pages/hospitalhome',{
          data:found,
          banner:type
        });
});
app.get('/c1/',function(req,res){
        var result;
        var lat=req.query.lat;
        var long=req.query.long;
        var limit =  10;
        var maxDistance = 1000;
        maxDistance /= 6371;
        var found=2;
        var coords = [];
        var found=2;
        coords[0]=long;
        coords[1]=lat;
        var m=tabchem.find({loc:{
          $near: coords,
          $maxDistance: maxDistance}
        });
        m.exec(function(err, result)
        {
        if (err)
            throw err;
        else
            {
               found = result;
            }
        });
        var type="Chemists";
        deasync.loopWhile(function() {return (found === 2);});
        res.render(__dirname+'/pages/hospitalhome',{
          data:found,
          banner:type
        });
});
app.get('/b1/',function(req,res){
        var result;
        var lat=req.query.lat;
        var long=req.query.long;
        var limit =  10;
        var maxDistance = 1000;
        maxDistance /= 6371;
        var found=2;
        var coords = [];
        var found=2;
        coords[0]=long;
        coords[1]=lat;
        var m=tabbank.find({loc:{
          $near: coords,
          $maxDistance: maxDistance}
        });
        m.exec(function(err, result)
        {
        if (err)
            throw err;
        else
            {
               found = result;
            }
        });
        var type="Blood Banks";
        deasync.loopWhile(function() {return (found === 2);});
        res.render(__dirname+'/pages/hospitalhome',{
          data:found,
          banner:type
        });
});

// Spin up the server
app.listen(app.get('port'), function()
    {
        console.log('running on port', app.get('port'));
    });
