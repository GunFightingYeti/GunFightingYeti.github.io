//  Firebase information
var config = {
    apiKey: "AIzaSyBtea1dHdG_082p7xKBllA-IPyxk4nGgvc",
    authDomain: "train-tracker-78ba3.firebaseapp.com",
    databaseURL: "https://train-tracker-78ba3.firebaseio.com",
    projectId: "train-tracker-78ba3",
    storageBucket: "",
    messagingSenderId: "768865316564"
};
firebase.initializeApp(config);
var database = firebase.database();

// Current time clock
var toggle = true;
setInterval(function () {
    var d = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
    });
    var parts = d.split(":");
    $('#hours').text(parts[0]);
    $('#minutes').text(parts[1]);
    $("#colon").css({
        visibility: toggle ? "visible" : "hidden"
    });
    toggle = !toggle;
}, 1000);

// Add new train button
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#newnameinput").val().trim();
    var destination = $("#newdestinput").val().trim();
    var frequency = $("#freqinput").val().trim();
    var deptTime = $("#deptimeinput").val().trim();

    // New train object
    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        deptTime: deptTime,
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#newnameinput").val("");
    $("#newdestinput").val("");
    $("#deptimeinput").val("");
    $("#freqinput").val("");
    $('#addtrainmodal').modal('toggle');
});

// Update every 60 seconds - WIP
function update() {
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var deptTime = childSnapshot.val().deptTime;
    var deptTimeConverted = moment(deptTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(deptTimeConverted), "minutes");
    var remaining = diffTime % frequency;
    var minutesAway = frequency - remaining;
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text("Every " + frequency + " min"),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway + " min"),

    );

    // Append the new row to the table
    $("#infocenter").append(newRow);
}

// Update on child added
database.ref().on("child_added", function (childSnapshot) {
    // Define variables to use in row and cell creation
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var deptTime = childSnapshot.val().deptTime;
    var deptTimeConverted = moment(deptTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(deptTimeConverted), "minutes");
    var remaining = diffTime % frequency;
    var minutesAway = frequency - remaining;
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text("Every " + frequency + " min"),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway + " min"),
        $("<button>").text("X").attr("class", "delete")
    );

    // Append the new row to the table
    $("#infocenter").append(newRow);
});