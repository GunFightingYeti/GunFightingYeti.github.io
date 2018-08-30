//Firebase
var config = {
    apiKey: "AIzaSyCxeVcHrIPy3Hx1FMO2AYb3ThtW2UeHoXQ",
    authDomain: "gunfightingyeti-1.firebaseapp.com",
    databaseURL: "https://gunfightingyeti-1.firebaseio.com",
    projectId: "gunfightingyeti-1",
    storageBucket: "gunfightingyeti-1.appspot.com",
    messagingSenderId: "367801624548"
};
firebase.initializeApp(config);

var database = firebase.database();


// Clock
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

// Add train button
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#newnameinput").val().trim();
    var destination = $("#newdestinput").val().trim();
    var frequency = $("#freqinput").val().trim();
    var deptTime = $("#deptimeinput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        deptTime: deptTime,
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#newnameinput").val("");
    $("#newdestinput").val("");
    $("#deptimeinput").val("");
    $("#freqinput").val("");
    $('#addtrainmodal').modal('toggle');
});

database.ref().on("child_added", function (childSnapshot) {
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var deptTime = childSnapshot.val().deptTime;
    var deptTimeConverted = moment(deptTime, "HH:mm").subtract(1, "years");
    console.log("deptTimeConverted" + deptTimeConverted);
    var currentTime = moment();
    console.log("currentTime: " + moment(currentTime).format("HH:mm"));
    var diffTime = moment().diff(moment(deptTimeConverted), "minutes");
    console.log("diffTime: " + diffTime);
    var remaining = diffTime % frequency;
    var minutesAway = frequency - remaining;
    console.log(frequency + " + " + remaining + " = " + minutesAway);
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text("Every " + frequency + " min"),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway + " min")
    );

    // Append the new row to the table
    $("#infocenter").append(newRow);
});