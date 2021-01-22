

exports.TickDate = new TickDate();

class TickDate {
    constructor(timestamp, starSystem) {
        var timestamp = new Date();
        var starSystem = "";

        this.timestamp = timestamp;
        this.starSystem = starSystem;
    }
};

console.log(exports);