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
    recentCities(cityName);

}) 
function latLong (city){
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1" + apiKey
    fetch(apiUrl)
    .then(function(response){
        return response.json()

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
    })
    .then(function(response){
        console.log(response);

    })
}

function currentCity