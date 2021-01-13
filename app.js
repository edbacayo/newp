const express = require("express");
const app = express();

app.use(express.static("public"));

const port = 3000;


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.get("/combat", function(req, res) {
    res.sendFile(__dirname + "/combat.html");
})



app.listen(port || process.env.PORT, function() {
    console.log("Listening...");
})