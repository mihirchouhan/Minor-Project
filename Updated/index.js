var path = require('path');
var con = require('./connection');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'html');
app.set('view engine', 'ejs');


const staticPath = path.join(__dirname, "./public");

app.use(express.static(staticPath));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/index.html");
});

//For Student Registration
app.post('/send',function(req,res){
    console.log(req.body);
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
//For Teacher Registration
app.post('/sendteach',function(req,res){
    console.log(req.body);
    var fullname = req.body.fullname;
    var email = req.body.email;
    var Password = req.body.Password;
    var Id_No = req.body.EnrollmentNumber;
    var Branch = req.body.branch;
    var Subject = req.body.Year;
    var mobilenumber = req.body.mobilenumber;
    var address = req.body.address;
    var gender = req.body.gender;
    var dob = req.body.dob;
    
    con.connect(function(error){
        if(error) throw error;
        var sql = "INSERT INTO teachers(Full_Name,Email,Password,Id_No,Branch,Subject,Mobile_Number,Address,Gender,Date_Of_Birth) VALUES('"+fullname+"','"+email+"','"+Password+"','"+Id_No+"','"+Branch+"','"+Subject+"','"+mobilenumber+"','"+address+"','"+gender+"','"+dob+"')";
        con.query(sql,function(error,result){
            if(error) throw error;
            // alert('Teacher Registration Successful');
            res.send('Teacher Registration Successful');

            //res.send('Teacher Registration Successful');
        });
    });

})
//For Dashboard
app.get('/dashboard',function(req,res){
        var sql = 'SELECT * FROM registration';
        con.query(sql, function(error,result){
            if(error) throw error;
            // console.log(result);
            res.render(__dirname+"/public/Dashboard/Dashboard.ejs",{registration:result});  
        });    
});
app.get('/student',function(req,res){
        var sql = 'SELECT * FROM registration';
        con.query(sql, function(error,result){
            if(error) throw error;
            // console.log(result);
            res.render(__dirname+"/public/Dashboard/Student.ejs",{registration:result});  
        });    
});
app.get('/teacher',function(req,res){
    var sql = 'SELECT * FROM teachers';
    con.query(sql, function(error,result){
        if(error) throw error;
        // console.log(result);
        res.render(__dirname+"/public/Dashboard/Teachers.ejs",{teachers:result});  
    });    
});
app.get('/department',function(req,res){
    var sql = 'SELECT * FROM registration';
    con.query(sql, function(error,result){
        if(error) throw error;
        // console.log(result);
        res.render(__dirname+"/public/Dashboard/Department.ejs",{registration:result});  
    });    
});
app.get('/subjects',function(req,res){
    var sql = 'SELECT * FROM registration';
    con.query(sql, function(error,result){
        if(error) throw error;
        // console.log(result);
        res.render(__dirname+"/public/Dashboard/Subjects.ejs",{registration:result});  
    });    
});
app.get('/examlist',function(req,res){
    var sql = 'SELECT * FROM registration';
    con.query(sql, function(error,result){
        if(error) throw error;
        // console.log(result);
        res.render(__dirname+"/public/Dashboard/ExamList.ejs",{registration:result});  
    });    
});
app.get('/setting',function(req,res){
    var sql = 'SELECT * FROM registration';
    con.query(sql, function(error,result){
        if(error) throw error;
        // console.log(result);
        res.render(__dirname+"/public/Dashboard/Setting.ejs",{registration:result});  
    });    
});
app.get('/logout',function(req,res){
    var sql = 'SELECT * FROM registration';
    con.query(sql, function(error,result){
        if(error) throw error;
        // console.log(result);
        res.render(__dirname+"/public/index.ejs",{registration:result});  
    });    
});

app.listen(3000);
