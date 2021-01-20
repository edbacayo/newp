const express = require("express");
const app = express();
app.use(express.static("public"));
const port = 3000;



const systemPresence = ["LHS 2884", "Belobog", "Aganippe", "Mufrid", "Magec", "Mufrid", "Meliae", "Magec", "Dahan"];
const mongoose = require("mongoose");
// const mongoURL = "mongodb://localhost:27017/faction";
const mongoURL = "mongodb+srv://web-user:EX9zMfiPNUKEoqX2@cluster0.j8vzx.mongodb.net/production?retryWrites=true&w=majority";
const tickSchema = mongoose.Schema({timestamp: String});
const Schema = mongoose.Schema;
const star_systems_Schema = new Schema({
    timestamp: Date,
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




app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.get("/combat", function (req, res) {
    res.sendFile(__dirname + "/combat.html");
})

app.get("/bgs", function (req, res) {
    var tempStr = [];

    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 });

    var latestTick = mongoose.model("ticks", tickSchema);
    latestTick.find({}, function(err, ticks) {
        console.log("TICK: " + ticks[0].timestamp);
    }).sort({createdAt: 1}).limit(1);

    var yesterday = new Date((new Date()).setHours(00, 00, 00).valueOf() - 86400000); // - 1 day
    
    var factionInf = 0;
    var star_systems = mongoose.model("star_systems", star_systems_Schema);
    // star_systems.find({"timestamp":{$lt: yesterday}, "systemFaction.name":"New Pilots Initiative"}, function(err, starSystems) {
    star_systems.find({name: {$in: systemPresence}}, function(err, starSystems) {
        
        console.log(starSystems[0].timestamp);
        if (err) {
            console.log("Error: " + err);
        } else {
            starSystems.forEach(function(system) {
                system.factions.forEach(function(factions) {
                    if(factions.name === "New Pilots Initiative") {
                        factionInf = factions.influence;
                    }
                });
                if(system.timestamp < yesterday) {
                    return;
                }
                console.log(yesterday);
                console.log(system.timestamp);

                // console.log(system.name + " | " + system.systemFaction.name + " | " + system.systemFaction.state + " | " + factionInf + " | " + system.timestamp);
                tempStr.push(system.name + " | " + system.systemFaction.name + " | " + system.systemFaction.state + " | " + factionInf + " | " + system.timestamp);
            });
        }
        res.send(tempStr);
    })
})


app.listen(process.env.PORT || port, function () {
    console.log("Listening...");
})

