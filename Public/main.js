var express = require('express');
const path = require('path');
var app = express();
const register = require('./JS/register');
const login = require('./JS/login');
const https = require('https');
const fs = require('fs');
var router = require('./JS/register');


app.use(express.static(path.join(__dirname)));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.use('/register', register)
app.use('/login', login)
const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname,'SSL', 'private.key')),
    cert: fs.readFileSync(path.join(__dirname,'SSL', 'certificate.crt'))
},app, router
).listen(443, () => {
    console.log('Server is running on port 443');
  });