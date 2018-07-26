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
        movieWho = $("#whomovie").val().trim();
        console.log(movieName);

        //pushing to the database
        data.ref().push({
            name: movieName,
            where: movieWhere,
            when: movieWhen,
            who: movieWho
        });
        //clears out input fields when clicked
        $("#whoname").val("");
        $("#whatmovie").val("");
        $("#wheremovie").val("");
        $("#whenmovie").val("");
        $("#whomovie").val("");
    });

    data.ref().on("child_added", function (snapshot) {

         $("#nowplaying").prepend(`<div><button class='doStuff' id='moviecard' style='width:100%'
        data-search='${snapshot.val().name}'>
        <p class='infoheader'><u>We're watching:</u></p><p id='movielogs'>${snapshot.val().name}</p>
        <p class='infoheader'><u>Right here:</u></p><p id='movielogs'>${snapshot.val().where}</p>
        <p class='infoheader'><u>Show starts at:</u><p id='movielogs'>${snapshot.val().when}</p>
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

    // var map, infoWindow;

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {
                lat: 30.27,
                lng: -97.74
            }    
        });
        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'js/markerimages/m'});
      }
      var locations = [
        {lat: -31.563910, lng: 147.154312},
        {lat: -33.718234, lng: 150.363181},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
        {lat: -34.671264, lng: 150.863657},
        {lat: -35.304724, lng: 148.662905},
        {lat: -36.817685, lng: 175.699196},
        {lat: -36.828611, lng: 175.790222},
        {lat: -37.750000, lng: 145.116667},
        {lat: -37.759859, lng: 145.128708},
        {lat: -37.765015, lng: 145.133858},
        {lat: -37.770104, lng: 145.143299},
        {lat: -37.773700, lng: 145.145187},
        {lat: -37.774785, lng: 145.137978},
        {lat: -37.819616, lng: 144.968119},
        {lat: -38.330766, lng: 144.695692},
        {lat: -39.927193, lng: 175.053218},
        {lat: -41.330162, lng: 174.865694},
        {lat: -42.734358, lng: 147.439506},
        {lat: -42.734358, lng: 147.501315},
        {lat: -42.735258, lng: 147.438000},
        {lat: -43.999792, lng: 170.463352}
      ]

        // infoWindow = new google.maps.InfoWindow;



    //     //Attempting Geolocation
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //             var pos = {
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude,
    //                 zoom: 14,
    //             };

    //             infoWindow.setPosition(pos);
    //             infoWindow.setContent('Location found.');
    //             infoWindow.open(map);
    //             map.setCenter(pos);
    //         }, function () {
    //             handleLocationError(true, infoWindow, map.getCenter());
    //         });
    //     } else {
    //         // Browser doesn't support Geolocation
    //         handleLocationError(false, infoWindow, map.getCenter());
    //     }
    // }

    // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent(browserHasGeolocation ?
    //         'Error: The Geolocation service failed.' :
    //         'Error: Your browser doesn\'t support geolocation.');
    //     infoWindow.open(map);
    // }
    initMap();
});
