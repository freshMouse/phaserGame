var express = require("express");
var app = express();

app.set("port", (process.env.PORT || 5000));

app.use("/src", express.static("src"));
app.use("/assets", express.static("src/assets"));
app.use("/public", express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
//app.listen(8080);
app.listen(app.get("port"), function() {
 console.log("serving at port", app.get("port"));
});
