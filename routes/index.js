var mongo = require('mongodb');
var monk = require('monk');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;



var address = process.env.MONGOHQ_URL || 'localhost:27017/test';
var db = monk(address);


var ols = require('./OLS1.js');
module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    });

    app.get('/random', function (req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    });
    app.get('/getdestdata', function(request, response) {
      response.set('content-type', 'application/JSON');
      var dd = {};

      var collection = db.get('destdata');
      collection.find({id: Math.round(Math.random()*102)}, {}, function(e, docs) { 
        dd = docs[0];
        response.end(JSON.stringify(dd));
      });
    });

    app.get('/searchresult', function(request, response) {
      response.set('content-type', 'application/JSON');
      // console.log(request.query.searchterm);
      var query = request.query.searchterm;
      var dd = {};

      var collection = db.get('destdata');
      collection.find({name: query}, {}, function(e, docs) { 
        dd = docs[0];
        response.end(JSON.stringify(dd));
      });
    });

    app.get('/getcitieslist', function(request, response) {
      response.set('content-type', 'application/JSON');
      var dd = [];
      var collection = db.get('destdata');
      collection.find({},{fields: {name: 1}}, function(e, docs) { 
        for (var i = 0; i < docs.length; i++) {
          dd.push(docs[i].name);
        }
        response.end(JSON.stringify(dd));
      });
    });

    app.get('/getexploredeck', function(request, response) {
      response.set('content-type', 'application/JSON');
      var searchterm = request.query.searchterm;
      var limit = parseInt(request.query.limit);
      var dd = [];
      var collection = db.get('destdata');
      collection.find({name: searchterm}, {}, function(e, targetcitydoc) { 
        var targetdoc = targetcitydoc[0];
        // console.log(targetid);
        collection.find({},{fields: {id:1, name:1, characteristics: 1, photourl:1}}, function(e2, docs2) { 
          dd = ols.findnearest(docs2, targetdoc, limit);
          response.end(JSON.stringify(dd));
        });
      });
    });
};
