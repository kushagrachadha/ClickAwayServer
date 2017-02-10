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
        loc{
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
var temp = new tabhosp();
temp.loc=[77.113459,28.714607]
temp.pincode=110085;
temp.name="Dr. Baba Saheb Ambedkar Hospital";
temp.address="Sector 6, Rohini, Near Rohini West Metro Station, Sector 6, Rohini, Delhi, 110085";
temp.contact=911127055585;
temp.save(function(err){if(err)throw err;});
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
app.get('setup',function(req,res){
        var result;
        var lat=28.7262716;
        var long=77.1208931;
        //var lat=req.query.lat;
        //var long=req.query.long;
        var limit =  10;
        var maxDistance = 4;
        maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
        var coords = [];
        //coords[0] = req.query.long;
        //coords[1] = req.query.lat;
        coords[0]=long;
        coords[1]=lat;
        tabhosp.findAll({loc: {
          $near: coords,
          $maxDistance: maxDistance
        }
        }).limit(limit).exec(function(err, hospitals) {
          if (err) {
            console.log("Error fetching data from coords")
        }
        req.send(hospitals);
        });
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

findLocation: function(req, res, next) {  
    

    // get the max distance or set it to 8 kilometers
    

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;

    // find a location
    Location.find({
      loc: {
        $near: coords,
        $maxDistance: maxDistance
      }
    }).limit(limit).exec(function(err, locations) {
      if (err) {
        return res.json(500, err);
      }

      res.json(200, locations);
    });
}