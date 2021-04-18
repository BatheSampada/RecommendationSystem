const express = require('express');
const path = require('path');

//now using app we can access all methods of express.
const app = express();

//environment variable
//process.env.port will run our application on availab
const port= process.env.PORT || 8000 ;




const static_path= path.join(__dirname,"../public");
//public static path
app.use(express.static(static_path));


var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/User');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var name = req.body.username;
	var pass = req.body.password;

	db.collection('details').find({name: name,password: pass},function(err, user){
		if (err)  throw err;
        if(!user)
         {
            //console.log("Incorrect user NAme Password");
            res.send("Incorrect user NAme Password");
            return res.redirect("localhost:8000/login.html");

        

    }
			
	});
		
	return res.send("http://localhost:8000/home.html");
})


app.get("/login",(req , res)=> {
    res.send(login.html);
});




//app.get(route,callback)
//req is request and res is response
//by default it will open home page as route
app.get("",(req , res)=> {
    res.send("Welcome to Sector Based Trade Recommondation system!!");
})




app.get("/home",(req , res)=> {
    res.send(home.html);
});

app.get("/Finance",(req , res)=> {
    res.send("hdj");
});
app.get("/Communication",(req , res)=> {
    res.send("Welcome to Communication Sector !")
});

app.get("/HealthCare",(req , res)=> {
    res.send("Welcome to HealthCare Sector !")
})

app.get("/Industrial",(req , res)=> {
    res.send("Welcome to Industrial Sector !")
})

app.get("/Technology",(req , res)=> {
    res.send("Welcome to Technology Sector !")
})

app.get("/Industry",(req , res)=> {
    res.send("Welcome to Industry Sector !")
})

app.get("*",(req , res)=> {
    res.send("404: Error Page oops!!!")
})

app.listen(port, () => {
    console.log("listening to the port  at ${port} ")
})
