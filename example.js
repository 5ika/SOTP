var express = require('express');

var app = express();

var sotp = require('./index')(app, {
  secret: 'my-random-secret',
  appName: '5ika App',
  successRedirect: '/yolo',
  devMode: false
});

app.get('/yolo', (req, res) => {
  res.send('Yolo !');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
