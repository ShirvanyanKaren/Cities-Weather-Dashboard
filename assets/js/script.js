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
    // console.log(cityName);
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
        // console.log(response);
        var long = response[0].lon;
        var lat = response[0].lat;
        cityWeather(lat, long);
    })
}

function cityWeather (lat, long) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&units=imperial" + apiKey;
    fetch(apiUrl)
    .then(function(response){
        return response.json()
        // console.log(response);
       
    })
    .then(function(data){
        
       console.log(data);
        currentCity(data);
        setForecast(data);

    })
    
}

function currentCity(data) {

            var city = data.city.name;
            var forecast =  data.list[0]
            var temperature = forecast.main.temp;
            var humidity = forecast.main.humidity;
            var wind = forecast.wind.speed;
            var conditions = forecast.weather[0].main;
            var description = forecast.weather[0].description;

            // Update HTML elements with weather data
            $("#city").html(
                `${data.city.name}  <img src="http://openweathermap.org/img/w/${
                  forecast.weather[0].icon}.png"> `
              );
            $("#temp").text("Temperature: " + temperature + "°F");
            $("#humid").text("Humidity: " + humidity + "%");
            $("#wind").text("Wind: " + wind + " mph");
            

}


function setForecast(data) {
    for (var i = 1; i <= 5; i++) {
        
        var forecast =  data.list[i]
        var date = dayjs(forecast.dt_txt).format("MM/DD/YY");
        var temperature = forecast.main.temp;
        var humidity = forecast.main.humidity;
        var wind = forecast.wind.speed;
        var uvIndex = forecast.uv;
        var conditions = forecast.weather[0].main;
        var description = forecast.weather[0].description;

        // Update HTML elements in each forecast card with weather data
        $("#day" + i).text(date);
        $("#temp" + i).text("Temperature: " + temperature + "°F");
        $("#humid" + i).text("Humidity: " + humidity + "%");
        $("#wind" + i).text("Wind: " + wind + " mph");
        $("#uv" + i).text("UV Index: " + uvIndex);
        $("#conditions" + i).text("Conditions: " + conditions);
        $("#description" + i).text("Description: " + description);
    }
}
// }