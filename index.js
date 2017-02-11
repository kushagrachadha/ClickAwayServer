'use strict';
const ejs=require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const deasync = require('deasync');
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const app = express();

app.use("/styles",express.static(__dirname + "/styles"));
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
var temp1 = new tabchem();
temp1.loc=[77.1413259,28.7120974]
temp1.pincode=110089;
temp1.name="Akash Medicos";
temp1.address="G-5, L.S.C 10, Near Canara Bank ATM, Giani Gurumukhi Musaphir Marg, G Block, Sector 16, Rohini, Delhi, 110089";
temp1.contact=919711147224;
temp1.save(function(err){if(err)throw err;});
var temp3 = new tabchem();
temp3.loc=[77.1200085,28.7392456]
temp3.pincode=110085;
temp3.name="Medical shoppee";
temp3.address="Pocket A, Block E, Sector 16E, Rohini, Delhi, 110089";
temp3.contact=918527228188;
temp3.save(function(err){if(err)throw err;});
var temp2 = new tabchem();
temp2.loc=[77.1206316,28.736066]
temp2.pincode=110085;
temp2.name="Durga Medicos";
temp2.address="Shop No 12, CSC No 7, DDA Market, Sec-16, Block F, Sector 16F, Rohini, Delhi, 110085";
temp2.contact=919211584187;
temp2.save(function(err){if(err)throw err;});
var temp4 = new tabchem();
temp4.loc=[77.1220617,28.7343015]
temp4.pincode=110089;
temp4.name="Chitra Medicos";
temp4.address="A-2/125, Pocket 2, Sector 16, Rohini, Delhi, 110089";
temp4.contact=911127892798;
temp4.save(function(err){if(err)throw err;});
var temp5 = new tabchem();
temp5.loc=[77.1253318,28.7328459]
temp5.pincode=110085;
temp5.name="Apolo Pharmacy";
temp5.address="F-18/59, Sector 15, Sector 15B, Rohini, Delhi, 110085";
temp5.contact=911800500101;
temp5.save(function(err){if(err)throw err;});
var temp6 = new tabchem();
temp6.loc=[77.1251437,28.7329475]
temp6.pincode=110089;
temp6.name="Charchika Medicos";
temp6.address="A-4/75, Dr KN Katju Marg, Pocket 4, Sector 16A, Rohini, Delhi, 110089";
temp6.contact=911127299942;
temp6.save(function(err){if(err)throw err;});
var temp7 = new tabchem();
temp7.loc=[77.1235585,28.7270555]
temp7.pincode=110089;
temp7.name="Oberoi Medicos";
temp7.address="A-5/25, Dr KN Katju Marg, Pocket 5, Sector 16A, Rohini, Delhi, 110089";
temp7.contact=911127861033;
temp7.save(function(err){if(err)throw err;});
var temp8 = new tabchem();
temp8.loc=[77.11991,19,28.7357424]
temp8.pincode=110085;
temp8.name="Family Medicare";
temp8.address="F-2/39-40, Block F, Sector 16, Rohini, Delhi, 110085";
temp8.contact=91127882799;
temp8.save(function(err){if(err)throw err;});

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route


app.get('/', function (req, res)
        {
            res.send('Main View for the hospital view.');
        });
app.get('/setup/',function(req,res){
        var result;
        var lat=28.7262716;
        var long=77.1208931;
        //var lat=req.query.lat;
        //var long=req.query.long;
        var limit =  10;
        var maxDistance = 100;
        maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
        var coords = [];
        //coords[0] = req.query.long;
        //coords[1] = req.query.lat;
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

        res.status(200).send(JSON.stringify(mytemp, null, 3));
});
app.get('/h1/',function(req,res){
        var result;
        var lat=28.7262716;
        var long=77.1208931;
        //var lat=req.query.lat;
        //var long=req.query.long;
        var limit =  10;
        var maxDistance = 100;
        maxDistance /= 6371;
        var found=2;
    // get coordinates [ <longitude> , <latitude> ]
        var coords = [];
        //coords[0] = req.query.long;
        //coords[1] = req.query.lat;
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
        deasync.loopWhile(function() {return (found === 2);});
        res.render('pages/hospitalhome')
});


// Spin up the server
app.listen(app.get('port'), function()
    {
        console.log('running on port', app.get('port'));
    });

//code to query up the server
function findthis(tab,sender)
{
  var found =2;
  
  var t = tab.find();
  
  t.exec(function(err, result)
  {
    if (err)
            throw err;
        else
            {
                found = result;
            }
   });
   deasync.loopWhile(function() {return (found === 2);});
   return found;
}