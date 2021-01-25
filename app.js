const express = require("express");
const app = express();
app.use(express.static("public"));
const port = 3000;

const ejs = require("ejs");
app.set("view engine", "ejs");

// const myDate = require(__dirname + "/public/js/ticks.js");
// console.log(myDate.getTickDate());

const dateOptions = {year: "numeric", month: "2-digit", day: "2-digit", hour12: false, minute: "2-digit"};

const monitorSystem = ["LHS 2884", "Belobog", "Aganippe", "Mufrid", "Magec", "Mufrid", "Meliae", "Magec", "Dahan"];
const mongoose = require("mongoose");
const { getTickFromEBGS } = require("./public/js/ticks");
// const mongoURL = "mongodb://localhost:27017/faction";
const mongoURL = "mongodb+srv://web-user:EX9zMfiPNUKEoqX2@cluster0.j8vzx.mongodb.net/production?retryWrites=true&w=majority";
const tickSchema = mongoose.Schema({timestamp: String});
const star_systems_Schema = ({
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
        state: {
            state: String,
            trend: String
        },
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



// class faction {
//     constructor(name, factionState, government, influence, allegiance, activeState) {
//         this.name = name;
//         var factionState = factionState;
//         this.government = government;
//         this.influence = influence;
//         this.allegiance = allegiance;
//         this.activeStates = [];        
//         activeStates.push(activeState);
//     }

//     addActiveState(state) {
//         this.activeStates.push(state);
//     }
// };






app.get("/", function (req, res) {
    //res.sendFile(__dirname + "/index.html");
    res.render("index");
})

app.get("/combat", function (req, res) {
    //res.sendFile(__dirname + "/combat.html");
    res.render("combat");
})

app.get("/bgs", function (req, res) {
    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 });
    var tempStr = [];
    var yesterday = new Date((new Date()).setHours(00, 00, 00).valueOf() - 86400000); // - 1 day
    var factionInf = 0;
    var star_systems = mongoose.model("star_systems", star_systems_Schema);
    // star_systems.find({"timestamp":{$lt: yesterday}, "systemFaction.name":"New Pilots Initiative"}, function(err, starSystems) {
    star_systems.find({name: {$in: monitorSystem}}, function(err, starSystems) {
        if (err) {
            console.log("Error retrieving MongoDB: " + err);
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

                tempStr.push(system.name + " | " + system.systemFaction.state.state + " | " + factionInf + " | " + new Date(system.timestamp).toLocaleString("en-US", {hour12: false}));
            });
        }
        res.send(tempStr);
    }).sort({timestamp: -1});
})


app.listen(process.env.PORT || port, function () {
    console.log("Listening...");
})

