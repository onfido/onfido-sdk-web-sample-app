import https from 'https';
import express from 'express';
import pem from 'pem';
import fs from 'fs';
import { spawn } from 'child_process';
import url from 'url';
import secrets from '../secrets.json';
import unirest from 'unirest';

const apiToken = secrets.apiToken;
const PORT = 8090;

const onfidoRequest = (method, path, parameters, callback) => {
  unirest[method]('https://api.onfido.com/v2/'+path)
    .headers({'Authorization': 'Token token='+apiToken})
    .send(parameters)
    .end(callback)
};

const createApplicant = function(callback){
  onfidoRequest('post', 'applicants', {first_name:"John",last_name:"Doe"}, callback)
};

const createJWT = (callback) =>{
  createApplicant( ({body:applicant}) => {
    onfidoRequest('post','sdk_token',
      {referrer:"*://*/*", applicant_id:applicant.id},
      callback
    )
  })
}

const isOriginHostnameSameAsServer = function(req){
  var origin = req.get('origin');
  if (!origin) return;

  var originHostname = url.parse(origin).hostname;
  return originHostname === req.hostname;
};

const certPath = 'cert.pem';
const keyPath = 'key.pem';

const startServer = function(key,cert){
  https.createServer({key: key, cert: cert}, app).listen(PORT);
  console.log("listening on "+PORT);
};

const getKeys = function(callback){
  try {
    const cert = fs.readFileSync(certPath, 'utf8');
    const key = fs.readFileSync(keyPath, 'utf8');
    callback(key, cert);
  } catch (e) {
    console.log("generating keys");
    pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
      fs.writeFileSync(keyPath, keys.serviceKey);
      fs.writeFileSync(certPath, keys.certificate);
      callback(keys.serviceKey, keys.certificate);
    });
  }
};

const startServerSigned = function(){
  getKeys(startServer);
};

const app = express();

app.get('/jwt', function (req, res) {
  createJWT(({body})=> res.send(body))
});

app.use(express.static('dist'));

startServerSigned();
