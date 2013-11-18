var express = require('express'),
    routes = require('./routes'),
    path = require('path');

var app = express();

app.directory = __dirname;
app.configure(function() {
  app.use(express.static(__dirname + '/app/'));
});

require('./config/environments')(app);
require('./routes/index_local.js')(app);

module.exports = app;
