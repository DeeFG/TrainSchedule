$(document).ready(function () {
    var trainName = "";
    var destination = "";
    var FirstTrainofTheDay = "";
    var frequency = "";

    var currentTime = moment().format('LL LT');
    $("#time").append(currentTime);

    $("#submit").on("click", function (event) {
        event.preventDefault();
        //take input and get its value
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        firstTrainofTheDay = $("#FirstTrainofTheDay").val().trim();
        console.log(trainName);
        console.log(destination);
        console.log(frequency);
        console.log(firstTrainofTheDay);


        // pushed data to data base
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainofTheDay: firstTrainofTheDay,
            frequency: frequency,
        });



        database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {
            var data = snapshot.val();

            var convertTime = moment(firstTrainofTheDay, "hh:mm").subtract(1, "years");
            console.log(convertTime);

            var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
            console.log("Current Time: " + moment(currentTime).format("hh:mm"));
            //$("#time").append(currentTime);

            var timeDiff = moment().diff(moment(firstTrainofTheDay, "h:mm:ss a"));
            console.log("Time difference:" + timeDiff);
            // $("#trainSection").append(timeDiff);

            var timeRemaining = timeDiff % frequency;
            console.log(timeRemaining);
            // $("#trainSection").append(timeRemaining);

            var mintoNext = frequency - timeRemaining;
            console.log("Minutes until next trian: " + mintoNext);
            //$("#trainSection").append(mintoNext);

            var nextTrain = moment().add(mintoNext, "minutes");
            console.log("arrival time: " + moment(nextTrain).format("hh:mm"))
            // $("#trainSection").append(nextTrain);

            console.log(snapshot.val().trainName);
            console.log(snapshot.val().destination);
            // console.log(snapshot.val().FirstTrainofTheDay);
            console.log(snapshot.val().frequency);

            var trainInfo =

                `<tr>   <td class="collection-item avatar"> <i class="material-icons">train</i></td>
                <td> ${data.trainName} </td> 
                <td> ${data.destination} </td> 
                <td> ${data.frequency} </td> 
                <td> ${nextTrain} </td> 
                <td> ${mintoNext} </td> </tr>`;

            $("#trainSection").append(trainInfo);


        });

    });

});

