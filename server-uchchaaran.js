var express = require("express");
const { urlencoded, query } = require("express");
var path=require("path");
var mysql= require("mysql");
var path=require("path");
const { report } = require("process");

var app=express();

//-------------------------------------------

app.listen(2023,function(){
    console.log("Server started");
})

app.use(express.static("public"));

var dbConfiguration={
    host:"localhost",
    user:"root",
    password:"",
    database:"uchchaaran"
}
var refDB=mysql.createConnection(dbConfiguration);
refDB.connect(function(errKuch)
{
    if(errKuch)
        console.log(errKuch);
    else
        console.log("Server Connected");
})
app.get("/profile-process",function(req,res){
    // console.log("----------------");
   

    var dataAry=[req.query.signupemail,req.query.signuppwd];
   refDB.query("insert into signup values(?,?)",dataAry,function(err,result){
            if(err)
            res.send(err);
            else
            res.send("Inserted Successfully");
   })
})

app.get("/chklogin",function(req,res){
    var arry=[req.query.loginemail,req.query.loginpwd,1]
    refDB.query("select * from users where email=? and pwd=?",arry,function(err,result)
                {
                    if(err)
                    res.send(err);
                    else
                   res.send(result);
                 })
    });
    app.post("/quiz-dash",function(req,res){
        var dataAry=[req.query.loginemail,req.query.ans1,req.query.ans2,req.query.ans3,req.query.ans4,req.query.ans5];
       refDB.query("insert into quizdash values(?,?,?,?,?,?)",dataAry,function(err,result){
                if(err)
                res.send(err);
                else
                res.send("Inserted Successfully");
       })
    })

    // app.post("/profile-dash",function(req,res){
    //     var dataAry=[req.query.name,req.query.Age,req.query.fathersname,req.query.mothersname,req.query.birthday,req.query.contact,req.query.Blood,req.query.City,req.query.State];
    //    refDB.query("insert into profiledash values(?,?,?,?,?,?,?,?,?)",dataAry,function(err,result){
    //             if(err)
    //             res.send(err);
    //             else
    //             res.send("Inserted Successfully");
    //    })
    // })

    