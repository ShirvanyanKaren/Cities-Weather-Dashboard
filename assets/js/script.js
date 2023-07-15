// var currentDate = $("#date");
var currentTime = dayjs();
var citySearch = $("#citySearch");
var searchButton = $("#searchButton");
var apiKey = "&appid=3590fea3ff36b7835be41ef001dcb1d0";
var recentSearches = [];
var city = "Los Angeles";
latLong(city);

// Load recent searches and diplay them
$(document).ready(function () {
    loadRecentSearches();
    displayRecentSearches();
});


function setTime() {
    var currentDateTime = dayjs().format('MMMM DD, YYYY [at] hh:mm A');
    $("#date").text(currentDateTime);
}

setInterval(setTime, 1000);

searchButton.on('click', function (event) {
    event.preventDefault();
    var cityName = citySearch.val();
    latLong(cityName);
});

function latLong(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1" + apiKey;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
            var long = response[0].lon;
            var lat = response[0].lat;
            cityWeather(lat, long, city);
        });
}

function cityWeather(lat, long, city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&units=imperial" + apiKey;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentCity(data);
            setForecast(data);
            addRecentSearch(city);
            saveRecentSearches();
            displayRecentSearches();
        });
}

function currentCity(data) {
    var city = data.city.name;
    var forecast = data.list[0];
    var temperature = forecast.main.temp;
    var humidity = forecast.main.humidity;
    var wind = forecast.wind.speed;

    // Update HTML elements with weather data
    $("#city").html(
        `${data.city.name}  <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png"> `);
    $("#temp").text("Temperature: " + temperature + "°F");
    $("#humid").text("Humidity: " + humidity + "%");
    $("#wind").text("Wind: " + wind + " mph");
}

function setForecast(data) {
    for (var i = 1; i <= 5; i++) {
        var forecast = data.list[i * 8 - 1];
        var date = dayjs(forecast.dt_txt).format("MM/DD/YY");
        var temperature = forecast.main.temp;
        var humidity = forecast.main.humidity;
        var wind = forecast.wind.speed;

        // Update HTML elements in each forecast card with weather data
        $("#day" + i).html(`${date}  <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png"> `);
        $("#temp" + i).text("Temperature: " + temperature + "°F");
        $("#humid" + i).text("Humidity: " + humidity + "%");
        $("#wind" + i).text("Wind: " + wind + " mph");
    }
}


function addRecentSearch(city) {
    // Add the city to the recent searches array
    recentSearches.unshift(city);

    // Limit the recent searches array to a maximum of 6
    if (recentSearches.length > 6) {
        recentSearches.pop();
    }
}

function saveRecentSearches() {
    // Save the recent searches  to local storage
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}

function loadRecentSearches() {
    // Pull the recent searches array from local storage and use JSON
    var savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
        recentSearches = JSON.parse(savedSearches);
        console.log(savedSearches)
        displayRecentSearches();
    }
}

function displayRecentSearches() {
    var recentSearchElement = $("#recentSearch");
    recentSearchElement.empty();




    if (recentSearches.length > 0) {
        for (var i = 0; i < recentSearches.length; i++) {
            var city = recentSearches[i];
            var button = $("<button>").attr({
                "type": "button",
                "class": "list-group-item text-center list-group-item-action"
            }).text(city);

            // Add click event listener to redirect to weather of recent search
            button.on("click", function () {
                var cityName = $(this).text();
                latLong(cityName);
            });



            recentSearchElement.append(button);
        }

        recentSearchElement.show();
    } else {
        recentSearchElement.hide();

    }
}


var recentSearchClear = $("#clearButtonContainer");
console.log(recentSearchClear);
if (recentSearches != null) {
    console.log(recentSearches);

    var buttonClear = $("<button>").attr({
        "type": "button",
        "class": "clearBtn bg-success text-white list-group-item list-group-item-action text-center"
    });

    recentSearchClear.append(buttonClear);
    buttonClear.text("Clear");




}

buttonClear.on('click', function clear() {
    // Clear the recent searches array
    recentSearches = [];

    // Clear the local storage
    localStorage.removeItem("recentSearches");

    // Clear the recent search element on the screen
    $("#recentSearch").empty();
});
console.log(localStorage);

