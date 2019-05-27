        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyA-yO4EYkWmU1ODEcWEo8SNpErHt_c-qmE",
            authDomain: "click-counter-dfg.firebaseapp.com",
            databaseURL: "https://click-counter-dfg.firebaseio.com",
            projectId: "click-counter-dfg",
            storageBucket: "click-counter-dfg.appspot.com",
            messagingSenderId: "787072333236",
            appId: "1:787072333236:web:29149cc0f21d50b4"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        var database = firebase.database();



        $(document).ready(function () {


            var trainName = "";
            var destination = "";
            var FirstTrainofTheDay = "";
            var frequency = "";

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

                database.ref().on("child_added", function (snapshot) {
                    var data = snapshot.val();
                
                    console.log(snapshot.val().trainName);
                    console.log(snapshot.val().destination);
                    console.log(snapshot.val().FirstTrainofTheDay);
                    console.log(snapshot.val().frequency);


                    var convertTime = moment(firstTrainofTheDay, "hh:mm").subtract(1, "years");
                    console.log(convertTime);

                    var currentTime = moment().format();
                    console.log("Current Time: " + moment(currentTime).format("hh:mm"));
                    $("#trainSection").append(currentTime);

                    
                    var timeDiff = moment().diff(moment(firstTrainofTheDay, "hh:mm"));
                    console.log("Time difference:" + timeDiff);
                    $("#trainSection").append(timeDiff);

                    var timeRemaining = timeDiff % frequency;
                    console.log(timeRemaining);
                    $("#trainSection").append(timeRemaining);

                    var mintoNext = frequency - timeRemaining;
                    console.log("Minutes until next trian: " + mintoNext);
                    $("#trainSection").append(mintoNext);

                    var nextTrain = moment().add(mintoNext, "minutes");
                    console.log("arrival time: " + moment(nextTrain).format("hh:mm"))
                    $("#trainSection").append(nextTrain);



                    var trainInfo =

                        `<td> ${data.trainName}</td>` +
                        `<td> ${data.destination}</td>` +
                        `<td> ${data.frequency}</td>` +
                        `<td> ${nextTrain} </td>` +
                        `<td> ${mintoNext} </td>`
                        ;


                    $("#trainSection").html(trainInfo);




                });

                // dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
                //     // Change the HTML to reflect
                //     $("#savedinfo").text(snapshot.val().name);
                //     $("#savedinfo").text(snapshot.val().destination);
                //     $("#savedinfo").text(snapshot.val().frequency);
                //     $("#savedinfo").text(snapshot.val().comment);
                // });


            });


        });


