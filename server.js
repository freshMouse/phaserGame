var express = require("express");
var app = express();

app.use("/src", express.static("src"));
app.use("/assets", express.static("src/assets"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/src/index.html");
});

app.listen(80);
console.log("serving at 80");
