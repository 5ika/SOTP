module.exports = (app, secret, appName) => {
  var OTP = require('./core/otp')(secret || 'B7y3Wdci', appName || 'NodeJSApp');

  app.get('/otp-token', (req, res) => {
    var uri = OTP.getURI();
    res.json({uri, next: 'Affichez moi en SVG avec une lib JS client !'});
  })

  app.use((req, res, next) => {
    // Vérification du token
    // Todo : Login avec token puis gestion de session (Passport JS ?)
  });
}
