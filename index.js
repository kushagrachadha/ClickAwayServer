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
var temp1 = new tabbank();
temp1.loc=[77.1413259,28.706112]
temp1.pincode=110085;
temp1.name="Saroj Super Speciality Hospital";
temp1.address="Near Madhuban Chowk, Sector 14, Rohini, Block A, Sector 14, Rohini, Delhi, 110085";
temp1.contact=911147903333;
temp1.save(function(err){if(err)throw err;});
var temp3 = new tabbank();
temp3.loc=[77.0790579,28.7123705]
temp3.pincode=110086;
temp3.name="Brahm Shakti Hospital";
temp3.address="No.U-1/78, Budh Vihar, Pocket C, Budh Vihar Phase I, Budh Vihar, New Delhi, Delhi 110086";
temp3.contact=911127531683;
temp3.save(function(err){if(err)throw err;});
var temp2 = new tabbank();
temp2.loc=[77.1112703,28.7146069]
temp2.pincode=110085;
temp2.name="Dr. Baba Saheb Ambedkar Hospital";
temp2.address="Sector 6, Rohini, Near Rohini West Metro Station, Delhi, 110085";
temp2.contact=911127055585;
temp2.save(function(err){if(err)throw err;});
var temp4 = new tabbank();
temp4.loc=[77.0808462,28.693597]
temp4.pincode=110083;
temp4.name="Sanjay Gandhi Memorial Hospital";
temp4.address="Block S, Mangolpuri, Mangolpuri, Delhi, 110083";
temp4.contact=911127922843;
temp4.save(function(err){if(err)throw err;});
var temp5 = new tabbank();
temp5.loc=[77.1075667,28.6977129]
temp5.pincode=110085;
temp5.name="Jaipur Golden Hospital";
temp5.address="Plot No.2, Yog Ashram Marg, Sector 3, Institutional Area, Rohini, Institutional Area, Sector 3, Rohini, Delhi, 110085";
temp5.contact=918888888888;
temp5.save(function(err){if(err)throw err;});
var temp6 = new tabbank();
temp6.loc=[77.108741,28.7164723]
temp6.pincode=110085;
temp6.name="Rajiv Gandhi Cancer Institute & Research Institute";
temp6.address="Sector 5, Rohini, Delhi, 110085";
temp6.contact=911147022222;
temp6.save(function(err){if(err)throw err;});
var temp7 = new tabbank();
temp7.loc=[77.1792541,28.6917859]
temp7.pincode=110052;
temp7.name="Sunder Lal Charitable Hospital";
temp7.address="Phase 3, Ashok Vihar, Delhi, 110052";
temp7.contact=911147030900;
temp7.save(function(err){if(err)throw err;});
var temp8 = new tabbank();
temp8.loc=[77.0984223,28.7357424]
temp8.pincode=110085;
temp8.name="Pitampura Blood Bank";
temp8.address="B-294, SARASWATI VIHAR, OUTER RING ROAD , ABOVE YAMAHA SHOWROOM ,PITAMPURA, Block B, Saraswati Vihar, Pitampura, Delhi, 110034";
temp8.contact=91165655155;
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
app.post('/setup/',function(req,res){
        var result;
        //var lat=28.7262716;
        //var long=77.1208931;
        var lat=req.body.lat;
          var long=req.body.long;
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


// Spin up the server
app.listen(app.get('port'), function()
    {
        console.log('running on port', app.get('port'));
    });
