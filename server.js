var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var app = express();

app.set("port", (process.env.PORT || 5000));

app.use("/src", express.static("src"));
app.use("/assets", express.static("src/assets"));
app.use("/public", express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: "$%^ikpuUUPIU#IOJkasjfkasjfiojj#$%^787829370asfasjdf"}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/run", function(req, res) {
  if(session.logged) {
    res.sendFile(__dirname + "/public/run.html");
  } else {
    res.redirect("/");
  }
});

app.post("/", function(req, res) {
  if(req.body.password === "long") {
    session.logged = true;
    res.redirect("/run");
  } else {
    res.send("WHO ARE YOU????? DON't GO HERE AGAIN!");
  }
})
//app.listen(8080);
app.listen(app.get("port"), function() {
 console.log("serving at port", app.get("port"));
});
