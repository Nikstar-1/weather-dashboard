//a weather dashboard with form inputs
$(document).ready(function () {
    $('#submitWeather').on('click', function (event) {
      event.preventDefault();
      let city = $('#city').val();
      getCityWeather(city);
    });
    //Connect API key to api open weather map and get information - I am presented with current and future conditions for that city and that city is added to the search history
    function getCityWeather(city) {
      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=84d8ea5be6d3527e97c1d32d85112fb7' + '&units=metric',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          let searches = JSON.parse(window.localStorage.getItem('citiesSearched')) || [];
          if (searches.indexOf(city) === -1) {
            searches.push(city);
            window.localStorage.setItem('citiesSearched', JSON.stringify(searches));
          }
          displayPreviousSearches();
          let cityName = document.getElementById('city-name');
          //cityName.textContent = ""
          cityName.textContent = data.name;
          let cityTemp = document.getElementById('city-temp');
          cityTemp.textContent = ' Temp:' + data.main.temp + ' °C';
          let cityHumidity = document.getElementById('city-humidity');
          cityHumidity.textContent = ' Humidity:' + data.main.humidity + ' %';
          let cityWindSpeed = document.getElementById('city-windspeed');
          cityWindSpeed.textContent = ' Wind Speed:' + data.wind.speed + ' MPH';
          //Weather text and symbols applied
          returnWeatherForecast(city);
          getUVI(data.coord.lat, data.coord.lon);
          cityTemp.textContent = ' ' + data.main.temp + ' °C';
          //Date added to the page alongside city when uploaded into the browser
         
          let displayDate = $('<h1>');
          $('#city-name').append(displayDate.text('(' + new Date().toLocaleDateString() + ')'));
          let displayImage = $('<img>').attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon+ ".png")
          $("#city-name").append(displayImage)
        },
      });
    }
    //Here you are presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    function returnWeatherForecast(city) {
      let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=84d8ea5be6d3527e97c1d32d85112fb7';
      $.ajax({
        url: queryURL,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          console.log(data)
          let forecast1 = $('#forecast1');
          let displayForecastOne = $('<h1>'); 
          displayForecastOne.text('\n'  + data.list[0].dt_txt +'temp:' +data.list[0].main.temp + '\n' + 'Humidity:' + data.list[0].main.humidity)
          let displayImageOne = $('<img>').attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon+ ".png")
          displayForecastOne.append(displayImageOne);
          forecast1.append(displayForecastOne)

          let forecast2 = $('#forecast2');
          let displayForecastTwo = $('<h1>'); 
          displayForecastTwo.text('\n'  + data.list[0].dt_txt +'temp:' +data.list[0].main.temp + '\n' + 'Humidity:' + data.list[0].main.humidity)
          let displayImageTwo = $('<img>').attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon+ ".png")
          displayForecastTwo.append(displayImageTwo);
          forecast2.append(displayForecastTwo)
          //forecast2.textContent = '\n' + 'temp:' +data.list[2].main.temp;
          //forecast2.textContent += '\n' + 'Humidity:' + data.list[2].main.humidity;

          let forecast3 = $('#forecast3');
          let displayForecastThree = $('<h1>'); 
          displayForecastThree.text('\n'  + data.list[0].dt_txt +'temp:' +data.list[3].main.temp + '\n' + 'Humidity:' + data.list[0].main.humidity)
          let displayImageThree = $('<img>').attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon+ ".png")
          displayForecastThree.append(displayImageThree);
          forecast3.append(displayForecastThree)
          //forecast3.textContent = '\n' + 'temp:' +data.list[3].main.temp;
          //forecast3.textContent += '\n' + 'Humidity:' + data.list[3].main.humidity;


          let forecast4 = $('#forecast4');
          let displayForecastFour = $('<h1>'); 
          displayForecastFour.text('\n'  + data.list[0].dt_txt +'temp:' +data.list[0].main.temp + '\n' + 'Humidity:' + data.list[0].main.humidity)
          let displayImageFour = $('<img>').attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon+ ".png")
          displayForecastFour.append(displayImageFour);
          forecast4.append(displayForecastFour)
          //forecast4.textContent = '\n' + 'temp:' +data.list[4].main.temp;
          //forecast4.textContent += '\n' + 'Humidity:' + data.list[4].main.humidity;


          let forecast5 = $('#forecast5');
          let displayForecastFive = $('<h1>'); 
          displayForecastFive.text('\n'  + data.list[0].dt_txt +'temp:' +data.list[0].main.temp + '\n' + 'Humidity:' + data.list[0].main.humidity)
          let displayImageFive = $('<img>').attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon+ ".png")
          displayForecastFive.append(displayImageFive);
          forecast5.append(displayForecastFive)
          //forecast5.textContent = '\n' + 'temp:' +data.list[5].main.temp;
          //forecast5.textContent += '\n' + 'Humidity:' + data.list[5].main.humidity;
        },
      });
    }
    //I view the UV index
    //THEN I am presented with a color that indicates whether the conditions are favorable..
    function getUVI(lat, lon) {
      let queryURL = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=84d8ea5be6d3527e97c1d32d85112fb7';
      $.ajax({
        url: queryURL,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          let UV = document.getElementById('UV');
          UV.textContent = 'UV Index: ' + data.value;
          if (data.value < 3) {
            UV.style.backgroundColor = 'yellow';
          } else if (data.value < 8) {
            UV.style.backgroundColor = 'orange';
          } else {
            UV.style.backgroundColor = 'red';
          }
         // currWeatherDiv.append(`<p>UV Index: <span class="text-${textColour} ${uvSeverity};">${currUVIndex}</span></p>`);
        },
      });
    }
    function displayPreviousSearches() {
      $('.historyList').empty();
      let searchesToDisplay = JSON.parse(window.localStorage.getItem('citiesSearched')) || [];
      for (let i = 0; i < searchesToDisplay.length; i++) {
        let entry = document.createElement('li');
        entry.textContent = searchesToDisplay[i];
        $('.historyList').append(entry);
      }
    }
    let usersPreviousSearches = JSON.parse(window.localStorage.getItem('citiesSearched')) || [];
    if (usersPreviousSearches.length > 0) {
      getCityWeather(usersPreviousSearches[usersPreviousSearches.length - 1]);
      displayPreviousSearches();
    }
    $('.historyList').on('click', 'li', function () {
      getCityWeather($(this).text());
    });
  });