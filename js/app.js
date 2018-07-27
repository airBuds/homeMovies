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

        //grabbing input
        movieName = $("#whatmovie").val().trim();
        movieWhere = $("#wheremovie").val().trim();
        movieWhen = $("#whenmovie").val().trim();
        movieDate = $("#datemovie").val().trim();
        movieWho = $("#whomovie").val().trim();

        //pushing to the database
        data.ref().push({
            name: movieName,
            where: movieWhere,
            when: movieWhen,
            date: movieDate,
            who: movieWho
        });
        //clears out input fields when clicked
        $("#whoname").val("");
        $("#whatmovie").val("");
        $("#wheremovie").val("");
        $("#whenmovie").val("");
        $("#datemovie").val("");
        $("#whomovie").val("");
    });

    data.ref().on("child_added", function (snapshot) {

         $("#nowplaying").prepend(`<div><button class='doStuff' id='moviecard' style='width:100%'
        data-search='${snapshot.val().name}'>
        <p class='infoheader'><u>We're watching:</u></p><p id='movielogs'>${snapshot.val().name}</p>
        <p class='infoheader'><u>Right here:</u></p><p id='movielogs'>${snapshot.val().where}</p>
        <p class='infoheader'><u>Show starts at:</u><p id='movielogs'>${snapshot.val().when}</br>${snapshot.val().date}</p>
        <p class='infoheader'><u>Your host is:</u></p><p id='movielogs'>${snapshot.val().who}</p>
        </button></div>`);
    })

    //this function will grab the movie data via ajax request from OMDB
    $(document).on('click', '.doStuff', function (event) {
        event.preventDefault();
        //grabs movie name from the button that the movie is on the DOM
        var movie = $(this).data('search');
        var omdbURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        // Creating an AJAX call for the specific movie being clicked on by the user
        $.get(omdbURL).then(function (response) {
            //this empties out the div so the movie info doesn't "stack" up on the page
            $('#moviedata').text("");
            //grabs the poster
            $('#moviedata').prepend(`<img src="${response.Poster}"></br>`);
            //grabs the plot (short version)
            $('#moviedata').append(`${response.Plot}</br>`);
            //grabs the websit and adds an anchor to the page.  When clicked opens in new tab
            $('#moviedata').append(`<a href='${response.Website}' target='_blank'>Click Here: Link To Website With Trailer</a>`);

        });
    });
    
    //Menu Movement
              $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                  console.log("Hello");
            });
    
    
    
    //Definining Variable: map

    var map, infoWindow;

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 30.27,
                lng: -97.74
            },
            zoom: 12
        });
        infoWindow = new google.maps.InfoWindow;



        //Attempting Geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    zoom: 14,
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
    initMap()
});
