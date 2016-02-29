SOTP is a OTP authentication manager for Express based on [notp](https://github.com/guyht/notp).

# How to
## Add SOTP to your code

```javascript
var express = require('express');
var app = express();

var sotp = require('sotp')(app, {
  secret: 'my-random-secret', // Required
  appName: 'My App Name', // Name to display in Google Auth App - Default = My App
  successRedirect: '/homepage', // URL redirection after authentication - Default = /sotp/test
  devMode: true // Shown secret QRCode on /sotp/secret - Optionnal - Default = false
});

app.get('/homepage', (req, res) => {
  res.send('This is the Homepage ! You are logged in.');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

## Add secret to Google Auth App

Get the secret QRcode on this page :

``http://localhost:3000/sotp/secret``

then scan it with the Google Auth App (iOS / Android)

Don't forget to set `devMode` to `false` if you no longer require to scan secret QRCode.

## Login

Use this page to login with a token :

``http://localhost:3000/sotp/login``

If authentication is successful, you are redirect to the given URL (`/homepage`).
