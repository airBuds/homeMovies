$(document).ready(function () {



    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCe7HEqry2cnAfJli6gk2qJKg6eV_mFIUE",
        authDomain: "home-movies-d9cd4.firebaseapp.com",
        databaseURL: "https://home-movies-d9cd4.firebaseio.com",
        projectId: "home-movies-d9cd4",
        storageBucket: "home-movies-d9cd4.appspot.com",
        messagingSenderId: "246177851940"
    };
    firebase.initializeApp(config);

    data = firebase.database();

    //event listener to grab input fields and push them to the database
    $("#watchIt").on("click", function (event) {
        event.preventDefault();
        console.log("click");

        //grabbing input
        movieName = $("#whatmovie").val().trim();
        movieWhere = $("#wheremovie").val().trim();
        movieWhen = $("#whenmovie").val().trim();
        movieWho = $("#whomovie").val().trim();
        console.log(movieName);

        //pushing to the database
        data.ref().push({
            name: movieName,
            where: movieWhere,
            when: movieWhen,
            who: movieWho

        })

        $("#whatmovie").val("");
        $("#wheremovie").val("");
        $("#whenmovie").val("");
        $("#whomovie").val("");
    });

    // //this function will grab the movie data via ajax request from OMDB
    // function movieData() {
    //     var movie = $(this).attr("data-name");
    //     var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    //     // Creating an AJAX call for the specific movie being clicked on by the user
    //     $.get(queryURL).then(function (response) {
    //             console.log(response);
    //     });
    // };

});