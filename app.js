const express = require("express");
const app = express();

const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/faction";


app.use(express.static("public"));

const port = 3000;


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.get("/combat", function (req, res) {
    res.sendFile(__dirname + "/combat.html");
})

app.get("/bgs", function (req, res) {
    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    const star_systems_Schema = new mongoose.Schema({
        timestamp: String,
        name: String,
        factions: [{
            name: String,
            factionState: {
                state: String,
                trend: String
            },
            goverment: String,
            influence: Number,
            allegiance: String,
            activeStates: [{
                state: String,
                trend: String
            }],
        }],
        systemFaction: {
            name: String,
            state: [{
                state: String,
                trend: String
            }],
        },
        conflicts: [{
            warType: String,
            status: String,
            factions: [{
                name: String,
                stake: String,
                daysWon: Number
            }]
        }]
    });

    var yesterday = new Date((new Date()).setHours(00, 00, 00).valueOf() - 86400000); // - 1 day
    
    var factionInf = 0;
    const star_systems = mongoose.model("star_systems", star_systems_Schema);
    star_systems.find({"systemFaction.name":"New Pilots Initiative", "timestamp":{$lt: yesterday}}, function(err, starSystems) {
        if (err) {
            console.log(err);
        } else {
            starSystems.forEach(function(system) {
                system.factions.forEach(function(factions) {
                    if(factions.name === "New Pilots Initiative") {
                        factionInf = factions.influence;
                    }
                });

                console.log(system.name + " | " + system.systemFaction.name + " | " + system.systemFaction.state + " | " + factionInf);
            });
        }
    })
    
    // const faction = new Faction(factionInputTest);
    // console.log(factionInputTest);
    // faction.save();
    
    var today = new Date();
    res.send(yesterday);
})


app.listen(process.env.PORT || port, function () {
    console.log("Listening...");
})
