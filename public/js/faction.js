
// **************************************************
// * Created by: Ed Bacayo
// * Purpose: Get faction data from Elite BGS
// * Version: 1.0.1
// * Changelog:
// * 1.0.1 - show spinner while loading
// * 1.0.0 - initial
// **************************************************

const tickURL = "https://elitebgs.app/api/ebgs/v5/ticks";
const facURL = "https://elitebgs.app/api/ebgs/v5/factions?eddbId=76687";

var dateOptions = { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false };
var timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
var lastTick = new Date();
var lastTickMillis = new Date();

$.getJSON(tickURL, function (res) {
    $("#spinner-loading").css("visibility", "visible");
    lastTick = new Date(res[0].updated_at);
    lastTickMillis = Date.parse(lastTick);

    var curr = new Date();
    var currHour = curr.getUTCHours();
    var currMinute = curr.getUTCMinutes();
    var tickInfo = "<h6 class=\"sub\">" + "Last Tick (updated): " + formatTime(lastTick) + " | Current: " + addZero(currHour) + ":" + addZero(currMinute) + "</h6>";

    getFactionInfo();
    displayTickInfo(tickInfo);
})

function displayTickInfo(tickInfo) {
    $("#faction-presence").after(tickInfo);
}

function formatTime(time) {
    let tickYear = time.getUTCFullYear();
    let tickMonth = time.getUTCMonth() + 1;
    let tickDay = time.getUTCDate();
    let tickHour = addZero(time.getUTCHours());
    let tickMinutes = addZero(time.getUTCMinutes());

    return (tickYear + "-" + tickMonth + "-" + tickDay + " " + tickHour + ":" + tickMinutes);
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getFactionInfo() {
    $.getJSON(facURL, function (res) {
        var ed = res.docs[0].faction_presence;

        if (ed.length > 0) {
            var systemName = "";
            var influence = 0;
            var active_states = "";
            var updatedAt = new Date();
            var afterTick = "No";
            var daysWon = "";
            var opponent = "";
            var conflict = "";

            for (var i = 0; i < ed.length; i++) {
                systemName = ed[i].system_name;
                influence = (ed[i].influence * 100).toFixed(1);
                if (ed[i].active_states.length > 0) {
                    active_states = "";
                    if (ed[i].active_states.length > 1) {
                        for (var x = 0; x < ed[i].active_states.length; x++) {
                            active_states += ed[i].active_states[x].state + " ";
                        }
                    } else {
                        active_states = ed[i].active_states[0].state;
                    }
                } else {
                    active_states = "none";
                }

                if (ed[i].conflicts.length > 0) {
                    opponent = ed[i].conflicts[0].opponent_name;
                    daysWon = ed[i].conflicts[0].days_won;
                    conflict = opponent + "(Won: " + daysWon + ")";
                } else {
                    conflict = "NA";
                }

                updatedAt = ed[i].updated_at;
                if (Date.parse(updatedAt) > lastTickMillis) {
                    afterTick = "Yes";
                } else {
                    afterTick = "No";
                }

                $("#faction-presence").append("<tr><th scope=\"row\">" + systemName + "</th>" +
                    "<td>" + influence + "</td>" +
                    "<td>" + active_states + "</td>" +
                    "<td>" + conflict + "</td>" +
                    "<td>" + formatTime(new Date(updatedAt)) + "(" + afterTick + ")" + "</td></tr>");
            }
        }
        $("#spinner-loading").css("visibility", "hidden");
    })


}

