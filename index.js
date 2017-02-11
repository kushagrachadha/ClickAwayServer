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
var temp1 = new tabhosp();
temp1.loc=[77.1310776,28.7308195]
temp1.pincode=110089;
temp1.name="Sunrise Hospital";
temp1.address="8-B, Plot No-1, B4 Rd, Sector 15, Pocket 1, Rohini, Delhi, 110089";
temp1.contact=911127894780;
temp1.save(function(err){if(err)throw err;});
var temp3 = new tabhosp();
temp3.loc=[77.1310776,28.7308195]
temp3.pincode=110085;
temp3.name="Saroj Super Speciality Hospital";
temp3.address="Near Madhuban Chowk, Sector 14, Rohini, Delhi, 110085";
temp3.contact=911147903333;
temp3.save(function(err){if(err)throw err;});
var temp2 = new tabhosp();
temp2.loc=[77.0112063,28.7123525]
temp2.pincode=110086;
temp2.name="Brahm Shakti Hospital";
temp2.address=" No.U-1/78, Budh Vihar, New Delhi, Delhi 110086";
temp2.contact=911127531386;
temp2.save(function(err){if(err)throw err;});
var temp4 = new tabhosp();
temp4.loc=[77.0696299,28.733512]
temp4.pincode=110089;
temp4.name="Ishan Hospital";
temp4.address="Plot No.1, Pocket-8B, Dr MC Davar Marg, Sector 19, Rohini, Delhi, 110089";
temp4.contact=911127892798;
temp4.save(function(err){if(err)throw err;});
var temp5 = new tabhosp();
temp5.loc=[77.1785709,28.710125]
temp5.pincode=110089;
temp5.name="Nirvana Hospital";
temp5.address="42, Badli Rd, Sector 15, Pocket 1, Sector 15C, Rohini, Delhi, 110089";
temp5.contact=911149055088;
temp5.save(function(err){if(err)throw err;});
var temp6 = new tabhosp();
temp6.loc=[77.0717018,28.7327251]
temp6.pincode=110042;
temp6.name="Aastha Hospital";
temp6.address="Badli Rd, Sector 19, Rohini, New Delhi, Delhi 110042";
temp6.contact=911147903333;
temp6.save(function(err){if(err)throw err;});
var temp7 = new tabhosp();
temp7.loc=[77.1235585,28.7270555]
temp7.pincode=110085;
temp7.name="ESI Hospital";
temp7.address="Opp HP Petrol Pump, Sector 15A, Rohini, New Delhi, Delhi";
temp7.contact=911127861033;
temp7.save(function(err){if(err)throw err;});
var temp8 = new tabhosp();
temp8.loc=[77.0470234,28.7471097]
temp8.pincode=110042;
temp8.name="Health Hospital";
temp8.address="Delhi Technological University, Shahbad Daulatpur Village, Rohini, Delhi, 110042";
temp8.contact=911127272727;
temp8.save(function(err){if(err)throw err;});

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route

app.get('/h1/',function(req,res){
        var harr=[].concat(req.query.h);
        var har=JSON.parse(JSON.stringify(harr));
        console.log(har);
        res.render(__dirname+'/pages/hospitalhome',{
          hospitals: har,
          //contact=number
        });
});
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
   deasync.loopWhile(function() {return (found === 2);});
        res.status(200).send(JSON.stringify(found));
});
app.get('/c1/',function(req,res){
        var carr=[].concat(req.query.h);
        var car=JSON.parse(JSON.stringify(harr));
        var number='8527228188';
        console.log(car);
        res.render(__dirname+'/pages/chemisthome',{
          chemists: car,
          //contact=number
        });
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
