var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var mysql = require("mysql");
var bcrypt = require("bcrypt");
var app = express();

app.set("port", (process.env.PORT || 5000));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "harveyHarvey123",
  database: "users"
});
connection.connect();

app.use("/src", express.static("src"));
app.use("/assets", express.static("src/assets"));
app.use("/public", express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: "$128<F5><F8><F9><F8><F9><F10><F2><F8><F4><F9>7*%^ikpuUUPIU#IOJkasjfkasjfiojj#$%^787829370asfasjdf"}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", function(req, res) {
  res.send("Logging in");
})

app.get("/run", function(req, res) {
  if(session.logged) {
    res.sendFile(__dirname + "/public/run.html");
  } else {
    res.redirect("/");
  }
});

app.post("/login", function(req, res) {
  var username = req.body.name;
  var password = req.body.loginPassword;

  connection.query(`SELECT * FROM users WHERE name=?`,username,  function(err, hash) {
    if(err) {
      res.redirect("/");
      console.log("error", err);
    }
    bcrypt.compare(password, hash[0].password, function(err, result) {
      if(err) {
        res.redirect("/");
        console.log("error", err);
      }
      if(result) {
        session.logged = true;
        res.redirect("/run");
      } else {
        res.redirect("/");
      }
    });
  })
})

app.post("/", function(req, res) {
  if(req.body.password === "long") {
    var password = req.body.userPassword;
    var username = req.body.username;

    bcrypt.hash(password, 10, function(err, hash) {
      if(err) {
        console.log("error", err);
      }
      connection.query("INSERT INTO users SET ?", {name: username, password: hash}, function(err, result) {
       if(err) {
           console.log("error", err);
        }
     });
    });

    res.redirect("/");
  } else {
    res.send("WHO ARE YOU????? DON't GO HERE AGAIN!");
  }
});
//app.listen(8080);
app.listen(app.get("port"), function() {
 console.log("serving at port", app.get("port"));
});
