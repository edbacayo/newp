const mongoose = require("mongoose");
const https = require("https");

class TickDate {
    constructor(timestamp, starSystem) {
        var timestamp = new Date();
        var starSystem = "";

        this.timestamp = timestamp;
        this.starSystem = starSystem;
    }
};


module.exports.getTickDate = function () {
    const mongoURL = "mongodb+srv://web-user:EX9zMfiPNUKEoqX2@cluster0.j8vzx.mongodb.net/production?retryWrites=true&w=majority";
    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 });

    const tickSchema = mongoose.Schema({
        timestamp: Date,
        starSystem: String
    });


    var tickDates = [new TickDate()];
    var returnValue = "";
    const monitorSystems = ["Diaguandri", "Sol", "Deciat", "Shinrarta Dezhra"];
    var latestTick = mongoose.model("ticks", tickSchema);
    latestTick.find({ starSystem: { $in: monitorSystems } }, function (err, tick) {
        tick.forEach(function (ticks) {
            var tickDate = new TickDate();
            tickDate.timestamp = ticks.timestamp;
            tickDate.starSystem = ticks.starSystem;
            tickDates.push(tickDate);
        })

        displayTicks(tickDates);
    }).sort({ timestamp: -1 }).limit(10);

    // mongoose.connection.close();
}

function displayTicks(tickDates) {
    tickDates.forEach(function (times) {
        console.log(times.starSystem);
        console.log(times.timestamp);
    })
};


module.exports.getTickFromEBGS = function () {
    const tickURL = "https://elitebgs.app/api/ebgs/v5/ticks";
    var lastTick = [];
    
    https.get(tickURL, function (result) {
        result.on("data", function (res) {
            const resData = JSON.parse(res);
            lastTick.push(new Date(resData[0].updated_at));
            return lastTick[0];
        })
    });
    
};