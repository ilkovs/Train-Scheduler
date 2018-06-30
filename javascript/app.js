$(document).ready(function () {

    $.playSound("images/train-depart-with-whistle-01.mp3");

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD8lsZf9MxHGFUN1HW_jaLgyTcGFF3aGHU",
        authDomain: "projectone-68cbb.firebaseapp.com",
        databaseURL: "https://projectone-68cbb.firebaseio.com",
        projectId: "projectone-68cbb",
        storageBucket: "projectone-68cbb.appspot.com",
        messagingSenderId: "1003485439024"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grab user Input

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#trainTime").val().trim();
        var frequency = $("#frequency").val().trim();


        // Creates local "temporary" object for holding employee data

        var newTrain = {
            name: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // console log everything

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.trainTime);
        console.log(newTrain.frequency);

        // notify adding new Train

        alert("New Train has been added !");

        // clear all boxes
        $("#trainName-input").val("");
        $("#destination-input").val("");
        $("#trainTime-input").val("");
        $("#frequency-input").val("");

        
    })

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().trainTime;
        var frequency = childSnapshot.val().frequency;

        // Employee Info
        console.log("Name: " + trainName);
        console.log("Destination: " + destination);
        console.log(trainTime);
        console.log(frequency);

        // train Time pushed back 1 year
        var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
        console.log(trainTimeConverted);
        
        // current Time
        var currentTime = moment();
        console.log("currentTime: " + moment(currentTime).format("hh:mm a"));
        $("#timer").text(currentTime.format("hh:mm a"));
        
        // Difference between the times
        var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        
        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log("Remainder: " + tRemainder);
        
        // determines minutes away
        var minutesAway = frequency - tRemainder;
        console.log("minutes until train: " + minutesAway);
        
        // determine next train arrival
        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
        console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm a"));
    
    
        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

    })

    
        
})