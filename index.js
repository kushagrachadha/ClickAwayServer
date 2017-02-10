'use strict';
const ejs=require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));

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
        var harr=[];

        harr.push(req.query.h);
        res.send(req.query.h.length);
});


// Spin up the server
app.listen(app.get('port'), function()
    {
        console.log('running on port', app.get('port'));
    });

