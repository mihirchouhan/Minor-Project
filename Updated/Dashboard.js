var path = require('path');
var con = require('./connection');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const staticPath = path.join(__dirname, "./public");
app.use(express.static(staticPath));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.sendFile(__dirname+"./public/Login/studentRegister.html");
});

app.get('/public/Dashboard/Dashboard.ejs',function(req,res){
    con.connect(function(error){
        if(error) throw error;
        var sql = 'SELECT * FROM registration';
        con.query(sql, function(error,result){
            if(error) throw error;
            console.log(result);
            res.render(__dirname+"./public/Dashboard/Dashboard",{registration:result});  
        });
    });
        
});

app.listen(3005);