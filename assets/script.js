// Get local storage - Last City
var cacheKey = "storedCity";
var storedCity = JSON.parse(localStorage.getItem(cacheKey));

if(!storedCity) {
  storedCity = ["Seattle"];
};

renderCities();
getWeather(storedCity.slice(-1)[0]);
getForecast(storedCity.slice(-1)[0]);

// Function for displaying stored cities
function renderCities() {
  $("#city-view").empty();
  for(i=0; i<storedCity.length; i++){
    var newCity = $("<button>"+ storedCity[i] +"</button>");
    newCity.addClass("card");
    newCity.attr("class", "cityBtn"); 
    $("#city-view").append(newCity);
  };
};


// Clicking Saved Cities to display Data
$(".cityBtn").each(function(){
$(this).on( 'click', function() {
  event.preventDefault();
var city =$(this).text();
  console.log(city);
  getWeather(city);
  getForecast(city);
});
});

// Onclick for Search City w/prevent default
var search = $("#search");
$(search).on( 'click', function() {
    event.preventDefault();

var city =$("#cityInput").val();
    storedCity.push(city);
    console.log(city);
    
getWeather(city);
getForecast(city);

var newCity = $('<button>'+ city +'</button>');
newCity.addClass("card");
newCity.attr("class", "cityBtn");
$("#city-view").append(newCity);

localStorage.setItem("storedCity", JSON.stringify(storedCity));
});

// Create an AJAX function
function getWeather(city){
  var url = "https://api.openweathermap.org/data/2.5/forecast?";
  var apiKey = "101700968986c9ab530374c4e3041d7b";
  
  
  var queryURL = url+"q="+city+"&appid="+apiKey;
    $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {

   var cityName = response.city.name;
   var cityTemperature = response.list[0].main.temp;
   var cityTemp = ("Temperature: "+(Math.floor(cityTemperature - 273.15)*9/5+32)+"°F");
   var cityHumidity = response.list[0].main.humidity;
   var cityWindSpeed = response.list[0].wind.speed;
   var img =  response.list[0].weather[0].icon;
   var imgURL = "https://openweathermap.org/img/wn/"+img+"@2x.png" 
  

    $("#mainCity").text(cityName);
    $("#temperature").text(cityTemp);
    $("#humidity").text("Humidity: "+cityHumidity+"%");
    $("#windSpeed").text("Wind Speed: "+cityWindSpeed+"MPH");
    $("#weatherIcon").attr("src", imgURL);

   var lat = response.city.coord.lat;
   var lon = response.city.coord.lon;
   
   var uvurl = "https://api.openweathermap.org/data/2.5/uvi?";
   var apiKey = "101700968986c9ab530374c4e3041d7b";
   var UVURL = uvurl+"&appid="+apiKey+"&lat="+lat+"&lon="+lon;
     $.ajax({
             url: UVURL,
             method: "GET"
           }).then(function(response) {

          var cityUVIndex = response.value;
          $("#uvIndex").empty();
          $("#uvIndex").append("UV Index:")
          $("#uvIndex").append("<button id=uvButton>" + response.value + "</button>");
          if (response.value < 3){
            $("#uvButton").css({"background-color": "green", "font-size": "125%"})
          }
          else if (response.value < 6 || response.value > 3){
            $("#uvButton").css({"background-color": "yellow", "font-size": "125%"})
          }
          else
            $("#uvButton").css({"background-color": "red", "font-size": "125%"})    
  });
});
};

// Get forecast
function getForecast(city){
  var url = "https://api.openweathermap.org/data/2.5/forecast?";
  var apiKey = "101700968986c9ab530374c4e3041d7b";
  var queryURL = url+"q="+city+"&appid="+apiKey;
    $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log("got forecast")
            for(i=1; i<6; i++){
            var cityTemp = ("Temp: "+(Math.floor(response.list[i].main.temp - 273.15)*9/5+32)+"°F");
            var cityHumidity = response.list[i].main.humidity;
            var cityWindSpeed = response.list[i].wind.speed;
            $("#temp"+i).html(cityTemp+"°F");
            $("#hum"+i).html("Humidity: "+cityHumidity+"%");
            $("#win"+i).text("Wind Spd: "+cityWindSpeed+"MPH");


            var img =  response.list[0].weather[0].icon;
            var imgURL = "https://openweathermap.org/img/wn/"+img+"@2x.png" 
            $("#weatherIcon"+i).attr("src", imgURL);
            };
          })
        };

// Post Current Date onto Jumbotron & Cards
    var dateEl = $("#date");
    $(dateEl).text(moment(new Date()).format("MM/DD/YYYY"));

    for (i=1; i<6; i++)
    { var date = $("#date"+i)
      $(date).text(moment(new Date()).add(i, 'd').format("MM/DD/YY"));
    };


// // Onclick Event for save buttons
// $(save).on( 'click', function() {
//   console.log("Saved!");

// var buttonHour = $(this).data("hour");
//   console.log(buttonHour);

// var taskInput = $("#task-" + buttonHour),
//   taskDes = taskInput.val();
//   console.log(taskInput.val());

//   tasks["#task" + buttonHour] = taskDes;

// localStorage.setItem("tasks",JSON.stringify(tasks));
// });



