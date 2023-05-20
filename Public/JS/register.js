var express = require('express');
var app = express();
const router = express.Router();
var con = require('./connector')
var path = require('path')
var bodyParser = require('body-parser');
var {encryptAES, decryptAES} = require('./Encrypt/RSA')
var  encryptRC4 = require('../JS/Encrypt/RC4')
var hash = require('../JS/Hash/SHA-256')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}))
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.post('/', function(req, res){
    var FirstName = encryptAES(req.body.FirstName);
    var LastName = encryptAES(req.body.LastName);
    var Username = encryptAES(req.body.Username);
    var Password = hash(encryptAES(req.body.Password));
    var Address = encryptAES(req.body.Address);
    var Birthday = encryptAES(req.body.Birthday);
    var Gender = encryptAES(req.body.Gender);
    var Email = encryptAES(req.body.Email);
    var Phone = encryptAES(req.body.Phone);
    var Subject = encryptAES(req.body.Subject);
    con.connect(function(err){
        if(err) throw err;
        var sql = "INSERT INTO user(username, password, firstname, lastname, address, birthday, gender, email, phone, subject)"
        +" VALUES('"+Username+"','"+Password+"','"+FirstName+"','"+LastName+"','"+Address+"','"+Birthday+"','"+Gender+"','"+Email+"','"+Phone+"','"+Subject+"')";
        con.query(sql,function(err, result){
            if(err) throw err;
            res.send('Thanks for register');
        });
    });
});
module.exports = router;