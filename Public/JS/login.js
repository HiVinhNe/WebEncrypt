var express = require('express');
const router = express.Router();
var app = express();
var con = require('./connector')
var path = require('path')
var bodyParser = require('body-parser');
var {encryptAES, decryptAES} = require('./Encrypt/RSA')
var encryptRC4 = require('../JS/Encrypt/RC4')
var hash = require('../JS/Hash/SHA-256')
var { engine } = require('express-handlebars');
const { parseArgs } = require('util');




app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname+'../Public/views'));
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../views/login.html'));
});
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.post('/', function(req, res){
    var Username = encryptAES(req.body.Username);
    var Password = hash(encryptAES(req.body.Password));
    con.connect(function(err){
        if(err) throw err;
        var sql = "select username, password from user where username = '"+Username+"' AND  password = '"+Password+"'";
        con.query(sql,function(err, result){
            if(err) throw err;
             if(Object.keys(result).length  == 1){
                 //res.redirect('/login/profile')
                //console.log(__dirname)
                //res.render('profile', {Profile : result});
                //res.render('profile', {result: result})
                res.send("Login successful");
            }
            else {
                res.send('The username or password incorrect, Please try again');
            }
        });
    });
});
//  router.get('/profile', function(req, res) {
//      res.sendFile(path.join(__dirname,'../views/profile.handlebars'));
//    });
module.exports = router;