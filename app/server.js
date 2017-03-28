var https = require('https');
var express = require('express');
var pem = require('pem');
var fs = require('fs');
var spawn = require('child_process').spawn;
const url = require('url');
var secrets = require('../secrets.json');

var apiToken = secrets.apiToken;
var PORT = 8090;

var getToken = function(token, originalRes){
  var options = {
    host: 'api.onfido.com',
    path: '/v2/jwt?referrer=*://*/*',
    method: 'GET',
    headers: {
        'Authorization': 'Token token='+token
    }
  };

  https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      originalRes.send(chunk);
    });
  }).end();
};

var app = express();

var isOriginHostnameSameAsServer = function(req){
  var origin = req.get('origin');
  if (!origin) return;

  var originHostname = url.parse(origin).hostname;
  return originHostname === req.hostname;
};

app.get('/jwt', function (req, res) {
  var origin = req.get('origin');

  //allow Access-Control-Allow-Origin if the domain is the same but port might be different
  if (isOriginHostnameSameAsServer(req)){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
  }

  getToken(apiToken, res);
});



var certPath = 'cert.pem';
var keyPath = 'key.pem';

var startServer = function(key,cert){
  https.createServer({key: key, cert: cert}, app).listen(PORT);
  console.log("listening on "+PORT);
};

var generateKeysStartServer = function(){
  pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
    fs.writeFileSync(keyPath, keys.serviceKey);
    fs.writeFileSync(certPath, keys.certificate);
    startServer(keys.serviceKey, keys.certificate);
  });
};

var startServerSigned = function(){
  try {
    var cert = fs.readFileSync(certPath, 'utf8');
    var key = fs.readFileSync(keyPath, 'utf8');
    startServer(key, cert);
  } catch (e) {
    generateKeysStartServer();
  }
};

startServerSigned();

var child = spawn('npm',['run','dev:webpack']);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
