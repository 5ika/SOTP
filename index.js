var QRCode = require("qrcode-svg");
var bodyParser = require('body-parser');
var sessions = require('client-sessions');
var path = require('path');

module.exports = (app, options) => {
  var OTP = require('./core/otp')(options.secret || 'B7y3Wdci', options.appName || 'My App');

  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(sessions({
    cookieName: 'auth',
    secret: 'jWqDmxv6B5v3YHdixeLdctoHkESCr774wWfmcBcH43Jp3HFjprXZKbeTNeGEskvN',
    duration: 1000 * 60 * 60 * 12,
    activeDuration: 1000 * 60 * 5
  }));

  // Show login page
  app.get('/sotp/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
  });

  // Show QRCode with URI for Google Auth App (only on DevMode)
  if(options.devMode)
    app.get('/sotp/secret', (req, res) => {
      var uri = OTP.getURI();
      var svg = new QRCode(uri).svg();
      res.send(svg);
    })

  // User Login
  app.post('/sotp/login', (req, res) => {
    var token = req.body.token || req.query.token;
    var isValid = OTP.verifyToken(token);
    req.auth.connected = true;
    if(isValid) res.redirect(options.successRedirect || '/sotp/test');
    else res.redirect('/sotp/login?msg=loginfail');
  });

  // Check if user is connected
  app.use((req, res, next) => {
    if(req.auth.connected) next();
    else {
      console.log('User not connected');
      res.redirect('/sotp/login');
    }
  });

  // User logout
  app.use('/sotp/logout', (req, res) => {
    req.auth.reset();
    res.redirect('/sotp/login?msg=disconnected');
  });

  // Test page
  app.get('/sotp/test', (req, res) => {
    res.send('You are connected !');
  })

}
