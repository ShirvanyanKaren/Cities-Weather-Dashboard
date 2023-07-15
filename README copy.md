# Cities-Weather-Dashboard

## Technology Used, Deployment, and Repository

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| Bootstrap         | [https://getbootstrap.com/docs/5.3/getting-started/introduction/](https://getbootstrap.com/docs/5.3/getting-started/introduction/) |
| Dayjs          | [https://day.js.org/docs/en/display/format](https://day.js.org/docs/en/display/format) |
| Javascript    | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | 
JQuery   | [https://www.w3schools.com/jquery/jquery_syntax.asp](https://www.w3schools.com/jquery/jquery_syntax.asp) |   
Open Weather  | [https://openweathermap.org/](https://openweathermap.org/)| 
| Git | [https://git-scm.com/](https://git-scm.com/)     | 
| Deployed Site | [https://shirvanyankaren.github.io/Work-Day-Scheduler/](https://shirvanyankaren.github.io/Work-Day-Scheduler/)     | 
| My Github Repository | [https://github.com/ShirvanyanKaren/Work-Day-Scheduler](https://github.com/ShirvanyanKaren/Work-Day-Scheduler)     | 

## Description
This project was made from scratch using HTML, JQUERY, Dayjs, Bootstrap, and the Open Weather API. Throughout the development of this projext, I had to learn about the syntax around fetch request as well utilize previous interfaces for different purposes. The goal of this weather dashboard was to enable the user to search for the weather of different cities and display these weather conditions as well as a 5 day forecast and recent search history. The project abided by the following acceptance criteria:

```md
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

The finished day planner application is presented below:

![Deployed Weather Dasboard](./assets/images)

## Table of Contents

* [Javascript, Open Wather API, and Code Factoring](#javascript-open-weather-and-code-factoring)
* [Usage](#usage)
* [Learning Points](#learning-points)
* [Credits](#credits)
* [License](#license)

## Javascript, Open Wather API, and Code Factoring

The first task for this project was formatting the page using Bootstrap which I accomplished by utilizing some of the components they offerred including cards for the 5 day forecast and an input group for the search button.



```html
        <div class="col-9 focusCityInfo">
            <div class="card-body mt-3">
                <h3 id="city">City Name</h3>
                <p id="temp">Temperature:</p>
                <p id="humid">Humidity:</p>
                <p id="wind">Wind:</p>
            </div>
        </div>
    </div>
            <div class="col-md-2.5">
                <div class="card bg-primary text-white" id="forecast1">
                    <div class="card-body p-2">
                        <h3 class="card-title" id="day1">Date</h3>
                        <p class="card-text" id="temp1">Temperature:</p>
                        <p class="card-text" id="humid1">Humidity:</p>
                        <p class="card-text" id="wind1">Wind:</p>
                    </div>
                </div>
            </div>

```
I reformatted the HTML document with Bootstrap syntax like column sizes and list groups. 

I had two options for integrating the javascript which were to either append all the elements and classes through javascript or append them onto already existing HTML classes. I chose to format them in HTML first to see the layout first. 


```js
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
            var long = response[0].lon;
            var lat = response[0].lat;
            cityWeather(lat, long, city);
        });
}

...

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
```
Following the page integration with appropriate id tags, I then created an event listener with JQUERY syntax to gather the users inputted city and passed this through to the latLong function to find the lattitude and longitude of the city to then apply to the weather forecast API with another fetch request. The information was then accessed, which I console logged to check, and refactored as variables to add as text on the HTML page. 

```js
for (var i = 1; i <= 5; i++)
var forecast = data.list[i * 8 - 1]
```

Then, i followed a similar pattern of adding text to the page for the 5 day forecast but instead with a for loop and starting index. The for loop was used to targtet the ids on my HTML page that were numbered 1-5 to target different forecast day cards. The forecast index of [i*8-1] was used as the arrays in the object from the API were listed every 3 hours and I added the minus 1 because the arrays ended at 40 meaning the 5th day wouldn't be accessed otherwise at the end of the loop.

The last portion of the project was using local storage to display recent searches:

```js
function saveRecentSearches() {
    // Save the recent searches  to local storage
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}

function loadRecentSearches() {
    // Pull the recent searches array from local storage and use JSON
    var savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
        recentSearches = JSON.parse(savedSearches);
        displayRecentSearches();
    }
}
```
After passing the city name through a function that saved it into the recent searches array, I stored the city in local storage and parsed so it can be applied within javascript onto the page. 

I then created a for loop that iterates as long as i is less than the recent searches array to append the recent search button each time user inputs a new city.


```js
...
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
 ...
}

```

I also added a clear button for the user to clear their recent searches. 

![Using Day Planner](./assets/images/using-planner.png)


## Usage 

This application can be used to check weather conditions for a given city and see the next 5 day forecast. The application is preset on Los Angeles, as that is whee I am currently living, and provides a recent search history for the user's convenience if they, for instance, want to check and compare the weather of two different cities.  


## Learning Points

This project was an introduction to APIs for me and taught me a lot about the importance of console logging which I will utilize more often now. I not only learned how to utilize APIs and API keys, but also became more efficient at debuggin and solving issues with selecting data objects within fetch requests and local storage. I also utilized JQUERY a lot more this project which has become a favorable option for me.


## Credits

Jehyun Jung from the Central Tutoring Center helped a lot with understanding API keys and helped me set up my project in an orderly fashion. 

* [JQuery](https://www.w3schools.com/jquery/jquery_syntax.asp)
* [APIs](https://developer.mozilla.org/en-US/docs/Web/API)
* [Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
* [Open Weather](https://openweathermap.org/)
* [Fetch Function](https://developer.mozilla.org/en-US/docs/Web/API/fetch)

## License 

MIT licensing with permisions such as commercial use, modification, distribution and private use. Limitations include liability and warranty.
