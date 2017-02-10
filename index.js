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
mongoose.connect('mongodb://heroku_fn48jrgr@ds149049.mlab.com:49049/heroku_fn48jrgr');
console.log("connected");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var commonSchema = new Schema(
    {
        lat : {type: SchemaTypes.Double},
        long : {type: SchemaTypes.Double},
        pincode : {type: Number},
        Name : {type: String},
        Address : {type : String},
        contacts : {type: Number},
    }
);

var tabhosp = mongoose.model('hospital_table', commonSchema,'hospital_table');
var tabchem = mongoose.model('chemist_table', commonSchema,'chemist_table');
var tabbank = mongoose.model('bank_table', commonSchema,'bank_table');
console.log("tables created");
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res)
        {
            res.send('Main View for the hospital view.');
        });
app.get('/h1/',function(req,res){
        var harr=[].concat(req.query.h);
        var har=JSON.parse(JSON.stringify(harr));
        console.log(har);
        res.render(__dirname+'/pages/hospitalhome',{
          hospitals: har,
          //contact=number
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