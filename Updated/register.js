var path = require('path');
var con = require('./connection');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

const staticPath = path.join(__dirname, "./public");
app.use(express.static(staticPath));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"./public/Login/studentRegister.html");
});

app.post('/Login/studentRegister.html',function(req,res){
    var fullname = req.body.fullname;
    var email = req.body.email;
    var Password = req.body.Password;
    var EnrollmentNumber = req.body.EnrollmentNumber;
    var Branch = req.body.branch;
    var Year = req.body.Year;
    var mobilenumber = req.body.mobilenumber;
    var address = req.body.address;
    var gender = req.body.gender;
    var dob = req.body.dob;

    con.connect(function(error){
        if(error) throw error;
        var sql = "INSERT INTO registration(Full_Name,Email,Password,Enrollment_Number,Branch,Year,Mobile_Number,Address,Gender,Date_Of_Birth) VALUES('"+fullname+"','"+email+"','"+Password+"','"+EnrollmentNumber+"','"+Branch+"','"+Year+"','"+mobilenumber+"','"+address+"','"+gender+"','"+dob+"')";
        con.query(sql,function(error,result){
            if(error) throw error;
            res.send('Student Registration Successful'+result);
        });
    });

})

app.listen(3002);
