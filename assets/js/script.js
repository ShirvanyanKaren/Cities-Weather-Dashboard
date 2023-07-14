var currentDate = $("#date");
var currentTime = dayjs();
var citySearch = $("#citySearch");
var searchButton = $("#searchButton");
var apiKey = "&appid=3590fea3ff36b7835be41ef001dcb1d0"
// var currentDate = "https://api.openweathermap.org/data/2.5/weather?"

var form = $("#input");
var recentSearch = $("#recentSearch");
var city;

searchButton.on('click', function(event){
    event.preventDefault()
   var cityName = citySearch.val() 
    console.log(cityName);
    latLong(cityName);
    // recentCities(cityName);

}) 
function latLong (city){
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1" + apiKey
    fetch(apiUrl)
    .then(function(response){
        return response.json()
            // console.log(city);
    })
    .then(function(response){
        console.log(response);
        var long = response[0].lon;
        var lat = response[0].lat;
        cityWeather(lat, long);
    })
}

function cityWeather (lat, long) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + apiKey;
    fetch(apiUrl)
    .then(function(response){
        return response.json()
        // console.log(response);
       
    })
    .then(function(data){
        for (var i = 1; i <= 5; i) {
            var startIndex = i * 8;
            var forecast = data.list[i];
            var date = forecast.dt_txt;
            var temperature = forecast.main.temp;
            var humidity = forecast.main.humidity;
            var wind = forecast.wind.speed;
    
           
    
            // Update HTML elements in each forecast card with weather data
            $("#day" + (startIndex/8)).text(date);
            $("#temp" + (startIndex/8)).text("Temperature: " + temperature + "°F");
            $("#humid" + (startIndex/8)).text("Humidity: " + humidity + "%");
            $("#wind" + (startIndex/8)).text("Wind: " + wind + " mph");
    
        }
       console.log(data)
       setForecast(data);
       currentCity(data);
    

    })
}

function currentCity(data) {
// $("#temp").text("Temp: " + data.main.temp + " F");
  // set temp and humidity
  var city = data.city.name;
            var temperature = data.list[0].main.temp;
            var humidity = data.list[0].main.humidity;
            var wind = data.list[0].wind.speed;
            var conditions = data.list[0].weather[0].main;
            var description = data.list[0].weather[0].description;

            // Update HTML elements with weather data
            $("#city").text(city);
            $("#temp").text("Temperature: " + temperature + "°F");
            $("#humid").text("Humidity: " + humidity + "%");
            $("#wind").text("Wind: " + wind + " mph");

}

// function setForecast(data) {
   
// }
// }