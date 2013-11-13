var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');


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
      collection.find({id: Math.round(Math.random()*2)}, {}, function(e, docs) {
        dd = docs[0];
        console.log('from mongdb ', docs[0]);
        response.end(JSON.stringify(dd));
      });



  });

};
