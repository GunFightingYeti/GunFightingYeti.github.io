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


// Clock timer
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
    var deptTime = moment($("#deptimeinput").val().trim()).format("X");
    var frequency = $("#freqinput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        deptTime: deptTime,
        frequency: frequency
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
    var deptTime = childSnapshot.val().deptTime;
    var frequency = childSnapshot.val().frequency;

    // Calculate the train times
     var nextArrival = moment(deptTime).add(frequency);
     var minutesAway = moment(deptTime).add(frequency);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency + " min"),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway + " min")
    );

    // Append the new row to the table
    $("#infocenter").append(newRow);
});