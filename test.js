var express = require('express');

var app = express();

var sotp = require('./index')(app, 'rgfsd', 'Sika App');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
