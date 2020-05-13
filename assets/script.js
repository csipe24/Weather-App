// Get local storage - Last City
var storedCity = JSON.parse(localStorage.getItem("storedCity"));
console.log(storedCity);

if(! storedCity) {
  storedCity = [];
};

renderCities();

// Function for displaying stored cities
function renderCities() {
  $("#city-view").empty();
  for (var i = 0; i < storedCity.length; i++) {
  var newCity = $('<div>'+ storedCity[i] +'</div>');
  newCity.addClass("card");
  newCity.attr('id', 'displayCity');
  $("#city-view").append(newCity);
};
};

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
          $("#uvIndex").append("<button id=uvButton>" + response.value + "</button>");
          if (response.value < 3){
            $("#uvButton").css("background", "green")
          }
          else if (response.value < 6 || response.value > 3){
            $("#uvButton").css("background", "yellow")
          }
          else
            $("#uvButton").css("background", "red")
          
  });
});
};

// Get forecast
function getForecast(){
  var url = "https://api.openweathermap.org/data/2.5/forecast?";
  var city =$("#cityInput").val();
  var apiKey = "101700968986c9ab530374c4e3041d7b";
  
  var queryURL = url+"q="+city+"&appid="+apiKey;
    $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            for(i=1; i<6; i++){
            var cityTemp = ("Temperature: "+(Math.floor(response.list[i].main.temp - 273.15)*9/5+32)+"°F");
            var cityHumidity = response.list[i].main.humidity;
            var cityWindSpeed = response.list[i].wind.speed;
            $("#temp").eq(i).text(cityTemp);
            $("#humidity").eq(i).text("Humidity: "+cityHumidity+"%");
            $("#windSpeed").eq(i).text("Wind Speed: "+cityWindSpeed+"MPH");
            };
          })
        };

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
getForecast();
getLocation();

var newCity = $('<div>'+ city +'</div>');
newCity.addClass("card");
$("#city-view").append(newCity);

localStorage.setItem("storedCity", JSON.stringify(storedCity));
});



// Clicking Saved Cities to display Data

// var save = $(".save"),
//     tasks = JSON.parse(localStorage.getItem("tasks")) || {};
//     console.log(tasks);

// // Loop Over Each Save Button to input object items
// save.each(function(){
//     var buttonHour = $(this).data("hour"),
//         taskInput = $("#task-" + buttonHour);  
//     taskInput.val( tasks ["#task" + buttonHour])
//     })

