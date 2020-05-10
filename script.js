// Get Local Storage - Last City
function getCity(){
    JSON.parse(localStorage.getItem("storedCity"));
    console.log(storedCity);
};

// renderCities();

// Function for displaying stored cities
function renderCities() {
    $("#city-view").empty();
    for (var i = 0; i < storedCity.length; i++) {

    var newCity = $('<div>'+ storedCity[i] +'</div>');
    newCity.addClass("card");
    $("#city-view").append(newCity);
  };
};

// Define Variable for lastCity
// If no value for lastCity then exit function(return\

var storedCity = [""];

// Post Current Date onto Jumbotron & Cards
    var dateEl = $("#date");
    $(dateEl).text(moment(new Date()).format("MM/DD/YYYY"));
    var date1 = $("#date1");
    var date2 = $("#date2");
    var date3 = $("#date3");
    var date4 = $("#date4");
    var date5 = $("#date5");

    $(date1).text(moment(new Date()).add(1, 'd').format("MM/DD/YY"));
    $(date2).text(moment(new Date()).add(2, 'd').format("MM/DD/YY"));
    $(date3).text(moment(new Date()).add(3, 'd').format("MM/DD/YY"));
    $(date4).text(moment(new Date()).add(4, 'd').format("MM/DD/YY"));
    $(date5).text(moment(new Date()).add(5, 'd').format("MM/DD/YY"));


// Onclick for Search City w/prevent default
var search = $("#search");
$(search).on( 'click', function() {
    event.preventDefault();

var city =$("#cityInput").val();
    storedCity.push(city);
    console.log(storedCity);
    
getWeather();
getLocation();

var newCity = $('<div>'+ city +'</div>');
newCity.addClass("card");
$("#city-view").append(newCity);

localStorage.setItem("storedCity", JSON.stringify(storedCity));
});


// Create an AJAX function
function getWeather(){
    var url = "https://api.openweathermap.org/data/2.5/forecast?";
    var city =$("#cityInput").val();
    var apiKey = "101700968986c9ab530374c4e3041d7b";
    
    var queryURL = url+"q="+city+"&appid="+apiKey;
      $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
              console.log(response);

     var cityName = response.city.name;
     $("#mainCity").text(cityName);

     var cityTemperature = response.list[0].main.temp;
     var cityTemp = ("Temperature: "+(Math.floor(cityTemperature - 273.15)*9/5+32)+"°F");
     $("#temperature").text(cityTemp);
     
     var cityHumidity = response.list[0].main.humidity;
     $("#humidity").text("Humidity: "+cityHumidity+"%");

     var cityWindSpeed = response.list[0].wind.speed;
     $("#windSpeed").text("Wind Speed: "+cityWindSpeed+"MPH");

     var lat = response.city.coord.lat;
     var lon = response.city.coord.lon;
     
     var uvurl = "http://api.openweathermap.org/data/2.5/uvi?";
     var apiKey = "101700968986c9ab530374c4e3041d7b";
     var UVURL = uvurl+"&appid="+apiKey+"&lat="+lat+"&lon="+lon;
       $.ajax({
               url: UVURL,
               method: "GET"
             }).then(function(response) {
               console.log(response);

            var cityUVIndex = response.value;
            $("#uvIndex").text("UV Index: "+cityUVIndex);
    });


    var cityTemperature = response.list[0].main.temp;
    var cityTemp = ("Temperature: "+(Math.floor(cityTemperature - 273.15)*9/5+32)+"°F");
    $("#temperature").text(cityTemp);
    
    var cityHumidity = response.list[0].main.humidity;
    $("#humidity").text("Humidity: "+cityHumidity+"%");

    var cityWindSpeed = response.list[0].wind.speed;
    $("#windSpeed").text("Wind Speed: "+cityWindSpeed+"MPH");
});
};


// // Geolocation API get current longitude/

// navigator.geolocation.getCurrentPosition((position) => {
//     console.log(position.coords.latitude, position.coords.longitude);
//   });

// function getLocation(){
//     var url = "http://www.mapquestapi.com/geocoding/v1/reverse?";
//     var apiKey = "MvofEA2Pb5LX3ICTEmaoy3G6Nr4kHa07";
//     var latitude = "47.445134";
//     var longitude ="-122.161948";
//     var queryURL = url+"key="+apiKey+"&location="+latitude+","+longitude;

//       $.ajax({
//               url: queryURL,
//               method: "GET"
//             }).then(function(response) {
//               console.log(response.results[0].locations[0].adminArea5);
//             });
// };




